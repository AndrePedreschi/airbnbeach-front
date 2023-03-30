import { products } from '/public/cardsMock.js'

import "./Product.scss";
import { useState, useEffect, useRef } from "react";
import { Link, useParams, Outlet, useLocation } from 'react-router-dom'
import { breakLines } from '../utils/breakLines'
import axios from "axios";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { CaretLeft } from 'phosphor-react'

export function Product() {
    const { id } = useParams()
    const [productData, setProductData] = useState('');
    const location = useLocation();
 
  


    //useffect usado para simular a requisição
    useEffect(() => {
        let produtoSelecionado = products.find((item) => {
            return item.id == id
        })
        setProductData(produtoSelecionado)
    }, [])

    useEffect(() => {

        let url = `http://3.128.201.181:8080/produtos/${id}`;

        axios.get(url).then((response) => {
            console.log(response);
            //setProductData(response)
        }, (error) => {
            console.log(error.code);

            if (error.status == 404) return toast.error('Houve um problema, recarregue a página');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
        });
    }, [])



    return (
        <>
            {productData !== '' &&
                <section className="productContainer">
                    <section className="headerSection">
                        <div className="headerText">
                            <p className="h4">Hotel</p>
                            <p className='title h1'>{productData.title}</p>
                        </div>

                        <Link to={location.pathname.includes('booking') ? `/product/${id}`: "/home" }><CaretLeft className="caretLeftIcon" size={32} color="#ffffff" weight="bold" /></Link>
                    </section>

                    <Outlet context={productData} />

                    <section className="politicsSection">
                        <h1 className="h1">O que você precisa saber:</h1>
                        <section className="politicDetails">
                            <section className='politicsText'>
                                <h2 className="h3">Regras da casa</h2>
                                {breakLines(productData.details.houseRules).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>

                            <section className='politicsText'>
                                <h2 className="h3">Saúde e Segurança</h2>
                                {breakLines(productData.details.healthSafety).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>

                            <section className='politicsText'>
                                <h2 className="h3">Política de cancelamento</h2>
                                {breakLines(productData.details.refundPolitics).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>
                        </section>
                    </section>
                </section>
            }
        </>
    )
}