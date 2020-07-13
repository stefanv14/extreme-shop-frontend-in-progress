import { faEdit, faEnvelope, faEye, faEyeSlash, faIdCard, faPaperPlane, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { register } from "../../Redux/Actions/UserActions/UserActions";
import { email, firstName, lastName, pass, pid } from "./RegisterInputObjects";
import "./RegisterPage.css";
import ReusableInput from "./ReusableInput";

const RegisterPage = (props) => {
  const [state, setState] = useState();
  const [passShow, setPassShow] = useState(false);
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo])

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
    const v = state;
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
      dispatch(register(state.firstName, state.lastName,state.email, state.JMBG, state.password));
    }
  };
  return (
    <>
      <div className="register">
        <Row className="register-form">
          <h2
          className="register-form register-form--title"
          >
            <b>Register <FontAwesomeIcon icon={faEdit} /></b>
          </h2>
          {loading && <Spinner
      animation="border"
      className="spiner mx-auto my-auto"
      variant="secondary"
      style={{ justifySelf: 'center' }}
    />}
          {error && <div>{error}</div>}
          <Form className="p-4">
            <Form.Group controlId="formBasicInfo">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={firstName}
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    label="First Name"
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
                    placeholder="Enter Last Name"
                    name="lastName"
                    label="Last Name"
                    handler={formHandler}
                  />
                </Col>
                <Col  lg="1" xs="2" style={{paddingLeft: '0'}}>
                <FontAwesomeIcon className="mt-5" icon={faUserTie} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={email}
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    label="Email"
                    handler={formHandler}
                  />
                </Col>
                <Col  lg="1" xs="2" style={{paddingLeft: '0'}}>
                <FontAwesomeIcon className="mt-5" icon={faEnvelope} />
                </Col>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={pid}
                    type="text"
                    placeholder="Enter JMBG"
                    name="JMBG"
                    label="JMBG"
                    handler={formHandler}
                  />
                </Col>
                <Col  lg="1" xs="2" style={{paddingLeft: '0'}}>
                <FontAwesomeIcon className="mt-5" icon={faIdCard} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={pass}
                    type={passShow ? "text": "password"}
                    placeholder="Password"
                    name="password"
                    label="Password"
                    handler={formHandler}
                  />
                </Col>
                <Col lg="1" xs="2" style={{paddingLeft: '0'}}>
                {passShow? <FontAwesomeIcon className="mt-5" icon={faEyeSlash} onClick={handlePassShow} /> :
                <FontAwesomeIcon className="mt-5" icon={faEye} onClick={handlePassShow} />  
              }
                </Col>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={pass}
                    type={passShow ? "text": "password"}
                    placeholder="Repeat password"
                    name="rePassword"
                    label="Re password"
                    handler={formHandler}
                  />
                </Col>
                <Col lg="1" xs="2" style={{paddingLeft: '0'}}>
                {passShow? <FontAwesomeIcon className="mt-5" icon={faEyeSlash} onClick={handlePassShow} /> :
                <FontAwesomeIcon className="mt-5" icon={faEye} onClick={handlePassShow} />  
              }
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
                <FontAwesomeIcon icon={faPaperPlane} />&nbsp; Register
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

export default RegisterPage;
