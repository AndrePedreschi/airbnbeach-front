import './Booking.scss'
import { useState, useEffect, useRef } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { textMask } from '../utils/mask';
import { toast } from 'react-toastify';
import axios from "axios";
import Litepicker from 'litepicker';
import Swal from 'sweetalert2'
import successIcon from '../assets/success.gif'
import { CheckCircle, MapPin } from 'phosphor-react'
import { StarRate } from './StarRate';
import { useAuth } from "../contexts/auth";


export function Booking() {
    const productData = useOutletContext()
    const { user, auth } = useAuth();
    const navigate = useNavigate();
    const [city, setCity] = useState('')
    const [datePicker, setDatePicker] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [arrivalHour, setArrivalHour] = useState('Selecione a hora prevista de chegada');
    const [startDate, setStartDate] = useState('__/__/____');
    const [endDate, setEndDate] = useState('__/__/____');
    const litepickerRef = useRef(null);

    function createDatepicker() {
        if (datePicker) {
            litepickerRef.current.destroy()
        }

        const lockedDates = [
            '2023-03-01', '2023-03-05', '2023-03-08',
            '2023-03-12', '2023-03-15', '2023-03-19',
        ];

        litepickerRef.current = new Litepicker({
            element: document.getElementById('datepicker'),
            numberOfMonths: 2,
            numberOfColumns: 2,
            selectForward: true,
            singleMode: false,
            lang: "pt-BR",
            format: "DD MMM",
            autoApply: true,
            autoClose: true,
            tooltipText: { "one": "dia", "other": "dias" },
            inlineMode: true,
            minDate: new Date(),

            lockDaysFilter: (date1, date2, pickedDates) => {
                return lockedDates.includes(date1.format('YYYY-MM-DD'));
            },

            setup: (picker) => {
                picker.on('render', (ui) => {
                    setDatePicker(true)
                });
                picker.on('selected', (date1, date2) => {
                    //console.log(date1.dateInstance.toISOString());
                    //console.log(date2.dateInstance.toLocaleDateString('pt-BR'));
                    setStartDate(date1.dateInstance.toLocaleDateString('pt-BR'))
                    setEndDate(date2.dateInstance.toLocaleDateString('pt-BR'))
                });
            },
        });

        if (windowWidth < 640) {
            litepickerRef.current.setOptions({ numberOfColumns: 1 });
            litepickerRef.current.setOptions({ numberOfMonths: 1 });
        } else {
            litepickerRef.current.setOptions({ numberOfColumns: 2 });
            litepickerRef.current.setOptions({ numberOfMonths: 2 });
        }
    }
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    useEffect(() => {
        setTimeout(() => {
            if (windowWidth < 640) {
                litepickerRef.current.setOptions({ numberOfColumns: 1 });
                litepickerRef.current.setOptions({ numberOfMonths: 1 });
            } else {
                litepickerRef.current.setOptions({ numberOfColumns: 2 });
                litepickerRef.current.setOptions({ numberOfMonths: 2 });
            }
        }, 2);
    }, [windowWidth])

    //useffect usado para criar o calendário
    useEffect(() => {
        createDatepicker()
    }, [])




    function cleanForm() {
        setCity('');
        litepickerRef.current.clearSelection()
        litepickerRef.current.destroy()
        setStartDate('__/__/____')
        setEndDate('__/__/____')
        createDatepicker()
        setArrivalHour('Selecione a hora prevista de chegada')
    }

    function validateForm() {
        if (city === undefined || city === null || city.length < 1) {
            toast.error('Preencha a cidade onde mora')
            return false
        }
        if (startDate == '__/__/____' || endDate == '__/__/____') {
            toast.error('Selecione as datas');
            return false
        }
        if (arrivalHour == 'Selecione a hora prevista de chegada') {
            toast.error('Selecione a hora prevista de chegada');
            return false
        }

        return true
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        let url = 'http://3.128.201.181:8080/reservas';
        let data = {
            //city: city,
            dataInicial: startDate,
            dataFinal: endDate,
            hora: arrivalHour,
            produto: null,
            cliente: null
        }

        axios.defaults.headers.post['Authorization'] = `Bearer ${auth}`;

        axios.post(url, data).then((response) => {

            Swal.fire({
                title: 'Sua reserva foi feita com sucesso',
                width: '360',
                color: '#545776',
                imageUrl: successIcon,
                focusConfirm: false,
                confirmButtonColor: '#1dbeb4',
                confirmButtonText: 'Ok',
            }).then((result) => {
                navigate('/home')
            })

        }, (error) => {
            console.log(error);
            if (error.status == 404) return toast.error('Infelizmente, a reserva não pode ser completada. Por favor, tente novamente mais tarde.');
            //if (error.status == 404) return toast.error('Destino não encontrada');
            //if (error.status == 404) return toast.error('Erro ao preencher o formuário. Recarregue a página e tente novamente.');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
        });

        cleanForm();
    }




    return (
        <form className='productBookingContainer' onSubmit={handleSubmit}>
            <section className='confirmPersonalData'>
                <h1 className='h1'>Complete seus dados</h1>
                <section className='personalDataContainer'>

                    <div className='inputContainer'>
                        <label className='labelStyle h4'>Nome</label>
                        <input defaultValue={user.nome} readOnly={true} className="inputStyle" />
                    </div>
                    <div className='inputContainer'>
                        <label className='labelStyle h4'>Sobrenome</label>
                        <input defaultValue={user.sobrenome} readOnly={true} className="inputStyle" />
                    </div>
                    <div className='inputContainer'>
                        <label className='labelStyle h4'>E-mail</label>
                        <input defaultValue={user.email} readOnly={true} className="inputStyle" />
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='city' className='labelStyle h4'>Cidade</label>
                        <input
                            type="text"
                            name='city'
                            id='city'
                            className="inputStyle"
                            placeholder='Digite a cidade que reside...'
                            value={city}
                            onChange={(e) => setCity(textMask(e.target.value))}
                        />
                    </div>
                </section>
            </section>

            <section className='bookingDate'>
                <h1 className='h1'>Selecione sua data de reserva</h1>
                <section className="datePickerSection">
                    <div className="datepickerStyle" id='datepicker' ref={litepickerRef} />
                </section>
            </section>

            <section className='bookingCheckIn'>
                <h1 className='h1'>Seu horário de chegada</h1>
                <section className='checkinHourSection'>
                    <div className='checkinText'>
                        <CheckCircle className='okIcon' />
                        <p className='h4'>Seu quarto estara pronto para check-in entre 10h00 e 23h00</p>
                    </div>

                    <div className='checkinTime'>
                        <label htmlFor="checkinTime" className='h4'>Indique a sua hora prevista de chegada</label>
                        <select name="time" value={arrivalHour} id="selectTime" className='selectTimeStyle' onChange={(e) => setArrivalHour(e.target.value)}>
                            <option value="Selecione a data e hora de chegada">Selecione a data e hora de chegada</option>
                            <option value="01:00:00">01:00 AM</option>
                            <option value="02:00:00">02:00 AM</option>
                            <option value="03:00:00">03:00 AM</option>
                            <option value="04:00:00">04:00 AM</option>
                            <option value="05:00:00">05:00 AM</option>
                            <option value="06:00:00">06:00 AM</option>
                            <option value="07:00:00">07:00 AM</option>
                            <option value="08:00:00">08:00 AM</option>
                            <option value="09:00:00">09:00 AM</option>
                            <option value="10:00:00">10:00 AM</option>
                            <option value="11:00:00">11:00 AM</option>
                            <option value="12:00:00">12:00 AM</option>
                            <option value="13:00:00">01:00 PM</option>
                            <option value="14:00:00">02:00 PM</option>
                            <option value="15:00:00">03:00 PM</option>
                            <option value="16:00:00">04:00 PM</option>
                            <option value="17:00:00">05:00 PM</option>
                            <option value="18:00:00">06:00 PM</option>
                            <option value="19:00:00">07:00 PM</option>
                            <option value="20:00:00">08:00 PM</option>
                            <option value="21:00:00">09:00 PM</option>
                            <option value="22:00:00">10:00 PM</option>
                            <option value="23:00:00">11:00 PM</option>
                            <option value="24:00:00">12:00 PM</option>
                        </select>
                    </div>
                </section>
            </section>

            <section className='bookingDetails'>

                <section className='datailsCard'>
                    <h1 className='h1 '>Detalhe da reserva</h1>

                    <div className='bookingDetailsContainer'>
                        <img src={productData.img[0]} className='bookingImage' />
                        <section className='bookingDetailsSection'>
                            <div className='titleText'>
                                <p className='h4'>Hotel</p>
                                <p className='h1'>{productData.title}</p>
                                <StarRate rate={productData.stars} />
                            </div>

                            <div className="locationText">
                                <MapPin className="mapPinStyle" size={22} color="#545776" weight="fill" />
                                <p className="text-normal">{productData.location.address}</p>
                            </div>

                            <div className='checkDates'>
                                <hr />
                                <p>Check in - {startDate}</p>
                                <hr />
                                <p>Check out - {endDate}</p>
                            </div>

                            <button className='btnBooking' type='submit'>Realizar a reserva</button>
                        </section>
                    </div>
                </section>
            </section>
        </form>

    )
}