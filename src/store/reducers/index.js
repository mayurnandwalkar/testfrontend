import { combineReducers } from "redux";

// reducer import
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import trackPlayReducer from "./trackPlayReducer";
import loaderReducer from "./loaderReducer";

// ==============================|| COMBINE REDUCER ||============================== //

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  trackPlay: trackPlayReducer,
  loader: loaderReducer,
});
