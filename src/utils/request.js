import axios from "axios"
import { URL } from './config'

const instance = axios.create({
  baseURL: URL,
  timeout: 5000,
})

export default instance