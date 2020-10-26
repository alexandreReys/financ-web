import { api } from "./api";

export const postNotification = async (title, body) => {
  let resp;
  try {
    resp = await api.post("/delivery-push-notification/send", { title, body });
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }
  return resp;
};
