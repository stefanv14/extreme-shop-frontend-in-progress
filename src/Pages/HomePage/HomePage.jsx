import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Actions/ProductActions/ProductActions';
import { PRODUCT_LIST_SELECTED } from '../../Redux/ActionTypes/ProductTypes/ProductTypes';
import Card from '../../UI/Card/Card';
import Pagination from '../../UI/Pagination/Pagination';
import './HomePage.css';

const HomePage = (props) => {
  const [offset, setOffset] = useState(0);

  const productList = useSelector((state) => state.productList);
  const {
    products,
    next,
    loading,
    error,
    limitProd,
    allDocs,
    activePage,
    search,
    selected,
    category,
    sort,
    priceFrom,
    priceTo,
  } = productList;
  const dispatch = useDispatch();

  const handlePageClick = async (data) => {
    let selectedProd = data.selected;
    console.log('handlePageClick -> selectedProd', selectedProd);
    await dispatch({ type: PRODUCT_LIST_SELECTED, payload: selectedProd });
    console.log(selected);
    let offset = Math.ceil(selectedProd * limitProd);
    setOffset(offset);
    console.log(category);
    dispatch(
      listProducts(
        selectedProd + 1,
        limitProd,
        category,
        search,
        sort,
        priceFrom,
        priceTo
      )
    );
  };

  return loading ? (
    <Spinner
      animation="border"
      className="spiner mx-auto my-auto"
      variant="secondary"
      style={{ justifySelf: 'center' }}
    />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <div className="products-div d-flex flex-column justify-content-around ml-auto">
        <div className="home d-flex flex-wrap justify-content-around">
          <Card products={products} />
        </div>
        <div className="mx-auto mt-5 paginate-bottom">
          <Pagination
            pageCount={allDocs / limitProd}
            onPageChange={handlePageClick}
            forcePage={selected}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
