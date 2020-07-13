import Cookie from 'js-cookie';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from '../Reducers/CartReducer';
import {
  myOrderListReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from '../Reducers/OderReducer';
import {
  productCategoriesReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewSaveReducer,
  productSaveReducer,
} from '../Reducers/ProductReducer';
import {
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from '../Reducers/UserReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const prodCategories = Cookie.getJSON('categories') || [];

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
  productCategories: { categories: prodCategories },
};

const reducer = combineReducers({
  productList: productListReducer,
  productCategories: productCategoriesReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
