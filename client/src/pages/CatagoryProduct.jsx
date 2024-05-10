import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "../styles/CategoryProductStyles.css";

const CatagoryProduct = () => {

    const [products, setProducts] = useState([])
    const [catagory, setCatagory] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    

    useEffect(() => {
        if(params?.slug) getProductByCat()
    },[params?.slug])

    const getProductByCat = async() => {
        try {
            const {data} = await axios.get(`/api/v1/product/product-catagory/${params.slug}`)
            setProducts(data?.products)
            setCatagory(data?.catagory)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout
        text={
            <>
                <div className='container mt-3 category'>
                    <h1 className='text-center'>{catagory?.name}</h1>
                    <h1 className='text-center'>{products?.length} products found</h1>
                    <div className='row'>
                    <div className="col-md-9 offset-1">
                    <div className='d-flex flex-wrap'>
                        {products?.map(p => (
                        <div key={p._id} className="card m-2" style={{ width: '15rem' }} >
                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                            <div className="card-name-price">
                            <h5 className="card-title">{p.name}</h5>
                            <h5 className="card-title card-price"> Rs. {p.price}</h5>
                            </div>
                            <p className="card-text">{p.description.substring(0,30)}...</p>
                            <div className="card-name-price">
                            <button className="btn btn-info ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                            <button className="btn btn-secondary ms-1">Add To Cart</button>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                    </div>
                </div>
            </>
        }
    />
  )
}

export default CatagoryProduct