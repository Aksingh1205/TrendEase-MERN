import { useState, useEffect } from "react";
import axios from "axios";

export default function useCatagory() {
    const [catagories, setCatagories] = useState([])

    //get catagories
    const getCatagories = async() => {
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/catagory/get-catagory')
            if (data?.success) {
                setCatagories(data?.catagory);
              }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCatagories()
    },[])

    return catagories
}