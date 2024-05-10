import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiSupport, BiPhoneCall } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout 
    title={"Contact us"}
    text = {
      <div className="contact-container">
        <div className="row contactus ">
          <div className="col-md-7 d-flex align-items-center justify-content-center">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div>
              <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
              <p className="text-justify mt-2">
                Any query and info about product please feel free to call anytime, we are 24X7 available.
              </p>
              <p className="mt-3">
                <BiMailSend /> : www.help@ecommerceapp.com
              </p>
              <p className="mt-3">
                <BiPhoneCall /> : 012-3456789
              </p>
              <p className="mt-3">
                <BiSupport /> : 1800-0000-0000 (toll free)
              </p>
            </div>
          </div>
        </div>
      </div>
    }

    />
  )
}

export default Contact