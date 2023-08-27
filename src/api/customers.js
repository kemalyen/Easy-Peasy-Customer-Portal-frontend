import axiosClient from "../libs/axios";

export const getCustomersRequest = async ({ queryKey }) => {
  const [_, page] = queryKey;
  const res = await axiosClient.get(`/api/customers?page=${page}`);
  return res.data;
};

export const getCustomerRequest = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const res = await axiosClient.get(`/api/customers/${id}`);
  return res.data.data;
};

export const getUsersByCustomersRequest = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const res = await axiosClient.get(`/api/customers/${id}/users`);
  return res.data.users;
};

export const createRequest = async (customer) => {
  let res;
  res = await axiosClient.post(`/api/customers`, customer);
  return res;
};

export const updateRequest = async (customer) => {
  let res;
  try {
    res = await axiosClient.put(`/api/customers/${customer.id}`, customer);
  } catch (error) {
    console.log("Error", error);
  }

  return res.data;
};
