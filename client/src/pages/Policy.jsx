import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}
      text = {
       <div className="policy-container">
        <div className="row contactus ">
          <div className="col-md-7 d-flex align-items-center justify-content-center">
            <img
              src="/images/contactus.jpeg"
              alt="policy"
              style={{ width: "80%", height: "auto" }}
            />
          </div>
          <div className="col-md-4">
              <p>add privacy policy</p>
              <p>add privacy policy</p>
              <p>add privacy policy</p>
              <p>add privacy policy</p>
              <p>add privacy policy</p>
              <p>add privacy policy</p>
              <p>add privacy policy</p>
          </div>    
          </div>
        </div>
    }
    />
  )
}

export default Policy