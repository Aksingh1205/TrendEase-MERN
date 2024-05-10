import catagoryModel from "../models/catagoryModel.js";
import slugify from 'slugify'

export const createCatagoryController = async(req,res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message : 'Name is required'})
        }

        const existingCatagory = await catagoryModel.findOne({name})
        if(existingCatagory){
            return res.status(200).send({
                success: true,
                message : 'Catagory already exists'
            })
        }

        const catagory = await new catagoryModel({name, slug: slugify(name)}).save()
        res.status(201).send({
            success : true,
            message : 'Successfully created catagory',
            catagory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in catagory',
            error
        })
    }
}

//update catagory

export const updateCatagoryController = async(req,res) => {
    try {
        const {name} = req.body
        const {id} = req.params
        const catagory = await catagoryModel.findByIdAndUpdate(id, {name, slug : slugify(name)}, {new : true})
        res.status(200).send({
            success : true,
            message : 'Catagory updated successfully',
            catagory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while updating catagory',
            error
        })
    }
}

// get all catagory
export const catagoryController = async(req,res) => {
    try {
        const catagory = await catagoryModel.find({})
        res.status(200).send({
            success: true,
            message : 'All catagories listed',
            catagory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while fetching all catagories',
            error
        })
    }
}

//single catagory

export const singleCatagoryController = async(req,res) => {
    try {
        const catagory = await catagoryModel.findOne({slug : req.params.slug})
        res.status(200).send({
            success : true,
            message : 'Single catagory listed',
            catagory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while fetching single catagory',
            error
        })
    }
}

//delete catagory
export const deleteCatagoryController = async(req,res) => {
    try {
        const {id} = req.params
        await catagoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success : true,
            message : 'Catagory deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while deleting catagory',
            error
        })
    }
}