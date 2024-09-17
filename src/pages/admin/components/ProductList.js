import { useMemo, useState } from 'react';
import { Space, Table, Tag, Button, Image, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/api.service';
import { getProducts } from '../../../redux/actions/app.action';
const { Search } = Input;

export const AdminProduct = ({ setIsModalOpen }) => {
  const { products } = useAppSelector(state => state.product)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [id, setId] = useState()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())), [query])

  console.log('====================================');
  console.log(filteredProducts);
  console.log('====================================');

  const handleDelete = async () => {
    const data = await apiService.delete(`products/${id}`)
    dispatch(getProducts())
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    await handleDelete()
    setTimeout(() => {
      setConfirmLoading(false);
      setId(undefined)
    }, 2000);
    
  };

  const handleCancel = () => {
    setId(undefined)
  };

  const columns = useMemo(() => (
    [
      {
        title: 'Ảnh',
        dataIndex: 'photo',
        key: 'photo',
        width: 100,
        render: (url) => <Image width={70} height={70} src={url} />,
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: 250,
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        width: 150
      },
      {
        title: 'Số lượng',
        dataIndex: 'stock_quantity',
        key: 'stock_quantity',
        width: 100
      },
      {
        title: 'Giới thiệu',
        key: 'description',
        dataIndex: 'description',
        width: 700
      },
      {
        title: '',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => {
              navigate(`/admin/product/${record._id}`)
            }} type="primary">Edit</Button>
            <Button onClick={() => setId(record._id)} type="primary" danger >Delete</Button>
          </Space>
        ),
      },
    ]
  ), [])

  return (
    <div className='mt-3'>
      <div className='my-3' style={{
        fontSize: 32
      }}>
        Quản lý sản phẩm
      </div>
      <div className='flex row items-center my-3'>
        <Search
          className='col col-md-3'
          placeholder="Search..."
          allowClear
          enterButton="Search"
          onSearch={(value, _) => {
            setQuery(value)
          }}
        />
        <Button onClick={setIsModalOpen} className='col col-md-1' type="primary">Add product</Button>
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={filteredProducts}
      />
      {!!id && <Modal
        title="Xóa sản phẩm"
        open={true}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        Bạn chắc chắn muốn xóa sản phẩm!!
      </Modal>}
    </div>
  )
}