import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiService from "../../../services/api.service";

import { Button, Modal, Input, InputNumber, Image } from 'antd';
import { toast } from "react-toastify";

export const EditProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState();
  const [photo, setPhoto] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState(1000)
  const [description, setDescription] = useState()
  const [stock_quantity, setQuantity] = useState(1)

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const data = await apiService.get(`products/${id}`)
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    setProduct(data)
    setPhoto(data.photo)
    setName(data.name)
    setPrice(data.price)
    setDescription(data.description)
    setQuantity(data.stock_quantity)
  }

  const updateProduct = async () => {
    const data = await apiService.post(`products/${id}`, {
      photo,
      name,
      price,
      description,
      stock_quantity
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
            <Image width={100} height={100} src={photo} />
            <input className='col col-lg-4' type='file' onChange={handleFileChange} />
          </div>
        </div>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Tên sản phẩm:
          </span>
          <Input className='col col-lg-4' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Giá:
          </span>
          <InputNumber

            onChange={(e) => setPrice(e)}
            className='col ps-0 col-lg-4'
            defaultValue={1000}
            value={price}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
          />
        </div>
        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Mô tả:
          </span>
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} className='col col-lg-4' />
        </div>

        <div className='row my-1'>
          <span className='col col-md-3 col-lg-2'>
            Số lượng:
          </span>
          <div className="col col-lg-4 px-0 flex items-end justify-items-end">
            <Input type='number' min={1} value={stock_quantity} onChange={(e) => setQuantity(e.target.value)} className='' />
          </div>
        </div>
        <Button onClick={updateProduct} type="primary" className="px-5 mt-5">
          Lưu
        </Button>
      </div>
    </div>
  )
}