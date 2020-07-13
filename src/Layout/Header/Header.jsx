import { faXing } from '@fortawesome/free-brands-svg-icons';
import {
  faHome,
  faListOl,
  faSearch,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import { logout } from '../../Redux/Actions/UserActions/UserActions';

const Header = () => {
  const [state, setState] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    if (window.innerWidth < 800) {
      setState(true);
    }
  }, [state]);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const style = state
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
  return (
    <HashRouter>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
        <Container>
          <Navbar.Brand href="#">
            e{' '}
            <FontAwesomeIcon
              icon={faXing}
              className="pt-2"
              size="lg"
              style={{ fontSize: '2rem' }}
            />{' '}
            treme
          </Navbar.Brand>{' '}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ml-5">
              <Link to="/" className="nav-link">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
              <Link to="/cart" className="nav-link">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Link>
              {userSignin.userInfo?.isAdmin ? (
                <>
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>
                  <Link to="/admin" className="nav-link">
                    <FontAwesomeIcon icon={faListOl} /> Products
                  </Link>
                </>
              ) : (
                false
              )}
            </Nav>
            <Form inline className="form d-flex align-items-center">
              <FormGroup
                className="has-search"
                style={{ position: 'relative' }}
              >
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-5 pl-5"
                />
                <FontAwesomeIcon icon={faSearch} style={style} />
              </FormGroup>
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  alignSelf: 'center',
                  color: '#aaa',
                  marginLeft: 'auto',
                }}
              />
              {userInfo ? (
                <>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                  <Link to="/" className="nav-link" onClick={handleLogOut}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link to="/login" className="nav-link login-btn">
                  Login
                </Link>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HashRouter>
  );
};

export default Header;
