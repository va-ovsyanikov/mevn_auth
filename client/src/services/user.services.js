import { request } from "./generic.services";

export const userFetchAll = () => request({ url: "", method: "get" });
export const userFetchOne = (id) => request({ url: `${id}`, method: "get" })
export const deleteItem = (id) => request({ url: `delete/${id}`, method: "delete" })
export const createItem = (data) => request({ url: "add", method: "post", data })
export const editItem = (id, data) => request({ url: `edit/${id}`, method: "patch", data })
