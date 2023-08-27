import axios from "axios";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    'X-Request-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

axiosClient.interceptors.request.use((config) => {
  //const token = localStorage.getItem('ACCESS_TOKEN');
  //config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('user');
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;
})

export default axiosClient