import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/CartStyles.css";


const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    //total price
    const totalPrice = () => {
        try {
          let total = 0
          cart?.map(item => {
            total = total + item.price
          })  
          return total
        } catch (error) {
            console.log(error);
        }
    }

    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error);
        }
    }

    //payment
    const handlePayment  = async(e) => {
        e.preventDefault()
        setLoading(true);
        let price = totalPrice()
        const {data : {key}} = await axios.get('/api/getkey')
        const {data : {order}} = await axios.post("/api/v1/product/payment",{
            amount : price,
            cart
        })
        const options = {
            key, 
            amount: order.amount, 
            currency: "INR",
            name: "Trendease", 
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, 
            callback_url: "/api/v1/product/paymentverification",
            prefill: { 
                name: auth.user.name, 
                email: auth.user.email,
                contact: auth.user.phone 
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("Payment Completed Successfully ");

    }

  return (
    <Layout title={'Cart'}
        text={
            <>
                <div className='cart-page'>
                    <div className='row'>
                        <div className='col-md-12'>
                        <h1 className="text-center bg-light p-2 mb-1">
                        {!auth?.user
                            ? "Hello Guest"
                            : `Hello  ${auth?.token && auth?.user?.name}`}
                        <p className="text-center">
                            {cart?.length
                            ? `You Have ${cart.length} items in your cart ${
                                auth?.token ? "" : "please login to checkout !"
                                }`
                            : " Your Cart Is Empty"}
                        </p>
                        </h1>
                        </div>
                    </div>
                    <div className="container ">
                    <div className='row'>
                        <div className='col-md-7  p-0 m-0'>
                            {
                                cart?.map(p => (
                                    <div className='row card flex-row'>
                                        <div className='col-md-4'>
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width="100%"
                                            height={"130px"}/>
                                        </div>
                                        <div className="col-md-4">
                                            <p>{p.name}</p>
                                            <p>{p.description.substring(0, 30)}</p>
                                            <p>Price : {p.price}</p>
                                        </div>
                                        <div className="col-md-4 cart-remove-btn">
                                            <button
                                            className="btn btn-danger"
                                            onClick={() => removeCartItem(p._id)}
                                            >
                                            Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='col-md-5 cart-summary'>
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr/>
                            <h4>Total : Rs {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className='mb-3'>
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className='mb-3'>
                                    {auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>
                                            Update Address
                                        </button>
                                    ) : (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/login', {state : '/cart'})}>
                                            Please Login to Checkout
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className='mt-2'>
                                <button className = "btn btn-primary" onClick={handlePayment} disabled={loading || !auth?.user?.address}>{loading ? "Processing ...." : "Make Payment"}</button>
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

export default CartPage