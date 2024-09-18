import React, { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import styled from "styled-components";
import { useAppSelector } from "../redux/store";
import {useFilterContext} from "../pages/ProductsPage";
const Sort = () => {
  const {products} = useFilterContext()
  const [gridView, setGridview] = useState(true);
  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          onClick={() => {setGridview(true)}}
          className={`${gridView ? "active" : null}`}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          onClick={() => {setGridview(false)}}
          className={`${!gridView ? "active" : null}`}
        >
          <BsList />
        </button>
      </div>
      <p>{products.length} products found</p>
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background-color: var(--clr-white);
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
