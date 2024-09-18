import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {formatPrice} from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import apiService from "../services/api.service";
import {Image} from "antd";

const SingleProductPage = () => {
  const {id} = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProduct()
  }, [id]);

  const getProduct = async () => {
    try {
      const data = await apiService.get(`products/${id}`)
      setProduct(data)
    } catch (e) {
      console.log(e)
    }
  }
  if (!product) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <PageHero title={product?.name} product/>
      <div className="section section-center page">
        <Link to="/" className="btn">
          Back to home
        </Link>
        <div className="product-center">
          <Image src={product.photo}/>
          <section className="content">
            <h2>{product?.name}</h2>
            {/*<Stars stars={stars} reviews={reviews}/>*/}
            <h5 className="price">{formatPrice(product?.price)}</h5>
            <p className="desc">{product?.description}</p>
            <p className="info">
              <span>Avaliable : </span>
              {product?.stock_quantity > 0 ? "in stock" : "out of stock"}
            </p>
            <p className="info">
              <span>Category : </span>
              {product?.category}
            </p>
            <hr/>
            {product?.stock_quantity > 0 && <AddToCart product={product}/>}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }

  .price {
    color: var(--clr-primary-5);
  }

  .desc {
    line-height: 2;
    max-width: 45em;
  }

  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;

    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
