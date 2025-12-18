import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/NavBar'
import HeroSection from './component/HeroSection'
import TestimonialStatic from './component/MotionText'
import Footer from './component/Footer'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Category from './component/CategoryList'
import CategoryProducts from './component/CategoryProducts'


// Admin Imports
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import Users from './admin/Users'
import Products from './admin/Products'
import Categories from './admin/Categories'
import AdminLogin from './admin/AdminLogin'
import Orders from './admin/Orders'
import ProductList from './component/ProductList'
import MovingBar from './component/MovingBar'
import CartPage from './pages/cart'
import UserOrders from './pages/Orders'

const Website = () => (
  <>
    <Navbar />
    <HeroSection />
    <Category />
    <MovingBar />
    <ProductList />
    {/* <TimelessStaples /> */}
    <TestimonialStatic />
    <Footer />
  </>
)

import ProtectedRoute from './component/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* <Header></Header> */}
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>

        <Route path='/cart' element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />

        <Route path='/orders' element={
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        } />

        <Route path='/collections' element={
          <>
            <Navbar />
            <ProductList />
            <Footer />
          </>
        } />

        <Route path='/brands' element={
          <>
            <Navbar />
            <Category />
            <Footer />
          </>
        } />


        {/* Main Website Route */}
        <Route path="/" element={<Website />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />


        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

