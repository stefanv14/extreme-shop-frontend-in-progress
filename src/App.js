import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
import AdminPage from './Pages/AdminPage/AdminPage';
import CartPage from './Pages/CartPage/CartPage';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import OrderPage from './Pages/OrderPage/OrderPage';
import OrdersPage from './Pages/OrdersPage/OrdersPage';
import PaymentPage from './Pages/PaymentPage/PaymentPage';
import PlaceOrderPage from './Pages/PlaceOrderPage/PlaceOrderPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ShippingPage from './Pages/ShippingPage/ShippingPage';
import Sidebar from './UI/Sidebar/Sidebar';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(sections) => (
            <div className="home-wrapper d-flex flex-wrap justify-content-around">
              <Sidebar />
              <HomePage />
            </div>
          )}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin/" component={AdminPage} />
        <Route path="/products/:id" component={ProductPage} />
        <Route path="/cart/:id?" component={CartPage} />
        <Route path="/shipping" component={ShippingPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/placeorder" component={PlaceOrderPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/order/:id" component={OrderPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
