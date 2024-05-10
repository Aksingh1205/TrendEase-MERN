import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [relatedproduct, setRelatedproduct] = useState([])

  useEffect(() => {
    if(params?.slug) getProduct()
  },[params?.slug])

  const getProduct = async() => {
    try {
      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getSimilarProduct(data?.product._id, data?.product.catagory._id)
    } catch (error) {
      console.log(error);
    }
  }

  //get similar product
  const getSimilarProduct = async(pid,cid) =>{
    try {
      const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedproduct(data?.products)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout title={'Product Details'}
        text={
            <>
                <div className='row container product-details'>
                  <div className='col-md-6'>
                  <img src={`/api/v1/product/product-photo/${product._id}`} 
                  className="card-img-top" alt={product.name} height='300px' width={'350px'}/>
                  </div>
                  <div className='col-md-6 product-details-info'>
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : Rs {product.price}</h6>
                    <h6>Catagory : {product?.catagory?.name}</h6>
                    <button className="btn btn-secondary ms-1">Add To Cart</button>
                  </div>
                </div>
                <hr/>
                <div className='row container similar-products'>
                  <h6>Similar products</h6>
                  {relatedproduct.length < 1 && <p className='text-center'>No similar products found</p>}
                  <div className='d-flex flex-wrap'>
                  {relatedproduct?.map(p => (
                  <div key={p._id} className="card m-2" style={{ width: '15rem' }} >
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                  <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-text"> Rs. {p.price}</h5>
                  </div>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <div className="card-name-price">
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add To Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
                </div>
            </> 

        }
    />
  )
}

export default ProductDetails