import { faDollarSign, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../../UI/CheckoutSteps/CheckoutSteps';
import './PlaceOrderPage.css';

const PlaceOrderPage = (props) => {
  // const [cartItems, setCartItems] = useState()
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    props.history.push('/shipping');
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    // create an order
  };

  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const checkOutHandler = () => {
    props.history.push('/login?redirect=shipping');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3 className="pb-4">
              <b>Shipping</b>
            </h3>
            <div>
              {shipping.address}, {shipping.city},{shipping.postalCode},{' '}
              {shipping.country},
            </div>
          </div>
          <div className="mt-5">
            <h3 className="pb-4">
              <b>Payment</b>
            </h3>
            <div>Payment Method: {payment.paymentMethod}</div>
          </div>
          <div className="mt-5">
            <ul className="cart-list-container">
              <li>
                <h3 className="pb-4">
                  <b>Shopping Cart</b>
                </h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={'/product/' + item.product}>{item.name}</Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>
                {itemsPrice}{' '}
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="text-dark ml-2"
                />
              </div>
            </li>
            <li>
              <div>Shipping</div>
              <div>
                {shippingPrice}{' '}
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="text-dark ml-2"
                />
              </div>
            </li>
            <li>
              <div>Tax</div>
              <div>
                {taxPrice}{' '}
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="text-dark ml-2"
                />
              </div>
            </li>
            <hr />
            <li>
              <div>Order Total</div>
              <div>
                {totalPrice}{' '}
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="text-dark ml-2"
                />
              </div>
            </li>
            <li>
              <Button
                variant="warning"
                onClick={placeOrderHandler}
                className="mt-5"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                &nbsp; Place Order
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
