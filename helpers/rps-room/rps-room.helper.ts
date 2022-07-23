import { UseToastOptions } from "@chakra-ui/react";

export const createRoomUrl = (roomId: string) => {
  return `${process.env.NEXT_PUBLIC_DOMAIN}/room/waiting?roomId=${roomId}`;
};

export const NOT_EXIST_ROOM_TOAST_OPTIONS: UseToastOptions = {
  title: `部屋が存在しません 🥲`,
  description: `トップページに戻ります...`,
  status: `error`,
  duration: 1000,
};

export const RPS_START_TOAST_OPTIONS: UseToastOptions = {
  title: `まもなく開始します...`,
  status: `success`,
  duration: 1000,
};
