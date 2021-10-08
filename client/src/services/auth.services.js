import { request } from "./generic.services";

export const registerUser = (data) => request({ url: "register", method: "post", data })
export const loginUser = (data) => request({ url: "login", method: "post", data })