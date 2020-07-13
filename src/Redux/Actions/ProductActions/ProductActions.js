import axios from 'axios';
import Cookie from 'js-cookie';
import {
  PRODUCT_CATEGORIES_FAIL,
  PRODUCT_CATEGORIES_REQUEST,
  PRODUCT_CATEGORIES_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
} from './../../ActionTypes/ProductTypes/ProductTypes';

const listProducts = (
  page = 1,
  limit = 6,
  category = '',
  searchKeyword = '',
  sortOrder = '',
  from = 0,
  to = 1000
) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    console.log(
      `Product actions ->' ${page},${limit},${category}, ${searchKeyword}, ${sortOrder}`
    );
    const { data } = await axios.get(
      `/api/products?sortOrder=${sortOrder}&searchKeyword=${searchKeyword}&page=${page}&limit=${limit}&category=${category}&priceFrom=${from}&priceTo=${to}`
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      products: data.results,
      next: data.next,
      allDocs: data.allDocs,
      limit: data.next?.limit || data.previous?.limit,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const listProductsByPrice = (page, limit, from, to) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/products/filter/price?page=${page}&limit=${limit}&priceFrom=${from}&priceTo=${to}`
    );
    console.log(data);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      products: data.results,
      next: data.next,
      allDocs: data.allDocs,
      limit: data.next?.limit || data.previous?.limit,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const listProductsByCategory = (page, limit, category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/products/filter/category?page=${page}&limit=${limit}&category=${category}`
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      products: data.results,
      next: data.next,
      allDocs: data.allDocs,
      limit: data.next?.limit || data.previous?.limit,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CATEGORIES_REQUEST });
    const { data } = await axios.get('/api/products/categories');
    const newData = data.unshift('All');
    console.log(newData);
    dispatch({ type: PRODUCT_CATEGORIES_SUCCESS, payload: data });
    const {
      productCategories: { categories },
    } = getState();
    Cookie.set('categories', JSON.stringify(categories));
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORIES_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await axios.post('/api/products', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        '/api/products/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/products/' + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listProducts,
  detailsProduct,
  deleteProdcut,
  saveProduct,
  listCategories,
  listProductsByCategory,
  listProductsByPrice,
  saveProductReview,
};
