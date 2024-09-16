import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  About,
  Home,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  SingleProduct,
  Products,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={Home}/>
          {/* <Home /> */}
        {/* </Route> */}
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:id">
          <SingleProduct />
        </Route>
        {/* <Route exact path="/products/:id" children={<SingleProduct />} /> */}
        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>
        <Route exact path="*">
          <Error />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
