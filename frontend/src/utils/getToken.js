import { localStorageConfig } from "../config/LocalStorageConfig";

export const getToken = () => {
  return localStorage.getItem(localStorageConfig.TOKEN)
    ? localStorage.getItem(localStorageConfig.TOKEN)
    : null;
};
