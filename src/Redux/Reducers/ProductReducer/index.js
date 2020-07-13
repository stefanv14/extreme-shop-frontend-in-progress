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
  PRODUCT_LIST_CURRENT_CATEGORY,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_PRICE_FROM,
  PRODUCT_LIST_PRICE_TO,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SEARCH,
  PRODUCT_LIST_SELECTED,
  PRODUCT_LIST_SORT,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_RESET,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
} from './../../ActionTypes/ProductTypes/ProductTypes';

function productListReducer(
  state = {
    products: [],
    next: {},
    allDocs: 0,
    limitProd: 3,
    activePage: 1,
    search: '',
    sort: '',
    selected: 0,
    category: '',
    priceFrom: 0,
    priceTo: 1000,
  },
  action
) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.products,
        next: action.next,
        allDocs: action.allDocs,
        limitProd: action.limit,
        activePage: 1,
        selected: state.selected,
        search: state.search,
        sort: state.sort,
        category: state.category,
        priceFrom: state.priceFrom,
        priceTo: state.priceTo,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_SEARCH:
      return { ...state, search: action.payload };
    case PRODUCT_LIST_SELECTED:
      return { ...state, selected: action.payload };
    case PRODUCT_LIST_CURRENT_CATEGORY:
      return { ...state, category: action.payload };
    case PRODUCT_LIST_PRICE_FROM:
      return { ...state, priceFrom: action.priceFrom };
    case PRODUCT_LIST_PRICE_TO:
      return { ...state, priceTo: action.priceTo };
    case PRODUCT_LIST_SORT:
      return { ...state, sort: action.payload };

    default:
      return state;
  }
}

function productCategoriesReducer(state = { categories: [] }, action) {
  switch (action.type) {
    case PRODUCT_CATEGORIES_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

function productDetailsReducer(state = { product: [] }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case PRODUCT_REVIEW_SAVE_FAIL:
      return { loading: false, errror: action.payload };
    case PRODUCT_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productSaveReducer,
  productCategoriesReducer,
  productReviewSaveReducer,
};
