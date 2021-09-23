import { combineReducers } from "redux";
import FiturReducer from "./fitur";
import PbbReducer from "./pbb";
import AuthReducer from "./auth";
import PembayaranReducer from "./pembayaran";

export default combineReducers({
  FiturReducer,
  PbbReducer,
  AuthReducer,
  PembayaranReducer,
});
