import { list } from "cart-localstorage";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../action-types";

const initialState = {
  items: list(),
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}
