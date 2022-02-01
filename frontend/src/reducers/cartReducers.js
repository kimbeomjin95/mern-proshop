import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // 새로 추가한 item
      const item = action.payload;

      // 새로 추가한 item이 기존에 있는 경우
      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
