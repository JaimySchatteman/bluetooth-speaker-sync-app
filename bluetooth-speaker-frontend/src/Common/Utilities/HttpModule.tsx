import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "http://musicbe.tiar.be/api/";
axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const isExpectedError = error.response && error.response.status >= 404 && error.response.status < 500;

  if (!isExpectedError) {
    console.log("Unexpected error: " + error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
