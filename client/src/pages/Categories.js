import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import useCategory from '../hooks/useCategory'
import { Link, useParams } from 'react-router-dom'


const Categories = () => {
    const {_id} = useParams()
    const [category, setCategory] = useState([])
    const getAllCategory = async()=>{
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/category/categories')
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllCategory()
    },[])
  return (
    <>
    <Layout>
    <div className="container">
        <div className="row">
          {category.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/categories/${c._id}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Categories