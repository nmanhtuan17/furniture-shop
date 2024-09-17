import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useAppSelector } from "../redux/store";

const ProductList = () => {
  const {products} = useAppSelector(state => state.product)

  if (products.length === 0) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  // if (grid_view === false) {
  //   return <ListView products={products} />;
  // }
  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
