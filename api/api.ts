import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "./HttpStatusCode";

const baseURL: string = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const timeout: number = 100 * 1000;

const api = axios.create({
  baseURL,
  timeout,
});

export const generateNewRoomId = async (): Promise<string> => {
  const response: AxiosResponse | undefined = await api
    .post(`/generate/room-id`)
    .catch((error: AxiosError) => Promise.reject(error.response?.data));

  if (!response) {
    throw new Error("No response from server");
  }
  return response.data;
};

export const createNewRoomApi = async (body: {
  roomId: string;
}): Promise<void> => {
  await api
    .post(`/create/room`, body)
    .catch((error: AxiosError) => Promise.reject(error.response?.data));
};
