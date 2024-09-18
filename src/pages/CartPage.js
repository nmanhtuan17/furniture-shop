import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";
import { useAppSelector } from "../redux/store";

const CartPage = () => {
  const {carts} = useAppSelector(state => state.cart)

  if (carts.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            Start shopping
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
