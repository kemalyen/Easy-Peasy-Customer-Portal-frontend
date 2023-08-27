import axiosClient from "../libs/axios";

const csrf = () => axiosClient.get("/sanctum/csrf-cookie");

export const getUsersRequest = async ({ queryKey }) => {
  const [_, page] = queryKey;
  const res = await axiosClient.get(`/api/users?page=${page}`);
  return res.data;
};

export const getUserRequest = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const res = await axiosClient.get(`/api/users/${id}`);
  return res.data.data;
};

export const sendResetLinkEmail = async (data) => {
  await csrf();
  const res = await axiosClient.post(`/password/email`, data);
  return res.data.data;
};

export const resetPassword = async (data) => {
  await csrf();
  const res = await axiosClient.post(`/password/reset`, data);
  return res.data.data;
};

export const getVerifyEmail = async (queryKey) => {
  const { id, hash } = queryKey;

  const res = await axiosClient.get(`/api/email-verification/${id}/${hash}`);
  return res.data.data;
};

export const updateRequest = async (user) => {
  const res = await axiosClient.put(`/api/users/${user.id}`, user);
  return res;
};

export const createRequest = async (user) => {
    const res = await axiosClient.post(`/api/users`, user);
    return res;
};