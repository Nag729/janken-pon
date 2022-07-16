import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "./HttpStatusCode";

const baseURL: string = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const timeout: number = 100 * 1000;

const api = axios.create({
  baseURL,
  timeout,
});

export const createNewRoomApi = async (body: {
  roomId: string;
  userName: string;
}): Promise<void> => {
  await api
    .post(`/create/room`, body)
    .catch((error: AxiosError) => Promise.reject(error.response?.data));
};

export const checkGameMasterApi = async (params: {
  roomId: string;
  userName: string;
}): Promise<boolean> => {
  const response: AxiosResponse | undefined = await api
    .get(`/check/game-master`, { params })
    .catch((error: AxiosError) => Promise.reject(error.response?.data));

  if (!response || response.status === HttpStatusCode.NO_CONTENT) {
    return false;
  }
  return response.data;
};
