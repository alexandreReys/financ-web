import { combineReducers } from "redux";
import defaultReducer from "./reducers/defaultReducer";
import loginReducer from "./reducers/loginReducer";

export default combineReducers({
  defaultState: defaultReducer,
  loginState: loginReducer,
});
