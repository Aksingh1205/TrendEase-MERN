import express from 'express'
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { catagoryController, createCatagoryController, deleteCatagoryController, singleCatagoryController, updateCatagoryController } from '../controller/catagoryController.js';

const router = express.Router()

//routes
//create catagory
router.post('/create-catagory', requireSignIn, isAdmin, createCatagoryController)

//update catagory
router.put('/update-catagory/:id', requireSignIn, isAdmin, updateCatagoryController)

//get all catagories
router.get('/get-catagory', catagoryController)

//single catagory
router.get('/single-catagory/:slug', singleCatagoryController)

//delete catagory
router.delete('/delete-catagory/:id', requireSignIn, isAdmin, deleteCatagoryController)

export default router