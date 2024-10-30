"use client";

import { useEffect, useState } from "react";
import { useFileStore } from "@/store/useFileStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function StoreInitializer() {
  const [isLoading, setIsLoading] = useState(true);
  const initializeStore = useFileStore((state) => state.initializeStore);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeStore();
      } catch (error) {
        console.error("Failed to initialize store:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [initializeStore]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return null;
} 