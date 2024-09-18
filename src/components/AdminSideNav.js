import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import React, {useMemo, useState} from 'react';
import { AdminProduct } from '../pages/admin/components/ProductList';
import { OrderList } from '../pages/admin/components/OrderList';
import {Button, Modal, Input, InputNumber, Select} from 'antd';
import apiService from '../services/api.service';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {getCategory, getProducts} from '../redux/actions/app.action';
import {toast} from "react-toastify";
import {capitalizedStr, formatPrice} from "../utils/helpers";

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
  const [category, setCategory] = useState('')
  const [addCategory, setAddCategory] = useState(false)

  const {category: allCategories} = useAppSelector(state => state.app)

  const mappedCategory = useMemo(() => allCategories.map(c => ({
    value: c.name,
    label: capitalizedStr(c.name)
  })), [allCategories])


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
        stock_quantity,
        category
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
    setPrice(1000)
    setQuantity(1)
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

  const handleAddCategory = async () => {
    if(category.length > 0) {
      try {
        await apiService.post('category', {
          name: category
        })
        dispatch(getCategory())
        setAddCategory(false)
        setCategory('')
      } catch (e) {
        console.log(e)
      }
    } else {
      toast.error('category name is required')
    }
  }

  return (
    <div>
      <MDBRow>
        <MDBCol size='2' className='bg-gray-400'>
          <MDBTabs className='flex-column '>
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
              <AdminProduct setIsModalOpen={() => setIsModalOpen(true)} setAddCategory={() => setAddCategory(true)} />
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
            <input className='col ps-0' type='file' onChange={handleFileChange}/>
          </div>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Tên sản phẩm:
            </span>
            <Input className='col' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Loại sản phẩm:
            </span>
            <Select
              className='col col-lg-4 px-0'
              defaultValue={mappedCategory[0].value}
              onChange={(e) => {
                setCategory(e)
              }}
              value={category}
              options={mappedCategory}
            />
          </div>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Giá:
            </span>
            <InputNumber
              prefix={<span className={'ps-2'}>$</span>}
              onChange={(e) => setPrice(e)}
              className='col ps-0'
              defaultValue={100}
              value={price}
            />
          </div>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Mô tả:
            </span>
            <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} className='col'/>
          </div>

          <div className='row my-1'>
            <span className='col col-md-3'>
              Số lượng:
            </span>
            <Input type='number' min={1} value={stock_quantity} onChange={(e) => setQuantity(e.target.value)}
                   className='col'/>
          </div>
        </div>
      </Modal>

      <Modal title="Thêm loại sản phẩm"
             centered
             open={addCategory}
             onOk={handleAddCategory}
             onCancel={() => {
               setAddCategory(false);
               setCategory('')
             }}>
        <div className='gap-y-2'>
          <div className='row my-1'>
            <span className='col col-md-3'>
              Tên:
            </span>
            <Input className='col' value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
