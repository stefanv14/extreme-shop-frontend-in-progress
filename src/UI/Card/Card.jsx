import {
  faDollarSign,
  faShoppingCart,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, CardDeck } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Rating from './../Rating/Rating';

const CardComponent = ({ products }) => {
  let history = useHistory();
  console.log(history);
  const handleAddToCart = (id) => {
    history.push('/cart/' + id + '?qty=1');
  };

  return products.map((el) => (
    <CardDeck className="product-card" key={el.name + Math.random()}>
      <Card>
        <Link to={`/products/${el._id}`}>
          <div>
            <Card.Img
              variant="center"
              src={el.image}
              style={{ display: 'block' }}
              width="100%"
              height="250rem"
            />
          </div>

          <Card.Body className="product-card--body">
            <Card.Title as="h1">
              <b>{el.name}</b>
            </Card.Title>
            <Card.Text>{el.description}</Card.Text>
            <Card.Text>
              Price: <FontAwesomeIcon icon={faDollarSign} /> <b>{el.price}</b>
              <div className="d-flex">
                Rating : &nbsp;<b>{el.rating}</b> <Rating value={el.rating} />
              </div>
              <div>
                Reviews: <b>{el.numReviews}</b>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
        <Card.Footer>
          <small className="text-muted d-flex align-items-center">
            <FontAwesomeIcon icon={faWarehouse} className="text-dark mr-2" />{' '}
            {el.countInStock > 0 ? (
              <div>in stock.</div>
            ) : (
              <div>not in stock.</div>
            )}
            <Button
              variant="outline-dark"
              className="ml-auto"
              onClick={() => handleAddToCart(el._id)}
            >
              <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
              cart
            </Button>
          </small>
        </Card.Footer>
      </Card>
    </CardDeck>
  ));
};

export default CardComponent;
