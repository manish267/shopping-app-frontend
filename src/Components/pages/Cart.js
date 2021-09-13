import React, { useContext } from "react";
import UserContext from "../../store/user-context";
import CartItem from "../cart/CartItem";
import { Container, Row, Col, ListGroup,Button } from "react-bootstrap";

const Cart = () => {
  const currentUser = useContext(UserContext);
  const { cart } = currentUser;

  let allItems = "<p>Your Cart is Empty</p>";
  let priceList=[];
  let totalPrice=0;

  function removeItemHandler(productid){
      console.log(productid)
      currentUser.removeFromCart(productid);
  }

  if (cart.length) {
    allItems = cart.map((item) => {
        priceList.push({name:item.name,price:item.price,id:item._id})
        totalPrice+=parseFloat(item.price);
      return (
        <Col lg={8} md={8} key={item._id}>
          <CartItem
            key={item._id}
            name={item.name}
            price={item.price}
            img={item.img}
            id={item._id}
          removeItem={removeItemHandler}
          />
        </Col>
      );
    });
  }

  return (
    <Container>
      <Row>
        <Col lg={8}>
         <Row>{allItems}</Row>
        </Col>
        <Col lg={4}>
        <ListGroup>

        {priceList.map((item)=><ListGroup.Item key={item.id}> <strong>{item.name}</strong> - &#8377;{item.price}</ListGroup.Item>)}
           
          </ListGroup>
        <h4>Total Amount is: {totalPrice}</h4>
        <Button variant="success">Buy Now</Button>
        </Col>
        
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Cart;
