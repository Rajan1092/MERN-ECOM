import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createproductcontroller, deleteproductcontroller, getproductcontroller, getproductphotocontroller, getspecificproductcontroller, productCountController, productFiltersController, productListController, productcategorycontroller, searchproductcontroller, updateproductcontroller } from '../controllers/productController.js'
import formidable from 'express-formidable'
const router = express.Router()

// Post Product Route
router.post('/create-product',requireSignIn,isAdmin,formidable(),createproductcontroller)

// Update Product Route
router.put('/update-product/:id',requireSignIn,isAdmin,formidable(),updateproductcontroller)

// Delete Product Route
router.delete('/delete-product/:id',requireSignIn,isAdmin,formidable(),deleteproductcontroller)

// Get Product Route
router.get('/products',getproductcontroller)

// Get Single Product Route
router.get('/products/:id',getspecificproductcontroller)

// Get Single Photo Route
router.get('/product/photo/:id',getproductphotocontroller)

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// Search Product Route
router.get('/search/:keyword',searchproductcontroller)

// Category Product Route
router.get('/product-category/:_id',productcategorycontroller)



export default router