import { Space, Table, Tag, Button, Image, Input, Select, List } from 'antd';
import apiService from "../../../services/api.service";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { formatPrice } from '../../../utils/helpers';
import { toast } from 'react-toastify';

const { Search } = Input;

const STATUS = [{ value: 'pending', label: 'Pending' }, { value: 'shipping', label: 'Shipping' }, {
  value: 'delivered',
  label: 'Delivered'
}];


const RenderProducts = ({ products }) => {
  return (
    <div>
      <Image src={products[0].product.photo} width={70} height={70} />
    </div>
  )
}


export const OrderList = () => {
  const dispatch = useAppDispatch()
  const [orders, setOrders] = useState([]);
  const { products } = useAppSelector(state => state.product)

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
      title: 'Khách hàng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Sdt',
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
        <Space size="middle">
          <Select
            status={data.status !== 'delivered' && 'warning'}
            defaultValue={data.status}
            style={{ width: 120 }}
            onChange={(value) => handleUpdateStatus(data, value)}
            options={STATUS}
          />
        </Space>
      ),
    },
  ]), [mappedData])

  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async () => {
    try {
      const res = await apiService.get('order')
      setOrders(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleUpdateStatus = async (data, status) => {
    try {
      await apiService.put(`order?orderId=${data._id}`, {
        status
      })
      dispatch(getOrders())
    } catch (error) {
      toast.error('Update failed!')
    }
  }

  return (
    <div className='mt-3'>
      <div className='my-3' style={{
        fontSize: 32
      }}>
        Quản lý đơn hàng
      </div>
      <Table
        pagination={false}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log(record)
            }
          };
        }}
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
                        description={`x${item.quantity}`}
                      />
                    </List.Item>
                  )}
                />
              </>
            )
          },
          // rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={mappedData} />
    </div>
  )
}
