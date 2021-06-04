import axios from "axios";
import { apiKey } from "../config/keys";

export const api = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${apiKey}/`,
  params: {},
});
