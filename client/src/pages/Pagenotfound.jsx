import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout title={'page not found'}
      text = {
    <div className='pnf'>
      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-heading'>Oops ! Page not Found</h2>
      <Link to= '/' className='pnf-btn'>Go Back</Link>
    </div>
    }

    />
  )
}

export default Pagenotfound