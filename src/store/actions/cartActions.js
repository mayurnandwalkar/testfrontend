import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../action-types";
import { add, remove, list, destroy } from "cart-localstorage";

export const addToCart = (item) => {
  return (dispatch) => {
    const cart = list();
    const isInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (!isInCart) {
      add(item);
      dispatch({ type: ADD_TO_CART, payload: item });
    }
  };
};

export const removeFromCart = (itemId) => {
  return (dispatch) => {
    remove(itemId);

    dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  };
};

export const clearCart = () => {
  destroy();

  return (dispatch) => {
    dispatch({ type: CLEAR_CART });
  };
};
