import "./Category.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
//import { useAuth } from "../contexts/auth";
import axios from "axios";
import { toast } from 'react-toastify';

export function Category() {
    //const { saveToken, saveUser  } = useAuth();
    const { id } = useParams()
    //const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState("");


    useEffect(() => {
        let url = `https://www.airbabeach/category/${id}`;

        const options = {
            headers: { 'X-Custom-Header': 'value' }
        }

        axios.get(url, options).then((response) => {
            setCategoryData(response)
        }, (error) => {

            if (error.status == 404) return toast.error('Categoria não encontrada, recarregue a página!');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');

        });
    }, [])







    return (
        <p>Categoria {id}</p>
    )
}