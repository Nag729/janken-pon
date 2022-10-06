import { UseToastOptions } from "@chakra-ui/react";

export const isUserNameEmpty = (userName: string): boolean => {
  return !userName.trim();
};

export const isUserNameTooLong = (userName: string): boolean => {
  return userName.length > 10;
};

export const USER_NAME_EMPTY_TOAST_OPTIONS: UseToastOptions = {
  title: `名前を正しく入力してください 🥲`,
  status: `error`,
  duration: 2000,
};

export const USER_NAME_TOO_LONG_TOAST_OPTIONS: UseToastOptions = {
  title: `名前は10文字以下にしてください 🥲`,
  status: `error`,
  duration: 2000,
};

export const USER_NAME_DUPLICATE_TOAST_OPTIONS: UseToastOptions = {
  title: `名前が重複しています 🥲`,
  description: `別の名前を入力してください`,
  status: `error`,
  duration: 2000,
};
