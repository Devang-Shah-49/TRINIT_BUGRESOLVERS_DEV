import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // headers: {
  //   "Content-type": "application/json",
  //   "Accept": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  // },
  // mode: "cors",
  validateStatus: (status) => status < 300,
});
