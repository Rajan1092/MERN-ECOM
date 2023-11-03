import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { json, useNavigate, useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const navigate = useNavigate()
    const  {_id}  = useParams()
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

    const getCategoryByCat = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${_id}`)
            setCategory(data.category)
            console.log(data.category)
            setProducts(data?.products)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(_id) getCategoryByCat()
    }, [_id])

    return (
        <>
            <Layout>
                <div className="container mt-3">
                    <h4 className="text-center">Category - {category?.name}</h4>
                    <h6 className="text-center">{products?.length} result found </h6>
                    <div className="row">
                        <div className="col-md-9 offset-1">
                            <div className="d-flex flex-wrap">
                                {products?.map((p) => (
                                    <div
                                        className="card m-2"
                                        style={{ width: "18rem" }}
                                        key={p._id}
                                    >
                                        <img
                                            src={`http://localhost:8080/api/v1/product/product/photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">
                                                {p.description.substring(0, 30)}...
                                            </p>
                                            <p className="card-text"> $ {p.price}</p>
                                            <button
                                                className="btn btn-primary ms-1"
                                                onClick={() => navigate(`/product/${p._id}`)}
                                            >
                                                More Details
                                            </button>
                                            <button className="btn btn-secondary ms-1">
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CategoryProduct