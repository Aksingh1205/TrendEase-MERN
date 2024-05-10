import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Authprovider } from './context/auth.jsx'
import { Searchprovider } from './context/search.jsx'
import { CartProvider } from './context/cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Authprovider>
  <Searchprovider>
  <CartProvider>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </CartProvider>
  </Searchprovider>
  </Authprovider>
)
