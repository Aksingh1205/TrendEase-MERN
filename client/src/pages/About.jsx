import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}
      text = {
      <div className="about-container">
        <div className="row contactus ">
          <div className="col-md-7 d-flex align-items-center justify-content-center ">
            <img
              src="/images/about.jpeg"
              alt="about"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div>
            <p className="text-justify mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia felis vitae eros efficitur tristique. Aliquam erat volutpat. Donec dapibus purus quis ultricies congue. Integer lobortis quam vitae mi sagittis tincidunt. Nulla auctor nibh eget libero feugiat suscipit.
            </p>
            <p className="text-justify mt-2">
              Fusce eleifend placerat justo, ac varius tortor aliquam ac. Maecenas consectetur lectus eu neque tincidunt, id convallis odio pretium. Integer finibus quam at quam placerat, a commodo ante molestie. Vivamus vel metus urna.
            </p>
            <p className="text-justify mt-2">
              Phasellus nec enim vestibulum, convallis metus sed, molestie lacus. Etiam nec velit sed lacus maximus elementum. Mauris nec faucibus dolor. Morbi placerat vitae risus nec tincidunt. Mauris suscipit tellus in tortor gravida, ac cursus libero feugiat.
            </p>
            </div>
          </div>
        </div>
      </div>
    } 
        
    />
  )
}

export default About