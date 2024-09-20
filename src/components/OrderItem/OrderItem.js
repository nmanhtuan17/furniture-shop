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

const OrderItem = ({ _id, products, address, phone }) => {
  const {account} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();


  return (
    <div>

    </div>
  );
};

export default OrderItem;
