import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useAppSelector } from "../redux/store";
import {useFilterContext} from "../pages/ProductsPage";

const ProductList = () => {
  const {products} = useFilterContext();

  if (products?.length === 0) {
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
