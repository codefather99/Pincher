import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Message from '../components/message';
import Loader from '../components/loader';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
 const navigate = useNavigate();
 
 const cart = useSelector((state) => state.cart);

const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);
 
  const dispatch = useDispatch();

 const PlaceOrderHandler = async() => {
  try {
    const res = await createOrder({
      orderItems:cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }).unwrap();

    dispatch(clearCartItems());
    navigate(`/order/${res._id}`);
  } catch (err) {
    toast.error(err.message || 'An error occured');
    
  }
 };
 
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
    <Row>
      <Col md={8}>
      <ListGroup variant='flush'>
       <ListGroup.Item>
        <h2>Shipping</h2>
        <p>
          <strong>Address: </strong>
           {cart.shippingAddress.address}, {cart.shippingAddress.city}{''}
          {cart.shippingAddress.postalCode},{''} {cart.shippingAddress.country}.
        </p>
       </ListGroup.Item>

       <ListGroup.Item>
       <h2>Payment Method</h2>
       <strong>Method: </strong>
       {cart.paymentMethod}
       </ListGroup.Item>

       <ListGroup.Item>
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant='flush'>
           {cart.cartItems.map((item, index) => (
            <ListGroup.Item key={index}>
             <Row>
              <Col md={1}>
              <Image 
              src={item.image}
              alt={item.name}
              fluid
              rounded
              />
              </Col>

              <Col>
              <Link to ={`/products/${item.product}`}>
              {item.name}
              </Link>
              </Col>
              <Col md={4}>
               {item.qty} x ${item.price} = ${item.qty * item.price}
              </Col>
             </Row>
            </ListGroup.Item>
           ))}
          </ListGroup>
        )}
       </ListGroup.Item>

      </ListGroup>
      </Col>
      <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Order Summary</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Items:</Col>
              <Col>${cart.itemsPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Shipping:</Col>
              <Col>${cart.shippingPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Tax:</Col>
              <Col>${cart.taxPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Total:</Col>
              <Col>${cart.totalPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            {error && (
              <Message variant='danger'>{error.data.message}</Message>
          ) }
          </ListGroup.Item>

          <ListGroup.Item>
            <Button
            type='button'
            className='btn-black'
            disabled={cart.cartItems === 0}
            onClick={PlaceOrderHandler}
            >
            Place Order
            </Button>
            
            {isLoading && <Loader />}
          </ListGroup.Item>
          
        </ListGroup>
      
      </Card>
      </Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen;