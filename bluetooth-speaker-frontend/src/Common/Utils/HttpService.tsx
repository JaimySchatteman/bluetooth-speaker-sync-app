import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";
axios.interceptors.response.use(undefined, (error: any) => {
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
