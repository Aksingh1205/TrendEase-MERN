import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import {Button, Checkbox, Radio} from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
import "../styles/Homepage.css";
import { AiOutlineReload } from "react-icons/ai";

const HomePage = () => {
  
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [products, setProducts]  = useState([])
  const [catagories, setCatagories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  //get total count
  const getTotal = async() =>{
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  }
  //get all products
  const getallProducts = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/catagory/get-catagory");
      if (data?.success) {
        setCatagories(data?.catagory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  useEffect(() => {
    if(page == 1) return
    loadMore()
  }, [page])
  const loadMore = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c => c!==id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if(!checked.length || !radio.length) getallProducts();
    
  }, [checked.length, radio.length])

  useEffect(() => {
    if(checked.length || radio.length) filterProduct();
  }, [checked,radio])

  useEffect(() => {
    getAllCategory();
    getTotal()
  }, [])

  // get filtered products
  const filterProduct = async() => {
    try {
      const {data} = await axios.post("http://localhost:8080/api/v1/product/filter-product", {
        checked,radio
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout title={'Home'}
     text = {
      <>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow : 'hidden' }}>
      <div className='container-fluid row mt-3 home-page'>
        <div className='col-md-3 filters'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
          {catagories?.map(c => (
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
              {c.name}
            </Checkbox>
          ))}
          </div>
          {/* price filter */}
          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className='d-flex flex-column ms-5'>
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column '>
           <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className='col-md-9 overflow-y-auto'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map(p => (
              <div key={p._id} className="card m-2" style={{ width: '15rem' }} >
                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text"> Rs. {p.price}</p>
                  </div>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <div className="card-name-price">
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-dark ms-1" 
                  onClick={() => {
                    setCart([...cart,p])
                    localStorage.setItem('cart', JSON.stringify([...cart, p]))
                    toast.success('Item added to cart')
                    }}>
                    Add To Cart</button>
                </div>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn loadmore' 
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
      </>
     } 
    />
  )
}

export default HomePage