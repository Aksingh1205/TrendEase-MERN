import productModel from "../models/productModel.js";
import catagoryModel from '../models/catagoryModel.js'
import fs from 'fs'
import slugify from 'slugify'
import orderModel from "../models/orderModel.js";
import { instance } from "../server.js";
import dotenv from 'dotenv';
import crypto from 'crypto'



//configure env
dotenv.config();

export const createProductController = async(req,res) => {
    try {
        const {name, slug, description, price, catagory,quantity,shipping} = req.fields
        const {photo} = req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error : 'name is required'})
            case !description:
                return res.status(500).send({error : 'description is required'})
            case !price:
                return res.status(500).send({error : 'price is required'})
            case !catagory:
                return res.status(500).send({error : 'catagory is required'})
            case !quantity:
                return res.status(500).send({error : 'quantity is required'})
            case photo && photo.size > 1000000:
                return res.status(500).send({error : 'photo is required and should be less than 1 mb'})
        }

        const products = new productModel({...req.fields, slug : slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success : true,
            message : "product created successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in creating product',
            error
        })
    }
}

//get all products
export const getProductController = async(req,res) => {
    try {
        const products = await productModel.find({}).populate('catagory').select('-photo').limit(12).sort({createdAt : -1})
        res.status(200).send({
            success : true,
            message : 'All products listed',
            countTotal : products.length,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while fetching all products',
            error
        })
    }
}

// get single product
export const getSingleProductController = async(req,res) => {
    try {
        const product = await productModel.findOne({slug : req.params.slug}).select('-photo').populate('catagory')
        res.status(200).send({
            success : true,
            message : 'Single product listed',
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while fetching single product',
            error
        })
        
    }
}

// get photo
export const productPhotoController = async(req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while fetching photo',
            error
        })
    }
}

// delete product
export const deleteProductController = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success : true,
            message : 'Product deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while deleting product'
        })
    }
}

//update product
export const updateProductController = async(req,res) => {
    try {
        const {name, slug, description, price, catagory,quantity,shipping} = req.fields
        const {photo} = req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error : 'name is required'})
            case !description:
                return res.status(500).send({error : 'description is required'})
            case !price:
                return res.status(500).send({error : 'price is required'})
            case !catagory:
                return res.status(500).send({error : 'catagory is required'})
            case !quantity:
                return res.status(500).send({error : 'quantity is required'})
            case photo && photo.size > 1000000:
                return res.status(500).send({error : 'photo is required and should be less than 1 mb'})
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug : slugify(name)}, {new : true})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success : true,
            message : "product updated successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in updating product',
            error
        })
    }
}

//filter product

export const filterController = async(req,res) => {
    try {
        const {checked, radio} = req.body;
        let args = {}
        if(checked.length > 0) args.catagory = checked;
        if(radio.length) args.price = {$gte : radio[0], $lte : radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success : true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error in filtering product',
            error
        })
    }
}

//product count
export const productCountController = async(req,res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success : true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error in product count',
            error
        })
    }
}

//products per page
export const productListController = async(req,res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({createdAt : -1})
        res.status(200).send({
            success : true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error in loading product per page',
            error
        })
    }
}

//serach product
export const searchProductController = async(req,res) => {
    try {
        const {keyword} = req.params
        const results = await productModel.find({
            $or : [
                {name : {$regex: keyword, $options : 'i'}},
                {description : {$regex: keyword, $options : 'i'}}
            ]
        }).select('-photo')
        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error in search product API',
            error
        })
    }
}

//similar products
export const relatedProductController = async(req,res) => {
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            catagory : cid,
            _id : {$ne : pid}
        }).select('-photo').limit(3).populate('catagory')
        res.status(200).send({
            success : true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error while getting similar products',
            error
        })
    }
}

// catagory wise products
export const productCatagoryController = async(req,res) => {
    try {
        const catagory = await catagoryModel.findOne({slug : req.params.slug})
        const products = await productModel.find({catagory}).populate('catagory')
        res.status(200).send({
            success : true,
            catagory,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error while getting products',
            error
        })
    }
}


//payment controller
export const paymentController = async(req,res) => {
    try {
        const order = await instance.orders.create({
            amount: req.body.amount * 100,
            currency: "INR",
            
        })
        const{cart} = req.body
        const myOrder =  new orderModel({
                products : cart ,
                buyer : req.user._id
                }).save()

        res.status(200).json({
            success : true,
            order
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error in payment gateway',
            error
        })
    }  

}

//payment verification
export const paymentVerificationController = async(req,res) =>{
    console.log(req.body);
    // const{razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    // const body = razorpay_order_id + '|' + razorpay_payment_id
    // const expectedSignature = crypto
    //     .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    //     .update(body.toString())
    //     .digest('hex')
    // console.log('sig received', razorpay_signature);
    // console.log('sig generated', expectedSignature);
    return res.redirect('http://localhost:5173/dashboard/user/orders')
    } 
// //payment gateway
// //token
// export const braintreeTokenController = async(req,res) => {
//     try {
//         gateway.clientToken.generate({}, function(err,response){
//             if(err){
//                 res.status(500).send(err)
//             }
//             else{
//                 res.send(response)
//             }
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// //payment
// export const braintreePaymentController = async(req,res) => {
//     try {
//         const {cart,nonce} = req.body;
//         let total = 0;
//         cart.map(i => {
//             total += total.price 
//         })
//         let newTransaction = gateway.transaction.sale({
//             amount : total,
//             paymentMethodNonce : nonce,
//             options : {
//                 submitForSettlement : true
//             }
//         },
//         function (error, result){
//             if(result){
//                 const order =  new orderModel({
//                     products : cart ,
//                     payment : result,
//                     buyer : req.user._id
//                 }).save()
//                 res.json({ok : true})
//             }else{
//                 res.status(500).send(error)
//             }
//         }
//     )

//     } catch (error) {
//         console.log(error);
//     }
// }