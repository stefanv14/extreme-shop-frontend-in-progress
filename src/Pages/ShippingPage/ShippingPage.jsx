import { faEdit, faPaperPlane, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { saveShipping } from '../../Redux/Actions/CartActions/CartActions';
import CheckoutSteps from "../../UI/CheckoutSteps/CheckoutSteps";
import { firstName, lastName, postal } from "./RegisterInputObjects";
import ReusableInput from "./ReusableInput";
import "./ShippingPage.css";

const ShippingPage = (props) => {
  const [state, setState] = useState({
    address: '', city: '', postalCode: '', country: ''

  });
  const [passShow, setPassShow] = useState(false);
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  const dispatch = useDispatch();

  const {address, city, postalCode, country} = state;

  const formHandler = (name, value, error) => {
    setState({...state,
      [name]: value,
      [name + "Error"]: error,
    });
    console.log(name, value, error);
  };

  const handlePassShow = () => {
    console.log("click");
    setPassShow(!passShow);
  }

  const submitHandle = () => {
    const v = state || "Empty values";
    var values = (Object.keys(v)).reduce(
      (accumulator, current) => {
        accumulator.push(v[current]);
        console.log(accumulator, current);
        return accumulator.filter((el) => el === true);
      },
      []
    );
    console.log(values[0]);
    if (values[0]) {
      console.log("Nije validna");
      console.log(state);
    } else {
      console.log("validna");
      console.log(state);
      dispatch(saveShipping({address, city, postalCode, country}));
      props.history.push('payment');
    }
  };
  return (
    <>
      <div className="register">
        <div>
          <CheckoutSteps step1 step2></CheckoutSteps>
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
                  <ReusableInput
                    elName={firstName}
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    label="Address"
                    handler={formHandler}
                  />
                </Col>
                <Col  lg="1" xs="2" style={{paddingLeft: '0'}}>
                <FontAwesomeIcon className="mt-5" icon={faUser} />
                </Col>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={lastName}
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    label="City"
                    handler={formHandler}
                  />
                </Col>
                <Col  lg="1" xs="2" style={{paddingLeft: '0'}}>
                <FontAwesomeIcon className="mt-5" icon={faUserTie} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBasicInfo">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={postal}
                    type="text"
                    placeholder="Enter Postal code"
                    name="postalCode"
                    label="Postal code"
                    handler={formHandler}
                  />
                </Col>
                <Col  lg="1" xs="2" style={{paddingLeft: '0'}}>
                <FontAwesomeIcon className="mt-5" icon={faUser} />
                </Col>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={lastName}
                    type="text"
                    placeholder="Enter Country"
                    name="country"
                    label="Country"
                    handler={formHandler}
                  />
                </Col>
                <Col  lg="1" xs="2" style={{paddingLeft: '0'}}>
                <FontAwesomeIcon className="mt-5" icon={faUserTie} />
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
                <FontAwesomeIcon icon={faPaperPlane} />&nbsp; Submit
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

export default ShippingPage;
