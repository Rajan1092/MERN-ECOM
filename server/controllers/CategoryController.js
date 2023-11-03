import CategorySchema from "../models/CategorySchema.js";

export const CategoryController = async(req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({error:"Name is required"})
    }
    try {
        const categoryExists = await CategorySchema.findOne({name})
        if(categoryExists){
            return res.status(400).json({
                success:false,
                message:"Category already exists"})
        }
        const category = new CategorySchema({name})
        await category.save()
        res.status(201).json({
            success:true,
            category,
            message:"Category created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error,
            message:"Something went wrong"
        })
    }
}

export const updateCategoryController =async(req,res)=>{
    const {name} = req.body
    try {
        const category = await CategorySchema.findByIdAndUpdate(req.params.id,{name},{new:true})
       if(category){
        res.status(201).json({
            success:true,
            category,
            message:"Category Updated Successfully"
        })
       }
       else{
        res.status(404).json({
            success:false,
            message:"Category Not Found"
        })
       }
    } catch (error) {
        res.status(500).json({
            success:false,
            error,
            message:"Something went wrong"
        })
    }
}

export const getcategorycontroller = async(req,res)=>{
    try {
        const category = await CategorySchema.find()
        res.status(200).json({
            success:true,
            category,
            message:"Category fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error,
            message:"Something went wrong"
        })
    }
}

export const getspecificcategorycontroller = async(req,res)=>{
    try {
        const category = await CategorySchema.findById(req.params.id)
        res.status(200).json({
            success:true,
            category,
            message:"Category fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error,
            message:"Something went wrong"
        })
    }
}

export const deletecategorycontroller = async(req,res)=>{
    try {
        const category = await CategorySchema.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            category,
            message:"Category Deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error,
            message:"Something went wrong"
        })
    }
}