import { UseToastOptions } from "@chakra-ui/react";
import { RoomError } from "../../api/api";

export const createRoomUrl = (roomId: string) => {
  return `${process.env.NEXT_PUBLIC_DOMAIN}/room/waiting?roomId=${roomId}`;
};

export const invalidRoomToastOptions = (
  errorList: RoomError[]
): UseToastOptions => {
  const error = errorList[0];
  const title =
    error === `NOT_EXIST_ROOM`
      ? `部屋が存在しません 🥲`
      : error === `ALREADY_STARTED_ROOM`
      ? `部屋がすでに開始されています 🥲`
      : `最大のプレイヤー数に達しています 🥲`;

  return {
    title,
    description: `トップページに戻ります...`,
    status: `error`,
    duration: 2000,
  };
};

export const RPS_START_TOAST_OPTIONS: UseToastOptions = {
  title: `まもなく開始します...`,
  status: `success`,
  duration: 1000,
};
