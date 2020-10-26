import { api } from "./api";
import store from "../store";
import { actionGetSettings } from "../store/actions";

export const get = async () => {
    try {
        var resp = await api.get("/delivery-settings");
    } catch (error) {
        console.error("ErrorMessage (settingsServuce.get): ", error);
        return null;
    }
    const settings = resp.data[0];
    store.dispatch(actionGetSettings(settings));
    return settings;
};

export const put = async (updateData) => {
    try {
        var resp = await api.put("/delivery-settings", updateData);
    } catch (error) {
        console.error("ErrorMessage (settingsServuce.put): ", error);
        return null;
    }
    store.dispatch(actionGetSettings(updateData));
    return resp.data;
};
