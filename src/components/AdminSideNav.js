import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { AdminProduct } from '../pages/admin/components/ProductList';
import { OrderList } from '../pages/admin/components/OrderList';
import { Button, Modal, Input, InputNumber } from 'antd';
import apiService from '../services/api.service';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getProducts } from '../redux/actions/app.action';

export const AdminSideNav = () => {
  const dispatch = useAppDispatch()
  const {products} = useAppSelector(state => state.product)
  const [verticalActive, setVerticalActive] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [photo, setPhoto] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState(1000)
  const [description, setDescription] = useState()
  const [stock_quantity, setQuantity] = useState(1)

  console.log('====================================');
  console.log(products);
  console.log('====================================');

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  const handleOk = async () => {
    try {
      const res = await apiService.post('products', {
        photo,
        name,
        price,
        description,
        stock_quantity
      })
      setPhoto(undefined)
      setName(undefined)
      setDescription(undefined)
      setPrice(1000)
      setQuantity(1)
      setIsModalOpen(false);
      dispatch(getProducts())
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  const handleCancel = () => {
    setPhoto('')
    setName(undefined)
    setDescription(undefined)
    setPhoto(undefined)
    setQuantity(undefined)
    setIsModalOpen(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      const image = await apiService.uploadImage(formData)
      if (image) {
        setPhoto(image.url)
      }
    }
  };

  return (
    <div>
      <MDBRow>
        <MDBCol size='2' className=' '>
          <MDBTabs className='flex-column text-center bg-slate-500'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Sản phẩm
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                Đơn hàng
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='10'>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === 'tab1'}>
              <AdminProduct setIsModalOpen={() => setIsModalOpen(true)} />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab2'}>
              <OrderList />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>

      <Modal title="Thêm sản phẩm"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className='gap-y-2'>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Ảnh
            </span>
            <input className='col' type='file' onChange={handleFileChange} />
          </div>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Tên sản phẩm:
            </span>
            <Input className='col' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Giá:
            </span>
            <InputNumber
              onChange={(e) => setPrice(e)}
              className='col'
              defaultValue={1000}
              value={price}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            />
          </div>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Mô tả:
            </span>
            <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} className='col' />
          </div>

          <div className='row my-1'>
            <span className='col col-md-3'>
              Số lượng:
            </span>
            <InputNumber value={stock_quantity} onChange={(e) => setQuantity(e)} className='col' />
          </div>
        </div>
      </Modal>
    </div>
  );
}