import { create } from "zustand";
import { persist } from "zustand/middleware";
import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "markslide-db";
const DB_VERSION = 1;
const STORE_NAME = "files";
const META_STORE = "file-meta";

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  contentHash: string;
}

export interface FileWithContent extends FileItem {
  content: string;
}

interface FileState {
  files: FileItem[];
  isInitialized: boolean;
  addFile: (file: FileWithContent) => Promise<void>;
  removeFile: (id: string) => Promise<void>;
  updateFile: (id: string, updates: Partial<FileWithContent>) => Promise<void>;
  getFile: (id: string) => Promise<FileWithContent | undefined>;
  getStorageInfo: () => Promise<{ used: number; total: number }>;
  clearOldFiles: (days: number) => Promise<void>;
  initializeStore: () => Promise<void>;
}

let dbPromise: Promise<IDBPDatabase> | null = null;
let initializationPromise: Promise<void> | null = null;

const getDB = async () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("contentHash", "contentHash", { unique: false });
        }
      },
    });
  }
  return dbPromise;
};

const calculateHash = async (content: string) => {
  const msgBuffer = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const useFileStore = create<FileState>()(
  persist(
    (set, get) => ({
      files: [],
      isInitialized: false,

      initializeStore: async () => {
        if (initializationPromise) {
          return initializationPromise;
        }

        if (get().isInitialized) {
          return Promise.resolve();
        }

        initializationPromise = (async () => {
          try {
            const db = await getDB();
            const files = await db.getAll(META_STORE);
            set({ files, isInitialized: true });
          } catch (error) {
            console.error("Failed to initialize store:", error);
            throw error;
          } finally {
            initializationPromise = null;
          }
        })();

        return initializationPromise;
      },

      addFile: async (file) => {
        const db = await getDB();
        const contentHash = await calculateHash(file.content);

        const tx = db.transaction([STORE_NAME, META_STORE], "readwrite");

        try {
          const contentStore = tx.objectStore(STORE_NAME);
          const existingContent = await contentStore
            .index("contentHash")
            .get(contentHash);

          if (!existingContent) {
            await contentStore.put({
              id: file.id,
              content: file.content,
              contentHash,
            });
          }

          const metaInfo: FileItem = {
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
            createdAt: file.createdAt,
            updatedAt: file.updatedAt,
            contentHash,
          };

          await tx.objectStore(META_STORE).put(metaInfo);
          await tx.done;

          set((state) => ({
            files: [...state.files, metaInfo],
          }));
        } catch (error) {
          console.error("Failed to add file:", error);
          throw error;
        }
      },

      removeFile: async (id) => {
        const db = await getDB();
        await db.delete(STORE_NAME, id);
        await db.delete(META_STORE, id);
        set((state) => ({
          files: state.files.filter((f) => f.id !== id),
        }));
      },

      updateFile: async (id, updates) => {
        const db = await getDB();
        const currentFile = await get().getFile(id);
        if (!currentFile) return;

        let contentHash = currentFile.contentHash;
        if (updates.content) {
          contentHash = await calculateHash(updates.content);
          await db.put(STORE_NAME, {
            id,
            content: updates.content,
            contentHash,
          });
        }

        const metaInfo: FileItem = {
          id,
          name: updates.name || currentFile.name,
          type: updates.type || currentFile.type,
          size: updates.size || currentFile.size,
          createdAt: currentFile.createdAt,
          updatedAt: new Date().toISOString(),
          contentHash,
        };

        await db.put(META_STORE, metaInfo);
        set((state) => ({
          files: state.files.map((f) => (f.id === id ? metaInfo : f)),
        }));
      },

      getFile: async (id) => {
        const db = await getDB();
        const meta = await db.get(META_STORE, id);
        if (!meta) return undefined;

        const content = await db.get(STORE_NAME, id);
        return {
          ...meta,
          content: content?.content || "",
        };
      },

      getStorageInfo: async () => {
        const estimate = await navigator.storage?.estimate();
        return {
          used: estimate?.usage || 0,
          total: estimate?.quota || 0,
        };
      },

      clearOldFiles: async (days) => {
        const db = await getDB();
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        const tx = db.transaction([META_STORE, STORE_NAME], "readwrite");
        const files = await tx.objectStore(META_STORE).getAll();

        for (const file of files) {
          if (new Date(file.updatedAt) < cutoff) {
            await tx.objectStore(META_STORE).delete(file.id);
            await tx.objectStore(STORE_NAME).delete(file.id);
          }
        }

        set((state) => ({
          files: state.files.filter((f) => new Date(f.updatedAt) >= cutoff),
        }));

        await tx.done;
      },
    }),
    {
      name: "file-store",
      partialize: (state) => ({
        files: state.files,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && !state.isInitialized) {
          state.initializeStore();
        }
      },
    },
  ),
);
