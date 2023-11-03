import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {CategoryController, updateCategoryController,getcategorycontroller,getspecificcategorycontroller,deletecategorycontroller} from '../controllers/CategoryController.js'
const router = express.Router()

// Post Category Route
router.post('/create-category',requireSignIn,isAdmin, CategoryController)

// Update Category Route
router.put('/update-category/:id',requireSignIn,isAdmin, updateCategoryController)

// Get Category Route
router.get('/categories',getcategorycontroller)

// Get Specific Category Route
router.get('/categories/:id',getspecificcategorycontroller)

// Delete  Category Route
router.delete('/delete-category/:id',requireSignIn,isAdmin,deletecategorycontroller)


export default router