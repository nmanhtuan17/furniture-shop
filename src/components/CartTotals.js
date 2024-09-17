import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/store";
const CartTotals = () => {
  const {account, loggedIn} = useAppSelector(state => state.auth)

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>123</span>
          </h5>
          <p>
            shipping fee : <span>123</span>
          </p>
          <hr />
          <h4>
            order total :{" "}
            <span>123</span>
          </h4>
        </article>
        {loggedIn ? (
          <Link to="/checkout" className="btn">
            proceed to payment
          </Link>
        ) : (
          <button type="button" className="btn" onClick={() => {
            
          }}>
            login
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 1.5rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
