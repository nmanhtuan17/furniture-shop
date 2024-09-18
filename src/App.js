import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import { store, persistor } from "./redux/store";
import {
  About,
  Home,
  Cart,
  Error,
  Checkout,
  SingleProduct,
  Products,
  Login, Register,
  AdminPage,
  EditProduct
} from "./pages";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { AuthHelper } from "./components/Helper/AuthHelper";
import { MainLayout } from "./layout/MainLayout";

function App() {

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthHelper />
          {/* <Navbar />
          <Sidebar /> */}
          <Routes>
            <Route path="/" >
              <Route path="admin/"  >
                <Route path="" element={<AdminPage />}/>
                <Route path="product/:id" element={<EditProduct />} />
              </Route>
              <Route exact path="" element={<MainLayout />} >
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/products/:id" element={<SingleProduct />} />
              </Route>
              <Route path="auth/" >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              {/* <PrivateRoute exact path="/checkout" element={<Checkout />} /> */}
              <Route exact path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  );
}

export default App;
