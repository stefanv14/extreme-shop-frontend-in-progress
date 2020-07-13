import {
  faDollarSign,
  faEye,
  faHome,
  faInfo,
  faShoppingCart,
  faStar,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  detailsProduct,
  saveProductReview,
} from '../../Redux/Actions/ProductActions/ProductActions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../../Redux/ActionTypes/ProductTypes/ProductTypes';
import './ProductPage.css';

const ProductPage = (props) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }

    dispatch(detailsProduct(props.match.params.id));
    console.log(props.match.params.id);
    return () => {
      //
    };
  }, [dispatch, productSaveSuccess, props.match.params.id]);

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  return (
    <div className="product-item">
      {/* <Container className="container-wrapper"> */}
      <div className="back-to-result">
        <Link to="/">
          <Button variant="outline-dark">
            <FontAwesomeIcon icon={faHome} /> Back to home
          </Button>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <Image src={product.image} alt="product" fluid />
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>
                    <b>{product.name}</b>
                  </h4>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} className="text-warning" />{' '}
                  {product.rating} Stars
                </li>
                <li>
                  <FontAwesomeIcon icon={faEye} className="text-dark" />{' '}
                  {product.numReviews} Reviews
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-dark ml-2"
                  />{' '}
                  <b className="ml-2">{product.price}</b>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faInfo}
                    className="text-dark ml-2 mr-2"
                  />{' '}
                  {product.description}
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price:{' '}
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-dark ml-2"
                  />{' '}
                  <b>{product.price}</b>
                </li>
                <li>
                  Status:{' '}
                  <FontAwesomeIcon
                    icon={faWarehouse}
                    className="text-dark ml-2"
                  />{' '}
                  <b className="ml-1">
                    {product.countInStock > 0 ? 'In stock' : 'Unvaluable'}
                  </b>
                </li>
                <li>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="d-flex">
                      Qty:{' '}
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        style={{ width: '15%', marginLeft: '1rem' }}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Label>
                  </Form.Group>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <Button variant="warning" onClick={handleAddToCart}>
                      <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />{' '}
                      Add to cart
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {/* {!product.reviews.length && <div>There is no review</div>} */}
            <ul className="review" id="reviews">
              {/* {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))} */}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
      {/* </Container> */}
    </div>
  );
};

export default ProductPage;
