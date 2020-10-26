import { history } from "routes/history";
import store from "store/index";
import { actionLogin, actionLogout } from "store/actions";

export const TOKEN_KEY = "app-token";
export const USERNAME_KEY = "app-username";

export const isAuthenticated = () => {
  if (localStorage.getItem(TOKEN_KEY) === null) {
    return false;
  } else {
    const username = localStorage.getItem(USERNAME_KEY);
    if (username) {
      store.dispatch(actionLogin(username));
    }
    return true;
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUsername = () => localStorage.getItem(USERNAME_KEY);

export const login = (token, username) => {
  store.dispatch(actionLogin(username));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
  history.push("/admin");
};

export const logout = () => {
  store.dispatch(actionLogout());
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  history.push("/login");
};
