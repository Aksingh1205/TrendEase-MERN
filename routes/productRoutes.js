import express from 'express'
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { 
    createProductController, 
    deleteProductController, 
    filterController, 
    getProductController, 
    getSingleProductController, 
    paymentController, 
    paymentVerificationController, 
    productCatagoryController, 
    productCountController, 
    productListController, 
    productPhotoController, 
    relatedProductController, 
    searchProductController, 
    updateProductController } 
    from '../controller/productController.js';

import formidable from 'express-formidable'

const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin,formidable(), createProductController)

//get products
router.get('/get-product', getProductController)

// get single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin,formidable(), updateProductController)

//filter product
router.post('/filter-product', filterController)

//product-count
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController)

//search product controller
router.get('/search/:keyword', searchProductController)

//similar product controller
router.get('/related-product/:pid/:cid', relatedProductController)

//catagory wise products
router.get('/product-catagory/:slug', productCatagoryController)

//payment
router.post('/payment',requireSignIn, paymentController)

//payment verification
router.post('/paymentverification', paymentVerificationController)


export default router