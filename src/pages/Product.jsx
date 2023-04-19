import "./Product.scss";
import { useState, useEffect } from "react";
import { Link, useParams, Outlet, useLocation } from 'react-router-dom'
import { breakLines } from '../utils/breakLines'
import axios from "axios";
import { toast } from 'react-toastify';
import { CaretLeft } from 'phosphor-react'
import { useAuth } from "../contexts/auth";
import { Loading } from '../Components/Loading';

export function Product() {
    const { id } = useParams()
    const [productData, setProductData] = useState('');
    const location = useLocation();
    const { urlBase, auth } = useAuth();

    function popularLockedDatesArr(listaDeReservas) {
        const lockedDatesArr = [];
    
        listaDeReservas.forEach(([dataInicioStr, dataFimStr]) => {
            const dataInicio = new Date(dataInicioStr);
            const dataFim = new Date(dataFimStr);
            for (let dataAtual = new Date(dataInicio); dataAtual <= dataFim; dataAtual.setDate(dataAtual.getDate() + 1)) {
                lockedDatesArr.push(dataAtual.toISOString().substring(0, 10));
            }
        });
        return lockedDatesArr;
    }


    useEffect(() => {
        axios.get(`${urlBase}/produtos/${id}`).then((response) => {
            let dados = response.data

            axios.defaults.headers.get['Authorization'] = `Bearer ${auth}`;
            axios.get(`${urlBase}/reservas/por_produto/${id}`).then((response) => {
                
                let arrayDeDatas = []
                response.data.forEach((item)=>{
                    arrayDeDatas.push([item.dataInicial, item.dataFinal])
                })
                
                setProductData({ ...dados, ...{ lockedDates: popularLockedDatesArr(arrayDeDatas) } })
            }, (error) => {
                if (error.status == 404) return toast.error('Houve um problema, recarregue a página');
                if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
            });

        }, (error) => {
            if (error.status == 404) return toast.error('Houve um problema, recarregue a página');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
        });

    }, [])


    return (
        <>
            {productData !== '' ?
                <section className="productContainer">
                    <section className="headerSection">
                        <div className="headerText">
                            <p className="h4">
                                {productData.categoria.id === 1 && 'Hotel'}
                                {productData.categoria.id === 2 && 'Hostel'}
                                {productData.categoria.id === 3 && 'Apartamento'}
                                {productData.categoria.id === 4 && 'Pousada'}
                            </p>
                            <p className='title h1'>{productData.nome}</p>
                        </div>

                        <Link to={location.pathname.includes('booking') ? `/product/${id}` : "/home"}><CaretLeft className="caretLeftIcon" size={32} color="#ffffff" weight="bold" /></Link>
                    </section>

                    <Outlet context={productData} />

                    <section className="politicsSection">
                        <h1 className="h1">O que você precisa saber:</h1>
                        <section className="politicDetails">
                            <section className='politicsText'>
                                <h2 className="h3">Regras da casa</h2>
                                {breakLines(productData.detalhes.regrasDaCasa).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>

                            <section className='politicsText'>
                                <h2 className="h3">Saúde e Segurança</h2>
                                {breakLines(productData.detalhes.saudeESeguranca).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>

                            <section className='politicsText'>
                                <h2 className="h3">Política de cancelamento</h2>
                                {breakLines(productData.detalhes.politicaDeCancelamento).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>
                        </section>
                    </section>
                </section>
                :
                <Loading loading={true} />
            }
        </>
    )
}