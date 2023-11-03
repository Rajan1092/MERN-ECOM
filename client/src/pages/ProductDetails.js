import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { json, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {
  const [product, setProducts] = useState([])
  let { _id } = useParams()

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/products/${_id}`)
      if (data?.success) {
        setProducts(data?.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (_id) {
      getProduct()
    }
  }, { _id })

 

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product/photo/${_id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>

    </Layout>
  )
}

export default ProductDetails