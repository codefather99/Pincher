import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Paginate from '../components/Paginate';
import Loader from '../components/loader';
import Message from '../components/message';
import ProductsCorousels from '../components/ProductsCorousels';

import React from 'react';

const Homescreen = () => {
  const {pageNumber, keyword} = useParams();
  const {data, isLoading, error } = useGetProductsQuery({keyword, pageNumber});

  return (
    <>
    { !keyword ? (<ProductsCorousels />) : ( <Link to='/' className='btn btn-light mb-4'>Go Back</Link>)}
    {isLoading ? (
      <Loader/>
    ): error ? (<Message variant='danger'>{ error?.data?.message || error.error }</Message>) : (<>
     {/* <h1>
     Latest Products
 </h1> */}

 {keyword ? <h1>You searched for '{keyword}' </h1> : <h1> Latest Products</h1>}
   <Row className='justify-content-center'>
     {data.products.map((product) => (
         <Col key={product._id} sm={12} md={6} lg = {3} xl={4}  >
           <Product product= {product} />
         </Col>
     ) )}
 </Row> 

<Paginate 
pages = {data.pages}
page = {data.page}
keyword =  {keyword ? keyword : ''}
/>

    
    </>)}

    </>
  );
};

export default Homescreen