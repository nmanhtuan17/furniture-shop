import React, {useEffect, useMemo, useState} from "react";
import { useParams } from "react-router-dom"
import apiService from "../../../services/api.service";

import {Button, Modal, Input, InputNumber, Image, Select} from 'antd';
import { toast } from "react-toastify";
import {useAppSelector} from "../../../redux/store";
import {capitalizedStr} from "../../../utils/helpers";

export const EditProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState();
  const [photo, setPhoto] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState(1000)
  const [description, setDescription] = useState()
  const [stock_quantity, setQuantity] = useState(1)
  const [categoryName, setCategory] = useState('')
  const {category} = useAppSelector(state => state.app)

  const mappedCategory = useMemo(() => category.map(c => ({
    value: c.name,
    label: capitalizedStr(c.name)
  })), [category])

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const data = await apiService.get(`products/${id}`)
    setProduct(data)
    setPhoto(data.photo)
    setName(data.name)
    setPrice(data.price)
    setDescription(data.description)
    setQuantity(data.stock_quantity)
    setCategory(data?.category ? data.category : mappedCategory[0].value)
  }

  const updateProduct = async () => {
    const data = await apiService.post(`products/${id}`, {
      photo: photo,
      name: name,
      price: price,
      description: description,
      stock_quantity: stock_quantity,
      category: categoryName
    })
    toast.success("Success")
  }

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
  }

  return (
    <div className="container">
      <div className="fs-4 py-3">
        Chỉnh sửa sản phẩm
      </div>
      <div className='gap-y-2'>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Ảnh
          </span>
          <div className="col ps-0">
            <Image width={100} height={100} src={photo}/>
            <input className='col col-lg-4' type='file' onChange={handleFileChange}/>
          </div>
        </div>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Tên sản phẩm:
          </span>
          <Input className='col col-lg-4' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Loại sản phẩm:
          </span>
          <Select
            className='col col-lg-4 px-0'
            defaultValue={categoryName}
            onChange={(e) => {
              setCategory(e)
            }}
            options={mappedCategory}
          />
        </div>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Giá:
          </span>
          <InputNumber
            prefix={<span className={'ps-2'}>$</span>}
            onChange={(e) => setPrice(e)}
            className='col ps-0 col-lg-4'
            defaultValue={100}
            value={price}
          />
        </div>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Mô tả:
          </span>
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)}
                          className='col col-lg-4'/>
        </div>

        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Số lượng:
          </span>
          <div className="col col-lg-4 px-0 flex items-end justify-items-end">
            <Input type='number' min={1} value={stock_quantity} onChange={(e) => setQuantity(e.target.value)}
                   className=''/>
          </div>
        </div>
        <Button onClick={updateProduct} type="primary" className="px-5 mt-5">
          Lưu
        </Button>
      </div>
    </div>
  )
}
