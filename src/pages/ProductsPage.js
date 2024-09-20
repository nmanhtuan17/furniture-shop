import React, {useState, useMemo, useContext, createContext} from "react";
import styled from "styled-components";
import { Filters, ProductList, Sort, PageHero } from "../components";
import { useAppSelector } from "../redux/store";
import { SortPrice } from "../types";

const FilterContext =  createContext({})
export const useFilterContext = () => useContext(FilterContext)

const ProductsPage = () => {
  const [filter, setFilter] = useState({
    query: '',
    category: '',
    price: 10000
  })
  const {products} = useAppSelector(state => state.product)

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(filter?.query?.toLowerCase() || '');
    const matchesPrice = product.price >= 0 && product.price <= filter.price;
    const matchesCate = filter.category.length > 0 ? product.category.toLowerCase() === filter.category.toLowerCase() : true
    return matchesName && matchesPrice && matchesCate;
  }), [filter])

  return (
    <main>
      <FilterContext.Provider value={{
        filter,
        setFilter,
        products: filteredProducts
      }}>
        <PageHero title="Products" />
        <Wrapper className="page">
          <div className="section-center products">
            <Filters />
            <div>
              <ProductList />
            </div>
          </div>
        </Wrapper>
      </FilterContext.Provider>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
