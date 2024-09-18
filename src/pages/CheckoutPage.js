import React, {useState} from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import {
  FaUser,
  FaAddressCard,
  FaEnvelope,
  FaCreditCard,
  FaCity,
} from "react-icons/fa";

const CheckoutPage = () => {
  const [phone, setPhone] = useState();


  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page-100 section section-center">
        <form
          className="container"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Your Order Placed Successfully!");
          }}
        >
          <div className="info address">
            <h3>Billing Address</h3>
            <label className="label">
              <FaUser/>
              <span> Họ tên:</span>
            </label>
            <input type="text" name="first-name" placeholder="John Doe"/>
            <label className="label">
              <FaEnvelope/> Số điện thoại:
            </label>
            <input type="number" name="email" placeholder="012345678"/>
            <label className="label">
              <FaAddressCard/> Địa chỉ:
            </label>
            <input
              type="text"
              name="address"
              placeholder="Nghiem Xuan Yem, Ha Noi"
            />
            <input
              className="btn place-order"
              type="submit"
              value="Thanh toán"
            />
          </div>
        </form>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: row;
  }

  /* Responsive layout - makes a one column layout instead of a two-column layout */
  @media (max-width: 800px) {
    .container {
      flex-direction: column;
    }
  }
  .info {
    flex: 50%;
  }

  label {
    margin-bottom: 10px;
    display: block;
  }
  input[type="text"] {
    width: 85%;
    margin-bottom: 20px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display: block;
  }
  .label {
    font-size: 18px;
  }
`;
export default CheckoutPage;
