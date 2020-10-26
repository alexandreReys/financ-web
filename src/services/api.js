import axios from "axios";

import * as loginService from "./loginService";

const mysqlBaseUrl =
  process.env.REACT_APP_BASE_URL || "https://motoguardian-api.herokuapp.com";

export const api = axios.create({
  baseURL: mysqlBaseUrl,
});

console.log("mysqlBaseUrl", mysqlBaseUrl);

api.interceptors.request.use(async (config) => {
  const token = loginService.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
});
