import { faDollarSign, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  Spinner,
} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  listCategories,
  listProducts,
} from '../../Redux/Actions/ProductActions/ProductActions';
import {
  PRODUCT_LIST_CURRENT_CATEGORY,
  PRODUCT_LIST_PRICE_FROM,
  PRODUCT_LIST_PRICE_TO,
  PRODUCT_LIST_SEARCH,
  PRODUCT_LIST_SELECTED,
  PRODUCT_LIST_SORT,
} from '../../Redux/ActionTypes/ProductTypes/ProductTypes';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [state2, setState2] = useState(false);
  const [state, setState] = useState(1);
  const [limit, setLimit] = useState(3);
  const [select, setSelect] = useState('All');
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(1000);

  const [search, setSearch] = useState('skate');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const productList = useSelector((state) => state.productList);
  const { sort, priceFrom, priceTo } = productList;

  const productCategories = useSelector((state) => state.productCategories);
  const { categories, loading, error } = productCategories;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts(1, limit));
  }, [dispatch, limit]);

  useEffect(() => {
    if (window.innerWidth < 800) {
      setState(true);
    }
  }, [state]);

  const handleSelect = (el, index) => {
    setState(index);
    setSelect(el);
    console.log(state);
    if (el === 'All') {
      dispatch({ type: PRODUCT_LIST_SEARCH, payload: '' });
      dispatch({ type: PRODUCT_LIST_SELECTED, payload: 0 });
      dispatch({ type: PRODUCT_LIST_PRICE_FROM, priceFrom: 0 });
      setValue1(0);
      dispatch({ type: PRODUCT_LIST_PRICE_TO, priceTO: 1000 });
      setValue2(1000);
      dispatch({ type: PRODUCT_LIST_SORT, payload: '' });
      dispatch({ type: PRODUCT_LIST_CURRENT_CATEGORY, payload: '' });
      return dispatch(listProducts(1, limit));
    }
    dispatch({ type: PRODUCT_LIST_SEARCH, payload: '' });
    dispatch({ type: PRODUCT_LIST_SELECTED, payload: 0 });
    dispatch({ type: PRODUCT_LIST_PRICE_FROM, priceFrom: 0 });
    setValue1(0);
    dispatch({ type: PRODUCT_LIST_PRICE_TO, priceTO: 1000 });
    setValue2(1000);
    dispatch({ type: PRODUCT_LIST_SORT, payload: '' });
    dispatch({ type: PRODUCT_LIST_CURRENT_CATEGORY, payload: el });
    dispatch(listProducts(1, limit, el));
  };
  const handleRangeFrom = (value) => {
    setValue1(value);
    dispatch({ type: PRODUCT_LIST_PRICE_FROM, priceFrom: value });
  };

  const handleRangeTo = (value) => {
    console.log(value);
    setValue2(value);
    dispatch({ type: PRODUCT_LIST_PRICE_TO, priceTo: value });
  };

  const handleRangeButton = (value) => {
    const catSend = select === 'All' ? '' : select;
    dispatch(
      listProducts(1, limit, catSend, searchKeyword, sort, priceFrom, priceTo)
    );
    dispatch({ type: PRODUCT_LIST_SELECTED, payload: 0 });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const sortHandler = (e) => {
    const sortProd = e.target.value;

    const catSend = select === 'All' ? '' : select;
    dispatch({ type: PRODUCT_LIST_SORT, payload: sortProd });
    dispatch(
      listProducts(
        1,
        limit,
        catSend,
        searchKeyword,
        sortProd,
        priceFrom,
        priceTo
      )
    );
    dispatch({ type: PRODUCT_LIST_SELECTED, payload: 0 });
  };

  const handleSearch = (e) => {
    const catSend = select === 'All' ? '' : select;
    dispatch({ type: PRODUCT_LIST_SELECTED, payload: 0 });
    dispatch({ type: PRODUCT_LIST_SEARCH, payload: searchKeyword });
    console.log(state);
    dispatch(
      listProducts(1, limit, catSend, searchKeyword, sort, priceFrom, priceTo)
    );
  };

  const style = state2
    ? {
        position: 'absolute',
        top: '.5rem',
        zIndex: 2,
        display: 'block',
        width: '2.375rem',
        height: '1.3rem',
        lineHeight: '1.3rem',
        textAlign: 'center',
        pointerEvents: 'none',
        color: '#aaa',
      }
    : {
        position: 'absolute',
        top: 0,
        zIndex: 2,
        display: 'block',
        width: '2.375rem',
        height: '2.375rem',
        lineHeight: '2.375rem',
        textAlign: 'center',
        pointerEvents: 'none',
        color: '#aaa',
        padding: '.4rem',
      };

  return loading ? (
    <Spinner animation="border" className="spiner" variant="secondary" />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="sidebar">
      <h3 className="text-center py-4">Categories</h3>
      <ListGroup as="ul" className="text-center">
        {categories.map((el, index) => (
          <ListGroup.Item
            as="li"
            className={`${el === select ? 'active text-red' : ''}`}
            key={el}
            onClick={() => handleSelect(el, index)}
          >
            <Link
              to=""
              className={`${el === select ? 'text-white' : 'text-dark'}`}
            >
              {el}
            </Link>
          </ListGroup.Item>
        ))}
        <hr />
        <Col className="mt-5">
          <RangeSlider
            value={value1}
            onChange={(e) => handleRangeFrom(Number(e.target.value))}
            min={0}
            max={1000}
            tooltipPlacement="top"
            variant="secondary"
            step={10}
          />
        </Col>
        <Col className="mt-3">
          <RangeSlider
            value={value2}
            onChange={(e) => handleRangeTo(Number(e.target.value))}
            min={0}
            max={1000}
            tooltipPlacement="top"
            variant="secondary"
            step={10}
          />
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="ml-5"
            onClick={handleRangeButton}
          >
            Filter by price <FontAwesomeIcon icon={faDollarSign} />
          </Button>
        </Col>
      </ListGroup>
      <div>
        <FormGroup className="has-search" style={{ position: 'relative' }}>
          <FormControl
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search"
            className="mr-5 pl-5"
          />
          <FontAwesomeIcon icon={faSearch} style={style} />
          <Button variant="secondary" className="ml-5" onClick={handleSearch}>
            Filter by search <FontAwesomeIcon icon={faSearch} />
          </Button>
        </FormGroup>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Sort by</Form.Label>
          <Form.Control as="select" value={sort} onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

export default Sidebar;
