import { faEnvelope, faEye, faEyeSlash, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../../Redux/Actions/UserActions/UserActions';
import './LoginPage.css';

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passShow, setPassShow] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);
  const handlePassShow = () => {
    console.log("click");
    setPassShow(!passShow);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
    console.log('submitHandler -> password', password);
    console.log('submitHandler -> email', email);
  };

  
  return (
    <div className="login">
      <Row className="login-form">
        <h2 className="login-form login-form--title"><b>Login <FontAwesomeIcon icon={faSignInAlt} /></b></h2>
        <Form className="p-4" onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col lg="1" xs="2"  style={{paddingLeft: '0'}}>
                <FontAwesomeIcon icon={faEnvelope} />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type={passShow ? "text": "password"}
                  placeholder="Password"
                  name="email"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col lg="1" xs="2"  style={{paddingLeft: '0'}}>
                {passShow? <FontAwesomeIcon icon={faEyeSlash} onClick={handlePassShow} /> :
                <FontAwesomeIcon icon={faEye} onClick={handlePassShow} />  
              }
                
              </Col>
            </Row>
          </Form.Group>
          <Row className="d-flex justify-content-center">
            {loading && <Spinner animation="border" variant="secondary" />}
            {error && <div className="text-danger">{error}</div>}
          </Row>
          <Row className="d-flex justify-content-center">
            <Button variant="dark" type="submit" className="mt-5 px-4">
            <FontAwesomeIcon icon={faSignInAlt} />&nbsp; Login
            </Button>
          </Row>
          <Row className="d-flex justify-content-center mt-4">
            Don`t have an account?
          </Row>
          <Row className="d-flex justify-content-center">
            Register{' '}
            <Link to={redirect === "/" ? "register" : `register?redirect=${redirect}`} className="text-primary">
              &nbsp;<u>here</u>
            </Link>
          </Row>
        </Form>
      </Row>
    </div>
  );
};

export default LoginPage;
