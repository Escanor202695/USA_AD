import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.status === 302) {
      // Handle the redirection here
      const redirectUrl = response?.headers["location"];
      // router.push(redirectUrl); // Use the navigate function to redirect
      window.location.href = redirectUrl;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      // router.push('/login');
      // window.location.href = "/login";
    }
    throw error;
  }
);

export default axios;
