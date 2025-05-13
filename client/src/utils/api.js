import axios from "axios"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Importante para enviar cookies
})

export default api
