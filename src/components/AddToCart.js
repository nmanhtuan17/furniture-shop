import React, { useState } from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import AmountButtons from "./AmountButtons";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {addToCart} from "../redux/actions/app.action";

const AddToCart = ({ product }) => {
  const { _id, stock_quantity } = product;
  const [amount, setAmount] = useState(1);
  const dispatch = useAppDispatch();
  const {account, loggedIn} = useAppSelector(state => state.auth)
  const navigate = useNavigate();

  const increase = () => {
    setAmount((olaAmount) => {
      let tempAmount = olaAmount + 1;
      if (tempAmount > stock_quantity) {
        tempAmount = stock_quantity;
      }
      return tempAmount;
    });
  };

  const decrease = () => {
    setAmount((olaAmount) => {
      let tempAmount = olaAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  const handleAddToCart = async () => {
    if(!loggedIn) {
      navigate('auth/login')
    } else {
      dispatch(addToCart({
        product: _id,
        user: account._id,
        quantity: amount,
      }))
    }
  }

  return (
    <Wrapper>
      <div className="btn-contaioner">
        <AmountButtons
          amount={amount}
          decrease={decrease}
          increase={increase}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={handleAddToCart}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
