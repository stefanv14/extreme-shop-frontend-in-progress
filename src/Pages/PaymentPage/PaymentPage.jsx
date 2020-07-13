import { faEdit, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { savePayment } from '../../Redux/Actions/CartActions/CartActions';
import CheckoutSteps from "../../UI/CheckoutSteps/CheckoutSteps";
import "./PaymentPage.css";

const PaymentPage = (props) => {
  const [state, setState] = useState();
  const [passShow, setPassShow] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  const dispatch = useDispatch();

  const submitHandle = () => {
      dispatch(savePayment({ paymentMethod }));
      props.history.push('placeorder');
  };
  return (
    <>
      <div className="register">
        <div>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
        </div>
        <Row className="register-form">
          <h2
          className="register-form register-form--title"
          >
            <b>Shipping <FontAwesomeIcon icon={faEdit} /></b>
          </h2>
          <Form className="p-4">
            <Form.Group controlId="formBasicAddress">
              <Row>
                <Col xs={10} lg={5}>
                  <label htmlFor="radio"  className="mr-4">Paypal</label>
                  <input type="radio" name="paymentMethod" id="paymentMethod"  onChange={e => setPaymentMethod(e.target.value)} value="paypal"/>
                </Col>
              </Row>
            </Form.Group>

            <Row className="d-flex justify-content-center">
              <Button
                variant="dark"
                type="button"
                className="mt-4 px-4"
                onClick={submitHandle}
              >
                <FontAwesomeIcon icon={faPaperPlane} />&nbsp; Continue
              </Button>
            </Row>
            <Row className="d-flex justify-content-center mt-4">
              Already have account?
            </Row>
            <Row className="d-flex justify-content-center">
              Login{" "}
              <Link to={redirect === "/" ? "login" : `login?redirect=${redirect}`} className="text-primary">
              &nbsp;<u>here</u>
            </Link>
            </Row>
          </Form>
        </Row>
      </div>
    </>
  );
};

export default PaymentPage;
