import axiosClient from "../libs/axios";

const csrf = () => axiosClient.get("/sanctum/csrf-cookie");

export const loginRequest = async (user) => {
  await csrf();

  const loginResponse = await axiosClient
    .post("/login", user)
    .then((response) => {
      return response
    })
    .catch(function (error) {
       return error
    });

  return loginResponse;
};

export const getUser = async () => {
  const res = await axiosClient.get(`/api/user`);
  return res.data;
};

export const logoutRequest = async () => {
  await csrf();

  axiosClient
    .post("/logout")
    .then()
    .catch(function (error) {
      console.error(error);
    });
};
