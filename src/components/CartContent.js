import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import {useAppSelector} from "../redux/store";

const CartContent = () => {
  const {carts} = useAppSelector(state => state.cart);

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {carts.map((item) => {
        return <CartItem key={item._id} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
      </div>
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    text-align: center;
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-grey-10);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .link-btn:hover {
    opacity: 80%;
  }
  @media (max-width: 800px) {
    .link-container {
      flex-direction: column;
    }
    .link-btn {
      margin-top: 1rem;
    }
  }
  .clear-btn {
    background: var(--clr-black);
    font-size: 14px;
  }
`;
export default CartContent;
