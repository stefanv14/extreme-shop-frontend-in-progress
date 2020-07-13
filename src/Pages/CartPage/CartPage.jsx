import {
  faDollarSign,
  faShoppingCart,
  faSortNumericDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
} from '../../Redux/Actions/CartActions/CartActions';
import './CartPage.css';

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(productId, qty);
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const checkOutHandler = () => {
    props.history.push('/login?redirect=shipping');
  };
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>
              Shopping cart <FontAwesomeIcon icon={faShoppingCart} />
            </h3>
            <div>
              <FontAwesomeIcon icon={faDollarSign} className="text-dark ml-2" />{' '}
              Price
            </div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item-container" key={item.name}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name d-flex align-items-center justify-content-around">
                  <Link
                    to={`product/${item.product}`}
                    className="text-dark"
                    style={{ flexBasis: '20rem' }}
                  >
                    <b>{item.name}</b>
                  </Link>
                  <Form.Label className="d-flex align-items-center">
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faSortNumericDown}
                    />{' '}
                    Qty:
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                      className="ml-4"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Control>
                  </Form.Label>

                  <Button
                    variant="dark"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <FontAwesomeIcon className="mr-2" icon={faTrash} /> Delete
                  </Button>
                </div>
                <div className="cart-price">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-dark ml-2"
                  />{' '}
                  {item.price}
                </div>
              </div>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + qty, 0)} items):{' '}
          <FontAwesomeIcon icon={faDollarSign} className="text-dark ml-2" />{' '}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <Button
          variant="dark"
          onClick={checkOutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          &nbsp; Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
