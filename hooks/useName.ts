import { useEffect, useState } from "react";

const readName = (): string => {
  const name = localStorage.getItem("name");
  return name ?? "";
};

export const useName = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    // NOTE: read name from local-storage
    setName(readName());
  }, []);

  return {
    name,
    setName,
  };
};
