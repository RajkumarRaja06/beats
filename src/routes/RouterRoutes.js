import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import UserProfile from '../pages/UserProfile';
import UserEditProfile from '../pages/UserEditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RouterRoutes = () => {
  useScrollRestore();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route
          path='/product-details/:productId'
          element={<ProductDetails />}
        />
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/user-edit-Profile' element={<UserEditProfile />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme='light'
        transition='Zoom'
      />
      <ToastContainer />
    </>
  );
};

export default RouterRoutes;
