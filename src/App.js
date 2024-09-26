import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";

import Header from "./components/mainPages/Header";
import Productdetails from "./components/productPages/ProductDetails";
import Signup from "./components/accountPage/signupPage";
import Signin from "./components/accountPage/signinPage";
import SubcategoryProducts from "./components/productPages/SubcategoryProducts";
import Cart from "./components/cartProcess/cart";
import Address from "./components/cartProcess/address";
import Orders from "./components/order/Order";
import PaymentPage from "./components/cartProcess/paymentPage";

function App() {

  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/subcategory/products/:id"
          element={<SubcategoryProducts />}
        />
        <Route path="/product/:id" element={<Productdetails />} />

        <Route path="/product/cart" element={<Cart />}></Route>
        <Route path="/cart/address" element={<Address />}></Route>
        <Route path="/active-orders" element={<Orders />}></Route>
        <Route path="/cart/address/checkout" element={<PaymentPage/>}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
