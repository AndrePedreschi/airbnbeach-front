import { useState } from "react"
import "./UserBookings.scss"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from "axios";
import { useAuth } from "../contexts/auth";
import confusedCat from '../assets/confused-cat.gif'
import { CaretLeft, Trash } from 'phosphor-react'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { Loading } from "../Components/Loading";

export function UserBookings() {
    const [reservas, setReservas] = useState('')
    const [loadingCat, setLoadingCat] = useState(false)
    const { urlBase, auth, user, loading } = useAuth();

    useEffect(() => {
        reserva()
    }, [])

    function reserva() {
        axios.defaults.headers.get['Authorization'] = `Bearer ${auth}`;
        axios.get(`${urlBase}/reservas/usuario/${user.id}`).then(
            (response) => {
                setReservas(response.data)
                setLoadingCat(true)
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
                toast.error('Ocorreu um erro, por favor recarregue a página!');
                setLoadingCat(false)
            }
        )
    }

    function deleteReserva(id) {
        Swal.fire({
            title: 'Deseja realmente cancelar a sua reserva?',
            width: '360',
            color: '#545776',
            icon: 'question',
            focusCancel: true,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axios.defaults.headers.delete['Authorization'] = `Bearer ${auth}`;
                axios.delete(`${urlBase}/reservas/${id}`).then(
                    (response) => {
                        setLoadingCat(true)
                        reserva()
                        toast.success("Reserva cancelada com sucesso!")
                    },
                    (error) => {
                        //if (error.status == 404) return toast.error('Usuário não encontrado');
                        if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
                    }
                )
            } else {
                return
            }
        })
    }


    function ajustaFormatoData(dataNaoFormatada) {
        const [ano, mes, dia] = dataNaoFormatada.split("-");
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }

    return (
        <section className="userBookingsSection">
            <Loading loading={loading} />
            <section className="headerSection">
                <div className="headerText">
                    <p className="h2"> Reservas feitas</p>
                </div>

                <Link to={"/home"}><CaretLeft className="caretLeftIcon" size={32} color="#ffffff" weight="bold" /></Link>
            </section>

            {loadingCat &&
                <>
                    {(reservas && reservas.length !== 0) ?
                        <section className="tableSection">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Hotel</th>
                                        <th>Data de entrada</th>
                                        <th>Data de saída</th>
                                        <th>Check-in</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reservas && reservas.reverse().map((item, index) => (
                                        <tr key={index}>
                                            <td><Link to={`/product/${item.produto.id}`} className='nomeProduto'>{item.produto.nome}</Link></td>
                                            <td className="horasStyle">{ajustaFormatoData(item.dataInicial)}</td>
                                            <td className="horasStyle">{ajustaFormatoData(item.dataFinal)}</td>
                                            <td className="horasStyle">{item.hora.slice(0, -3)}</td>
                                            <td className='lixeira' onClick={() => { deleteReserva(item.id) }}><Trash size={18} color="var(--red-error)" className='lixeiraIcone' /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                        :
                        <section className="noBookingsSection">
                            <p className="sadText">Sem reservas!</p>
                            <img src={confusedCat} />
                            <p className="text-normal"> <Link to={'/home'}>Clique aqui</Link> e comece agora fazendo uma reserva!</p>
                        </section>
                    }
                </>
            }
        </section>
    )
}