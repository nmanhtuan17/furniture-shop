import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import AmountButtons from "./AmountButtons";
import { FaTrash } from "react-icons/fa";
import apiService from "../services/api.service";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {Image} from "antd";
import {getCarts, getCategory} from "../redux/actions/app.action";
import {Loading} from "./index";

const CartItem = ({ _id, product: productId, quantity }) => {
  const {products} = useAppSelector(state => state.product)
  const {account} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(quantity);
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     updateQuantity()
  //   }, 2000)
  //   return () => {
  //     clearTimeout(timerId);
  //   }
  // }, [amount]);

  const product = useMemo(() => products.find(p => p._id === productId), [products, productId]);

  const increase = async () => {
    let tempAmount = amount + 1;
    if (tempAmount > product?.stock_quantity) {
      tempAmount = product?.stock_quantity;
    }
    setAmount(tempAmount);
    if(!loading) {
      setLoading(true)
      await updateQuantity(tempAmount)
      dispatch(getCarts())
    }
    setLoading(false)
  };

  const decrease = async () => {
    let tempAmount = amount - 1;
    if (tempAmount < 1) {
      tempAmount = 1;
    }
    setAmount(tempAmount);
    if(!loading) {
      setLoading(true)
      await updateQuantity(tempAmount)
      dispatch(getCarts())
    }
    setLoading(false)
  };

  const removeItem = async () => {
    try {
      await apiService.delete(`cart/${account._id}?cartId=${_id}`)
      dispatch(getCarts())
    } catch (e) {
      console.log(e)
    }
  }

  const updateQuantity = async (tempAmount) => {
    try {
      await apiService.put(`cart/${account._id}?cartId=${_id}`, {
        product: productId,
        user: account._id,
        quantity: tempAmount,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Wrapper>
      <div className="title">
        <Image src={product?.photo} width={70} height={70} alt={product?.name} />
        <div>
          <h5 className="name">{product?.name}</h5>
          <h5 className="price-small">{formatPrice(product?.price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(product?.price)}</h5>
      <AmountButtons amount={amount} increase={loading ? () => {} : increase} decrease={loading ? () => {} : decrease} />
      <h5 className="subtotal">{formatPrice(product?.price * quantity)}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={removeItem}
      >
        <FaTrash />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    height: 100%;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default CartItem;
