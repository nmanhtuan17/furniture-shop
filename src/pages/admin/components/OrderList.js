import { Space, Table, Tag, Button, Image, Input } from 'antd';
const { Search } = Input;
const columns = [
  {
    title: 'Photo',
    dataIndex: 'photo',
    key: 'photo',
    render: (url) => <Image width={70} height={70} src={url} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'stock_quantity',
    key: 'stock_quantity',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button type="primary" danger >Delete</Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  }, {
    key: '17',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '8',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

export const OrderList = () => {

  return (
    <div className='mt-3'>
      <div className='my-3' style={{
        fontSize: 32
      }}>
        Quản lý đơn hàng
      </div>
      <div className='my-3'>
        <Search
          className='col col-md-3'
          placeholder="Search..."
          allowClear
          enterButton="Search"
          onSearch={() => { }}
        />
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data} />

    </div>
  )
}