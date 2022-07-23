import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL: string = process.env.NEXT_PUBLIC_API_URL || "";
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

export const verifyRoomApi = async (body: {
  roomId: string;
}): Promise<boolean> => {
  const response: AxiosResponse | undefined = await api
    .post(`/verify/room`, body)
    .catch((error: AxiosError) => Promise.reject(error.response?.data));

  if (!response) {
    throw new Error("No response from server");
  }
  return response.data;
};

export const verifyUserNameApi = async (body: {
  roomId: string;
  userName: string;
}): Promise<boolean> => {
  const response: AxiosResponse | undefined = await api
    .post(`/verify/user-name`, body)
    .catch((error: AxiosError) => Promise.reject(error.response?.data));

  if (!response) {
    throw new Error("No response from server");
  }
  return response.data;
};
