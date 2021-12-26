import { useEffect, useState } from "react";

/**
 * c.f. https://t-yng.jp/post/nextjs-storage
 */
const readName = (): string => {
  const name = localStorage.getItem("name");
  return name ?? "";
};

export const useName = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // NOTE: read name from local-storage
    setName(readName());
    setLoading(false);
  }, []);

  return {
    name,
    setName,
    loading,
  };
};
