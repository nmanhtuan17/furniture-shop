import { Space, Table, Tag, Button, Image, Input, Select, List } from 'antd';
import { useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../redux/store';
import apiService from '../services/api.service';
import { formatPrice } from '../utils/helpers';
import { PageHero } from '../components';
import { getOrders } from '../redux/actions/app.action';

const { Search } = Input;

const STATUS = [{ value: 'pending', label: 'Pending' }, { value: 'shipping', label: 'Shipping' }, {
  value: 'delivered',
  label: 'Delivered'
}];


const RenderProducts = ({ products }) => {
  return (
    <div>
      <Image src={products[0].product.photo} width={70} height={70} />
      <div></div>
    </div>
  )
}
const OrderPage = () => {
  const dispatch = useAppDispatch()
  const { products } = useAppSelector(state => state.product)
  const {orders} = useAppSelector(state => state.order)

  const mappedData = useMemo(() => orders.map(o => ({
    ...o,
    key: o._id,
    products: o.products.map(p => ({
      ...p,
      product: products.find(prod => prod._id === p.product)
    }))
  })), [orders, products])

  const columns = useMemo(() => ([
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (record) => {
        return <RenderProducts products={record} />
      },
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <span>
          {`0${phone}`}
        </span>
      )
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      dataIndex: 'address'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (data) => (
        <span>{data.status}</span>
      ),
    },
  ]), [mappedData])

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  return (
    <div>
      <PageHero title="Orders" />
      <div className='container'>
        <Table
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <>
                  <List
                    className='ps-5'
                    itemLayout="horizontal"
                    dataSource={record.products}
                    footer={
                      <div className='fs-4'>
                        {`Total: ${formatPrice(record.total)}`}
                      </div>
                    }
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Image width={70} height={70} src={item.product.photo} />}
                          title={<a>{item.product.name}</a>}
                          description={`${formatPrice(item.product.price)} x ${item.quantity}`}
                        />
                      </List.Item>
                    )}
                  />
                </>
              )
            },
          }}
          dataSource={mappedData} />
      </div>
    </div>
  )
}

export default OrderPage
