import './Home.scss'
import { Card } from "../Components/Card";
import { SearchBar } from '../Components/SearchBar'
import { useEffect, useState } from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { useAuth } from "../contexts/auth";

export function Home() {
    const { urlBase, auth } = useAuth();
    const [categorias, setCategorias] = useState('')
    const [produtos, setProdutos] = useState('')
    const [produtosFiltrados, setProdutosFiltrados] = useState('')
    //paginação
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState('');



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

        /* axios.defaults.headers.get['Authorization'] = `Bearer ${auth}`;
        axios.get(`${urlBase}/reservas/usuario/3`).then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');

            }
        ) */
    }, [])
    

    //paginação
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(produtosFiltrados.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(produtosFiltrados.length / itemsPerPage));
        //setItemOffset(0);
    }, [itemOffset, produtosFiltrados]);
    useEffect(() => {
        //const endOffset = itemOffset + itemsPerPage;
        //setCurrentItems(produtosFiltrados.slice(itemOffset, endOffset));
        //setPageCount(Math.ceil(produtosFiltrados.length / itemsPerPage));
        setItemOffset(0);
    }, [produtosFiltrados]);



    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % produtosFiltrados.length;
        setItemOffset(newOffset);
    };


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

                <ReactPaginate
                    className="react-paginate"
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={0}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="selected"
                    renderOnZeroPageCount={null}
                //onClick={console.log('mudou')}
                //forcePage={1}
                //onPageChange={console.log('mudou')}
                //initialPage={0}
                />

            </section>

        </main>

    )
}