import { useEffect, useState } from "react";

/**
 * c.f. https://t-yng.jp/post/nextjs-storage
 */
const readUserName = (): string => {
  const userName = localStorage.getItem(
    `${process.env.NEXT_PUBLIC_LOCAL_STORAGE_PREFIX}-name`
  );
  return userName ?? "";
};

export const useUserName = () => {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // NOTE: read name from local-storage
    setUserName(readUserName());
    setLoading(false);
  }, []);

  return {
    userName,
    setUserName,
    loading,
  };
};
