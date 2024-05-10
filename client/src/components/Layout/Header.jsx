import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCatagory from '../../hooks/useCatagory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth()
  const [cart] = useCart()
  const catagories = useCatagory()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user : null,
      token: ''
    })
    localStorage.removeItem('auth')
    toast.success('Logout successfully')
  }

  return (
    <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">
            <FaShoppingBag className='icon' /> TrendEase
          </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput/>
            <li className="nav-item">
              <NavLink to= '/' className="nav-link" >Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to={'/catagories'} data-bs-toggle="dropdown">
                Catagories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={'/catagories'}>All Catagories</Link></li>
                {catagories?.map((c) => (
                    <li><Link className="dropdown-item" to={`/catagory/${c.slug}`}>{c.name}</Link></li>
                ))}
              </ul>
            </li>

            {
              !auth.user ? (<>
            <li className="nav-item">
              <NavLink to= '/register' className="nav-link">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to= '/login' className="nav-link">Login</NavLink>
            </li>
              </>) : (<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink to = {`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">Dashboard</NavLink></li>
                      <li><NavLink onClick={handleLogout} to= '/login' className="dropdown-item">Logout</NavLink></li>   
                    </ul>
                  </li>
              </>)
            }
            <li className="nav-item">
            <Badge count={cart?.length} showZero>
              <NavLink to= '/cart' className="nav-link">Cart</NavLink> 
            </Badge>
            </li>
            
          </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header