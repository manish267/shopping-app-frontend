import React, { useState,useEffect,useContext } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link,useHistory,useParams } from "react-router-dom";
import axios from "axios";
import "./Show.css";
import ProductReviews from "../products/ProductReviews";
import './star.css'
import UserContext from './../../store/user-context'

function Show(){

 const [name,setName]=useState('');
 const [img,setImg]=useState('');
 const [price,setPrice]=useState('');
 const [desc,setDesc]=useState('');
 const [rating,setRating]=useState('');
 const [comment,setComment]=useState('');
 const [reviews,setReviews]=useState('');

 const params=useParams();
 const history=useHistory();
 const currentUser=useContext(UserContext)

  async function getProduct() {
    let product = await axios.get(`/products/${params.id}`);
    product = product.data;
    
      setName(product.name)
      setImg(product.img)
      setPrice(product.price)
      setDesc(product.desc)
      setReviews(product.reviews)
    
  }

  useEffect(()=>{
    getProduct();
// eslint-disable-next-line 
  },[]);

  const {addToCart}=currentUser;

  const addToCartHandler=()=>{
    const product={
        id:params.id,
        name:name,
        price:price,
        desc:desc,
        img:img,
        reviews:reviews
    }
    addToCart(product);

  }

  async function deleteProductHandler(){
    await axios.delete(`/products/${params.id}`);
    history.push("/products");
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    await axios.post(`/products/${params.id}/review`, {
      rating:rating,
      comment:comment,
    });
    let product = await axios.get(`/products/${params.id}`);
    product = product.data;

    setReviews(product.reviews);
    setRating(1)
    setComment('')
  };


    let displayReviews = <p>This product has no reviews yet</p>;

    if (reviews.length) {
      displayReviews = reviews.map((review) => {
        return (
          <ProductReviews
            rating={review.rating}
            comment={review.comment}
            key={review._id}
          />
        );
      });
    }

    return (
      <Row>
        <Col className="show-card" lg={6} md={12}>
          <Card style={{ width: "23rem", margin: "5px auto" }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{desc}</Card.Text>
              <Card.Title>&#8377;{price}</Card.Title>
              <Button className="mb-2 me-2" variant="primary">
                <Link to={`/products/`}>Buy Now</Link>
              </Button>
              <Button onClick={addToCartHandler} className="mb-2 me-2" variant="success">
                Add To Cart
              </Button>
              <Button className="mb-2 me-2" variant="info">
                <Link to={`/products/${params.id}/edit`}>
                  Edit
                </Link>
              </Button>
              <Button
                onClick={deleteProductHandler}
                className="mb-2 me-2"
                variant="danger"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mt-3" lg={4} md={12}>
          <h1>Leave a Review</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3">
              <br />
              
              <fieldset className="starability-basic">
                <legend>Rating:</legend>
                <input
                  type="radio"
                  id="no-rate"
                  className="input-no-rate"
                  name="rating"
                  value="0"
                  defaultChecked
                  aria-label="No rating."
                />
                <input type="radio" id="first-rate1" name="rating" value="1"  onChange={(e)=>setRating(e.target.value)}/>
                <label htmlFor="first-rate1" title="Terrible">
                  1 star
                </label>
                <input type="radio" id="first-rate2" name="rating" value="2"  onChange={(e)=>setRating(e.target.value)} />
                <label htmlFor="first-rate2" title="Not good">
                  2 stars
                </label>
                <input type="radio" id="first-rate3" name="rating" value="3" onChange={(e)=>setRating(e.target.value)}/>
                <label htmlFor="first-rate3" title="Average">
                  3 stars
                </label>
                <input type="radio" id="first-rate4" name="rating" value="4"  onChange={(e)=>setRating(e.target.value)}/>
                <label htmlFor="first-rate4" title="Very good">
                  4 stars
                </label>
                <input type="radio" id="first-rate5" name="rating" value="5" onChange={(e)=>setRating(e.target.value)}/>
                <label htmlFor="first-rate5" title="Amazing">
                  5 stars
                </label>
              </fieldset>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={comment}
                onChange={(e)=>setReviews(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          <div className="m-3 mt-3 mb-3">{displayReviews}</div>
        </Col>
      </Row>
    );
  }


export default Show;
