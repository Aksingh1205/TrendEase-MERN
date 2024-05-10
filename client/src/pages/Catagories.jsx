import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import useCatagory from '../hooks/useCatagory'
import Layout from '../components/Layout/Layout'

const Catagories = () => {
  const catagories = useCatagory()
  return (
    <Layout title={'All catagories'}
    text={
      <>
        <div className='container' style={{ marginTop: "100px" }}>
          <div className='row container'>
            {catagories.map(c => (
              <div className='col-md-4 mt-5 mb-3 gx-3 gy-3' key={c._id}>
              <div className="card">
                <Link to={`/catagory/${c.slug}`} className='btn cat-btn'>
                  {c.name}
                </Link>
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

export default Catagories