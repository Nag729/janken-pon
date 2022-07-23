import { UseToastOptions } from "@chakra-ui/react";

export const isUserNameTooLong = (userName: string): boolean => {
  return userName.length > 10;
};

export const USER_NAME_TOO_LONG_TOAST_OPTIONS: UseToastOptions = {
  title: `名前は10文字以下にしてください 🥲`,
  status: `error`,
};

export const USER_NAME_DUPLICATE_TOAST_OPTIONS: UseToastOptions = {
  title: `名前が重複しています 🥲`,
  description: `別の名前を入力してください`,
  status: `error`,
};
