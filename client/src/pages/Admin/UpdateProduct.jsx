import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import  toast  from 'react-hot-toast';
import  axios from 'axios';
import {Button, Select} from 'antd'
import { useNavigate, useParams } from 'react-router-dom';

const {Option} = Select

const UpdateProduct = () => {
  const navigate = useNavigate()    
  const params = useParams()
  const [catagories, setCatagories] = useState([])
  const [name , setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [catagory, setCatagory] = useState('')
  const [photo, setPhoto] = useState('')
  const [id, setID] = useState('')

  //get single product
  const getSingleProduct = async() => {
    try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
        setName(data.product.name)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setShipping(data.product.shipping)
        setCatagory(data.product.catagory._id)
        setID(data.product._id)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, [])

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/catagory/get-catagory");
      if (data?.success) {
        setCatagories(data?.catagory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catagory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      photo && productData.append('photo', photo)
      productData.append('catagory', catagory)
      productData.append('shipping', shipping)
      const {data} = axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`, productData)
      if(data?.success){
        toast.error(data?.message)  
      }else{
        toast.success('Product updated successfully')
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong')
    }
  }

  //delete product
  const handleDelete = async() => {
    try {
      let answer = window.prompt('Are u sure u want to delete ?')
      if(!answer) return;
      const {data} = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`)
      toast.success('Product deleted successfully')
      navigate('/dashboard/admin/products')
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout title={'Update Product'}
      text={
        <>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <h1>Update Product</h1>
              <div className='m-1 w-75'>
                <Select variant="borderless" 
                placeholder='Select a catagory' 
                size='large' 
                showSearch 
                className='form-select mb-3' onChange={(value) => {setCatagory(value)}} value={catagory}>
                {catagories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
                </Select>
                <div className='mb-3'>
                  <label className='btn btn-outline-secondary col-md-12'>
                    {photo ? photo.name : "Upload photo"} 
                    <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                  </label>
                </div>
                <div className='mb-3'>
                  {photo ? (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive'/>
                    </div>
                  ) : (
                    <div className='text-center'>
                      <img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt='product_photo' height={'200px'} className='img img-responsive'/>
                    </div>
                  )}
                </div>
                <div className='mb-3'>
                  <input type='text' value={name} placeholder='write a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <textarea type='text' value={description} placeholder='write a description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <input type='number' value={price} placeholder='set price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <input type='number' value={quantity} placeholder='set quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className='mb-3'>
                <Select variant="borderless" 
                placeholder='Select shipping' 
                size='large'  
                className='form-select mb-3' onChange={(value) => {setShipping(value)}} value={shipping ? 'Yes' : 'No'}>
                <Option value='0'>No</Option>
                <Option value='1'>Yes</Option>
                </Select>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
      }
    />
  )
}

export default UpdateProduct