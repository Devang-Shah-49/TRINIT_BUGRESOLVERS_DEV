import { axiosClient } from "../axios";

const login = (data) => {
  return axiosClient.post(`/user/login`, data);
};

const signup = (data) => {
  return axiosClient.post(`/user`, data);
};

export default {
  login,
  signup,
};
