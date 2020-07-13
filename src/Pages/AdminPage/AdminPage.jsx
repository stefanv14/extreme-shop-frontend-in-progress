import {
  faArrowLeft,
  faEdit,
  faListOl,
  faPaperPlane,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProdcut,
  listProducts,
  saveProduct,
} from '../../Redux/Actions/ProductActions/ProductActions';
import './AdminPage.css';

const AdminPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete, dispatch]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.table(
      id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    );
    const product = {
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    dispatch(saveProduct(product));
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>
          <FontAwesomeIcon icon={faListOl} /> Products
        </h3>
        <Button variant="info" onClick={() => openModal({})}>
          <FontAwesomeIcon icon={faPlus} /> Create Product
        </Button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>
                  <FontAwesomeIcon icon={faPlus} /> Create Product
                </h2>
              </li>
              <li>
                {loadingSave && (
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Spinner
                      animation="border"
                      style={{ height: '7rem', width: '7rem' }}
                      variant="secondary"
                    />
                  </div>
                )}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <Button variant="info" type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />{' '}
                  {id ? 'Update' : 'Create'}
                </Button>
              </li>
              <li>
                <Button variant="dark" onClick={() => setModalVisible(false)}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Back
                </Button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <Table striped bordered hover className="text-center mt-5">
          <thead>
            <tr>
              <th className="bg-secondary text-white">ID</th>
              <th className="bg-secondary text-white">Name</th>
              <th className="bg-secondary text-white">Price</th>
              <th className="bg-secondary text-white">Category</th>
              <th className="bg-secondary text-white">Brand</th>
              <th className="bg-secondary text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  top: '30%',
                }}
              >
                <Spinner
                  animation="border"
                  style={{ height: '7rem', width: '7rem' }}
                  variant="secondary"
                />
              </div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => openModal(product)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(product)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
