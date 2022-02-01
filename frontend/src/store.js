import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailReducer,
  productListReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productListReducer: productListReducer,
  productDetailReducer: productDetailReducer,
  cart: cartReducer,
});

const cartitemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: cartitemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
