import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/message';
import Loader from '../../components/loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice';


const ProductEditScreen = () => {
  const { id : productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);
  
const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();

const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();

const navigate = useNavigate();

useEffect(() => {
    if (product) {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);

    }
}, [product]);

  const submitHandler = async (e) => {
   e.preventDefault();
   const updatedProduct = {
    productId,
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
   };
  
   const result = await updateProduct(updatedProduct)
   if (result.error) {
    toast.error(result.error);
   } else {
    toast.success('product updated');
    navigate('/admin/productlist');
   }
  }

 const uploadFileHandler = async (e) => {
   const formData = new FormData();
   formData.append('image', e.target.files[0]);
   try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
   } catch (err) {
      toast.error(err?.data?.message || err.error);
   }
   
 }

  return (
    <>
    <Link to = '/admin/productlist' className='btn btn-light my-3'>
      Go Back
    </Link>
    <FormContainer>
        <h1>Edit Products</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
           
           <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name' className='my-2'>
                   <Form.Label>Name</Form.Label>
                   <Form.Control
                   type='name'
                   placeholder='Enter name'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price' className='my-2'>
                   <Form.Label>price</Form.Label>
                   <Form.Control
                   type='number'
                   placeholder='Enter price'
                   value={price}
                   onChange={(e) => setPrice(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image' className='my-2'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage}
                  ></Form.Control>
                   <Form.Control
                   type='file'
                   label='Choose file'
                   onChange={uploadFileHandler}
                   ></Form.Control>
                                    
                </Form.Group>
                {loadingUpload && <Loader />}

                <Form.Group controlId='brand' className='my-2'>
                   <Form.Label>Brand</Form.Label>
                   <Form.Control
                   type='text'
                   placeholder='Enter brand'
                   value={brand}
                   onChange={(e) => setBrand(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'className='my-2'>
                   <Form.Label>count in Stock</Form.Label>
                   <Form.Control
                   type='number'
                   placeholder='Enter countInStock'
                   value={countInStock}
                   onChange={(e) => setCountInStock(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category' className='my-2'>
                   <Form.Label>category</Form.Label>
                   <Form.Control
                   type='text'
                   placeholder='Enter category'
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description' className='my-2'>
                   <Form.Label>description</Form.Label>
                   <Form.Control
                   type='text'
                   placeholder='Enter description'
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Button 
                type='submit'
                variant='primary'
                className='my-2'
                >
                  Update
                </Button>
            </Form>
        )} 
    </FormContainer>
    </>
  )
}

export default ProductEditScreen