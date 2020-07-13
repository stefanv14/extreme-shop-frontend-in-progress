import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { logout, update } from '../../Redux/Actions/UserActions/UserActions';
import './ProfilePage.css';
function ProfilePage(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/login');
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      setEmail(userInfo.email);
      setName(userInfo.firstName);
      setPassword(userInfo.password);
    }
    return () => {};
  }, [userInfo]);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>User Profile</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {success && <div>Profile Saved Successfully.</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  type="text"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>

              <li>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </li>
              <li>
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  className="button secondary full-width"
                >
                  Logout
                </Button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined"></div>
    </div>
  );
}

export default ProfilePage;
