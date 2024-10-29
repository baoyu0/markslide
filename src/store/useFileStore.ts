import { create } from "zustand";
import { persist } from "zustand/middleware";
import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "markslide-db";
const DB_VERSION = 1;
const STORE_NAME = "files";
const META_STORE = "file-meta";

// 文件元信息接口
export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  contentHash: string;
}

// 完整文件信息接口
export interface FileWithContent extends FileItem {
  content: string;
}

interface FileState {
  files: FileItem[];
  addFile: (file: FileWithContent) => Promise<void>;
  removeFile: (id: string) => Promise<void>;
  updateFile: (id: string, updates: Partial<FileWithContent>) => Promise<void>;
  getFile: (id: string) => Promise<FileWithContent | undefined>;
  getStorageInfo: () => Promise<{ used: number; total: number }>;
  clearOldFiles: (days: number) => Promise<void>;
}

// 初始化 IndexedDB
const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
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
};

// 获取数据库连接
let dbPromise: Promise<IDBPDatabase> | null = null;
const getDB = () => {
  if (!dbPromise) {
    dbPromise = initDB();
  }
  return dbPromise;
};

// 计算内容哈希值
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

      addFile: async (file) => {
        const db = await getDB();
        const contentHash = await calculateHash(file.content);

        const existingFile = await db
          .transaction(STORE_NAME)
          .store.index("contentHash")
          .get(contentHash);

        if (!existingFile) {
          await db.put(STORE_NAME, {
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

        await db.put(META_STORE, metaInfo);
        set((state) => ({
          files: [...state.files, metaInfo],
        }));
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

        // 创建元数据对象，排除 content 字段
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
        const files = await tx.store.getAll();

        for (const file of files) {
          if (new Date(file.updatedAt) < cutoff) {
            await tx.store.delete(file.id);
            await db.delete(STORE_NAME, file.id);
          }
        }

        set((state) => ({
          files: state.files.filter((f) => new Date(f.updatedAt) >= cutoff),
        }));
      },
    }),
    {
      name: "file-store",
      // 使用简单的存储方式，只存储文件元信息
      partialize: (state) => ({
        files: state.files.map((file) => ({
          id: file.id,
          name: file.name,
          type: file.type,
          size: file.size,
          createdAt: file.createdAt,
          updatedAt: file.updatedAt,
          contentHash: file.contentHash,
        })),
      }),
    },
  ),
);
