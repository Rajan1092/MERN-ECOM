import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [category, setCategory] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/categories");
      if(data?.success){
        setCategory(data?.category)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return category;
}