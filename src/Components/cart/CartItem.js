import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const CartItem = (props) => {
    console.log(props)
  return (
    <Card>
      <Row>
        <Col lg={3}>
          {" "}
          <Card.Img
            style={{ width: "150px", height: "90%" }}
            variant="left"
            src={props.img}
          />
        </Col>
        <Col lg={9}>
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Title>{props.price}</Card.Title>

            <Button variant="danger" onClick={()=>{props.removeItem(props.id)}}>Remove</Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
