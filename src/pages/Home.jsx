import './Home.scss'
import { Card } from "../Components/Card";
import { cards, recomendations } from '/public/cardsMock.js'
import { SearchBar } from '../Components/SearchBar'
import { useEffect, useState } from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';


export function Home() {
    const [categorias, setCategorias] = useState('')
    const [produtos, setProdutos] = useState('')


    useEffect(() => {
        axios.get(`http://3.128.201.181:8080/categorias`).then(
            (response) => {
                //console.log(response);
                setCategorias(response);
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');

            }
        )

        axios.get(`http://3.128.201.181:8080/produtos`).then(
            (response) => {
                //console.log(response);
                setProdutos(response);
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');

            }
        )
    }, [])

    function filterCategory(category) {
        //console.log(cards);
        let produtosFiltradosPorCategoria = cards.filter((item) => {
            return item.category == category
        })
        //console.log(produtosFiltradosPorCategoria);


        //setProdutos()
    }




    function Items({ currentItems }) {
        return (
            <div className="recomendationContainer">
                {currentItems.map((element, index) => (
                    <Card
                        key={index}
                        type='recomendations'
                        id={element.id}
                        img={element.img}
                        favorite={element.favorite}
                        stars={element.stars}
                        title={element.title}
                        grade={element.grade}
                        location={element.location}
                        differential={element.differential}
                        description={element.description}
                    />
                ))}
            </div>
        );
    }




    const [currentItems, setCurrentItems] = useState(recomendations);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(recomendations.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(recomendations.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % recomendations.length;
        setItemOffset(newOffset);
    };






    return (
        <main className="mainStyle">

            <SearchBar filteredData={(valueReturned) => setProdutos(valueReturned)} />

            <section className="categoriesSection">
                <div className='custonSection'>
                    <h1>Buscar por tipo de acomodação</h1>
                    <div className="categoryContainer">
                        {cards.map((element, index) => (
                            <Card
                                key={index}
                                type='category'
                                id={element.id}
                                img={element.img}
                                category={element.category}
                                quantity={element.quantity}
                                filteredData={(valueReturned) => filterCategory(valueReturned)}

                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="recomendationsSection">
                <div className='custonSection'>
                    <h1>Recomendações</h1>
                   
                    <Items currentItems={currentItems} />
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
                />
               
            </section>

        </main>

    )
}