import { UseToastOptions } from "@chakra-ui/react";

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

export const COPIED_TOAST_OPTIONS: UseToastOptions = {
  title: `コピーしました 👍`,
  status: `success`,
  duration: 2000,
};
