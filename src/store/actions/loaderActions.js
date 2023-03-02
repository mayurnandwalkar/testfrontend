import { SHOW_LOADER, HIDE_LOADER } from "../action-types";

export const hideLoader = () => {
  return (dispatch) => {
    dispatch({ type: HIDE_LOADER });
  };
};

export const showLoader = () => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER });
  };
};
