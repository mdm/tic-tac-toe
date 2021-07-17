import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
});

const checkAuth = () => {
  return client.get("/auth/check");
};

const login = (name: string, password: string) => {
  return client.post("/auth/login", {
    name,
    password,
  });
};

const logout = () => {
  return client.post("/auth/logout");
};

const API = {
  login,
  logout,
  checkAuth,
};

export default API;
