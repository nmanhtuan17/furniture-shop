import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {PageHero} from "../components";
import {
  FaUser,
  FaAddressCard,
  FaEnvelope,
  FaCreditCard,
  FaCity,
} from "react-icons/fa";
import {Input, InputNumber, Button, Form} from "antd";
import CartTotals from "../components/CartTotals";
import {useAppDispatch, useAppSelector} from "../redux/store";
import apiService from "../services/api.service";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useMapData} from "../hooks/useMapData";
import {SHIPPING_FEE} from "../types";
import { getCarts } from "../redux/actions/app.action";

const CheckoutPage = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState('');
  const {form} = Form.useForm();
  const dispatch = useAppDispatch();
  const {account} = useAppSelector(state => state.auth);
  const {carts} = useAppSelector(state => state.cart)
  const [error, setError] = useState({})
  const {mappedData} = useMapData(carts)
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(SHIPPING_FEE);
  const navigate = useNavigate()

  useEffect(() => {
    calSubTotal()
  }, [mappedData]);

  const calSubTotal = () => {
    let total = 0
    mappedData.forEach(item => {
      total += item.quantity * item.product.price
    })
    setSubTotal(total)
  }


  const handleCheckout = async () => {
    console.log(carts)
    if (username.length < 1) {
      setError({
        ...error,
        username: true
      })
    } else if (!phone) {
      setError({
        ...error,
        phone: true
      })
    } else if (address.length < 1) {
      setError({
        ...error,
        address: true
      })
    } else {
      try {
        await apiService.post(`order/${account._id}`, {
          products: [...carts],
          username,
          phone,
          address,
          total: subTotal + shippingFee
        })
        dispatch(getCarts())
        navigate('/order')
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <main>
      <PageHero title="checkout"/>
      <div className={'container mb-5'}>
        <h3 className={'my-3'}>Thông tin cá nhân</h3>
        <div className={'row'}>
          <Form
            className={'col col-md-6'}
            layout={'vertical'}
            form={form}
            initialValues={{
              // layout: formLayout,
            }}
            // onValuesChange={onFormLayoutChange}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item rules={[
              {
                required: true
              },
            ]} label="Họ tên: ">
              <Input size="large"
                     status={error?.username && "error"}
                     onChange={(e) => {
                       setUsername(e.target.value)
                       setError({
                         ...error,
                         username: false
                       })
                     }}
                     placeholder="John Doe"/>
            </Form.Item>
            <Form.Item label="Số điện thoại: ">
              <Input size="large" type={'number'} placeholder="012345678"
                     status={error?.phone && "error"}
                     onChange={(e) => {
                       setPhone(e.target.value)
                       setError({
                         ...error,
                         phone: false
                       })
                     }}
              />
            </Form.Item>
            <Form.Item label="Địa chỉ: ">
              <Input.TextArea
                status={error?.address && "error"}
                onChange={(e) => {
                  setAddress(e.target.value)
                  setError({
                    ...error,
                    address: false
                  })
                }}
                placeholder="Nghiem Xuan Yem, Ha Noi"/>
            </Form.Item>
          </Form>
          <div
            className={'col col-md-6'}>
            <CartTotals onClick={handleCheckout}/>
          </div>
        </div>
      </div>
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

  input[type="number"] {
    width: 85%;
    padding: 12px;
    //border: 1px solid #ccc;
    border-radius: 3px;
    display: block;
  }

  .label {
    font-size: 18px;
  }
`;
export default CheckoutPage;
