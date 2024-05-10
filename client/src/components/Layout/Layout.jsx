import React from 'react'
import Header from './Header'
import Footer from './Footer';
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({text, title, description, keywords, author}) => {
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
        </Helmet>
        <Header />
        <main style={{minHeight: '70vh'}}>
        <Toaster />
        {text}
        </main>
        <Footer />
    </>
  )
}

Layout.defaultProps = {
  title : 'Ecommerce App - shop now',
  description : 'mern stack project',
  keywords : 'mern, react, node, mongodb',
  author : 'Arpit'
}

export default Layout