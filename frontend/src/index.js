import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import { Provider } from 'react-redux'
import store from './store';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import Homescreen from './Screens/Homescreen';
import Productscreen from './Screens/Productscreen';
import Cartscreen from './Screens/Cartscreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PrivateRoute from './components/PrivateRoute';
import PlaceOrderScreen from './Screens/PlaceOrdersScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AdminRoute from './components/AdminRoutes';
import reportWebVitals from './reportWebVitals';
import OrderListsScreen from './Screens/admin/OrderListsScreens';
import ProductListScreen from './Screens/admin/ProductListScreen';
import ProductEditScreen from './Screens/admin/ProductEditScreen';
import UserListScreen from './Screens/admin/UserListScreen'
import UserEditScreen from './Screens/admin/UserEditScreen';
import {HelmetProvider} from 'react-helmet-async';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<App />}>
       <Route index= {true} path='/' element= {<Homescreen />}/>
       <Route path='/search/:keyword' element= {<Homescreen />}/>
       <Route path='/page/:pageNumber' element= {<Homescreen />}/>
       <Route path='/search/:keyword/page/:pageNumber' element= {<Homescreen />}/>
       <Route  path='/product/:id' element= {<Productscreen />}/>
       <Route path='/cart' element={ <Cartscreen />} />
       <Route path='/login' element={ <LoginScreen />} />
       <Route path='/register' element={ <RegisterScreen />} />
       
       
     <Route path ='' element={<PrivateRoute />}>
       <Route path='/shipping' element={ <ShippingScreen />} />
       <Route path='/payment' element={ <PaymentScreen />} />
       <Route path='/placeorder' element={ <PlaceOrderScreen />} />
       <Route path='/order/:id' element={ <OrderScreen />} />
       <Route path='/profile' element={ <ProfileScreen />} />
     </Route>

     <Route path ='' element={<AdminRoute />}>
     <Route path='/admin/orderlist' element={ <OrderListsScreen />} />
     <Route path='/admin/productlist' element={ <ProductListScreen />} />
     <Route path='/admin/productlist/:pageNumber' element={ <ProductListScreen />} />
     <Route path='/admin/product/:id/edit' element={ <ProductEditScreen />} />
     <Route path='/admin/userlist' element={ <UserListScreen />} />
     <Route path='/admin/user/:id/edit' element={ <UserEditScreen />} />
     </Route>
    </Route>
  )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
  <Provider store={store}>
    <PayPalScriptProvider  deferLoading={true}>
    <RouterProvider router = {router} />
    </PayPalScriptProvider>   
   </Provider>
   </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
