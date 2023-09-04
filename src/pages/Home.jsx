import './Home.scss'
import { Card } from "../Components/Card";
import { SearchBar } from '../Components/SearchBar'
import { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useAuth } from "../contexts/auth";
import { Loading } from '../Components/Loading';


export function Home() {
    const { urlBase, loading, homeProducts, loadingWait } = useAuth();
    const [categorias, setCategorias] = useState('')
    const [produtos, setProdutos] = useState(homeProducts)
    const [produtosFiltrados, setProdutosFiltrados] = useState(homeProducts)
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState('');
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios.get(`${urlBase}/categorias`).then(
            (response) => {
                setCategorias(response.data);
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
            }
        )

        axios.get(`${urlBase}/produtos`).then(
            (response) => {
                setProdutos(response.data);
                setProdutosFiltrados(response.data)
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
            }
        )

        /* let apiKey = 'AIzaSyBiepDOJfdSFAnqL9wo8LKuOx6w2mS5DMQ'
        let endereco ='Rua Antonio Correia, 199, Santo André, SP'
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${apiKey}`).then(
            (response) => {
                console.log(response);
                console.log(response.data.results[0].geometry.location.lat)
                console.log(response.data.results[0].geometry.location.lng)
            },
            (error) => {
                console.log(error);
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
            }
        ) */


    }, [])

    useEffect(() => {
        setProdutos(homeProducts);
        setProdutosFiltrados(homeProducts)
    }, [homeProducts])
    

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(produtosFiltrados.slice(itemOffset, endOffset));
    }, [itemOffset, produtosFiltrados]);

    useEffect(() => {
        setItemOffset(0);
        setPage(1)
    }, [produtosFiltrados]);


    function filterCategory(categoryId) {
        let produtosFiltradosPorCategoria = produtos.filter((item) => {
            return item.categoria.id == categoryId
        })
        setProdutosFiltrados(produtosFiltradosPorCategoria)
    }

    function filterCategoryQuantity(categoryId) {
        if (produtos.length > 1) {
            return produtos.filter((item) => item.categoria.id == categoryId).length
        } else {
            return
        }
    }



    return (
        <main className="mainStyle">


            <SearchBar filteredData={(valueReturned) => setProdutosFiltrados(valueReturned)} />

            <section className="categoriesSection">
                <div className='custonSection'>
                    <h1>Buscar por tipo de acomodação</h1>
                    <div className="categoryContainer">
                        {categorias && categorias.map((element, index) => (

                            <Card
                                className='cardCategorias'
                                key={index}
                                type='category'
                                id={element.id}
                                img={element.urlImagem}
                                category={element.qualificacao}
                                quantity={filterCategoryQuantity(element.id)}
                                filteredData={(valueReturned) => filterCategory(valueReturned)}
                            />

                        ))}
                    </div>
                </div>
            </section>

            <section className="recomendationsSection">
                <div className='custonSection'>
                    <h1>Recomendações</h1>

                    <div className="recomendationContainer">
                        {currentItems && currentItems.map((element, index) => (
                            <Card
                                key={index}
                                type='recomendations'
                                id={element.id}
                                img={element.imagens}
                                favorite={element.favorito}
                                stars={element.estrelas}
                                title={element.nome}
                                grade={element.avaliacao}
                                location={element.localizacao}
                                differential={element.caracteristicas}
                                description={element.descricao}
                                category={element.categoria}
                            />
                        ))}
                    </div>
                </div>

                <PaginationControl
                    page={page}
                    between={3}
                    total={produtosFiltrados.length}
                    limit={itemsPerPage}
                    changePage={(page) => {
                        setPage(page);
                        setItemOffset((page - 1) * itemsPerPage % produtosFiltrados.length);
                        loadingWait(200);
                    }}
                    ellipsis={1}
                />

            </section>

            <Loading loading={loading} />
        </main>

    )
}