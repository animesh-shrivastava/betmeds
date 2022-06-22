import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Brand from "./administrator/brand";
import SubCategories from "./administrator/subcategories";
import Categories from "./administrator/categories";
import DisplayCategories from "./administrator/DisplayAllCategories";
import DisplaySubCategories from "./administrator/DisplayAllSubcategories";
import DisplayBrands from "./administrator/DisplayAllBrands";
import DisplayProducts from "./administrator/DisplayAllProducts";
// import Products from "./administrator/products";
import AdminLogin from "./administrator/adminLogin";
import AdminDashboard from "./administrator/AdminDashboard";
// import ProductsImages from "./administrator/ProductImages";
import Header from "./UserInterface/Header";
import Footer from "./UserInterface/Footer";
import Home from "./UserInterface/Home";
import BannerImages from "./administrator/BannerImages";

import Brand from "./administrator/Brands";
import Product from "./administrator/Product";
import ProductImages from "./administrator/ProductImages";
import CustomerSignin from "./UserInterface/SignIn";
import CustomerSignUp from "./UserInterface/SignUp";
import ProductShow from "./UserInterface/ProductShow";
import Productlist from "./UserInterface/Productlist";
import Proceedcart from "./UserInterface/ShowCart";
import ShowCartReview from "./UserInterface/ShowCartReview";
import FinalCartReview from "./UserInterface/FinalCartReview";

function App() {
  return [
    <BrowserRouter>
      <Routes>
        <Route element={<Categories />} path="/categories" />
        <Route element={<SubCategories />} path="/subcategories" />
        <Route element={<Brand />} path="/brand" />
        <Route element={<Product />} path="/products" />
        <Route element={<DisplayCategories />} path="/displaycategories" />
        <Route element={<DisplaySubCategories />} path="/displaysubcategories"/>
        <Route element={<DisplayBrands />} path="/displaybrands" />
        <Route element={<DisplayProducts />} path="/displayproducts" />
        <Route element={<AdminLogin />} path="/adminlogin" />
        <Route element={<AdminDashboard />} path="/admindashboard" />
        <Route element={<ProductImages />} path="/productimages" />
        <Route element={<Header />} path="/header" />
        <Route element={<Footer />} path="/footer" />
        <Route element={<Home />} path="/home" />
        <Route element={<BannerImages />} path="/bannerimages" />
        <Route element={<CustomerSignUp />} path="/csignup" />
        <Route element={<CustomerSignin />} path="/clogin" />
        <Route element={<ProductShow />} path="/productshow" />
        <Route element={<Productlist />} path="/productlist" />
        <Route element={<Proceedcart />} path="/showcart" />
        <Route element={<ShowCartReview />} path="/showcartreview" />
        <Route element={< FinalCartReview/>} path="/finalcartreview" />

        

        {/* <Route element={<Productview/>} path="/proceedcart"/> */}
      </Routes>
    </BrowserRouter>,
  ];
}

export default App;
