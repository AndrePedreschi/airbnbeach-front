import './SearchBar.scss'
import { toast } from 'react-toastify';
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, X } from 'phosphor-react'
import Litepicker from 'litepicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAuth } from "../contexts/auth";

export function SearchBar({ filteredData }) {
    const { auth, urlBase } = useAuth();
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const litepickerRef = useRef(null);
    const [datePicker, setDatePicker] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [arrayCidades, setArrayCidades] = useState([]);

    function createDatepicker() {
        if (datePicker) {
            litepickerRef.current.destroy()
        }

        litepickerRef.current = new Litepicker({
            element: document.getElementById('datepicker'),
            numberOfMonths: windowWidth < 641 ? 1 : 2,
            numberOfColumns: windowWidth < 641 ? 1 : 2,
            selectForward: true,
            singleMode: false,
            lang: "pt-BR",
            format: "DD MMM",
            autoApply: false,
            autoClose: true,
            tooltipText: { "one": "dia", "other": "dias" },
            buttonText: {
                apply: 'Aplicar', cancel: 'Cancelar',
            },
            minDate: new Date(),

            setup: (picker) => {
                picker.on('render', (ui) => {
                    setDatePicker(true)
                });
            },
        });
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
        }, 50);

    }, [windowWidth])

    useEffect(() => {
        createDatepicker()

        axios.get(`${urlBase}/cidades`).then((response) => {
            let arrayRequest = []
            response.data.forEach(item => {
                if(item.nome !== null && !arrayRequest.includes(item.nome)){
                    arrayRequest.push(item.nome)
                }else{
                    return
                }
            });
            setArrayCidades(arrayRequest)

            //setArrayCidades([...new Set(  response.data.map((item) => {item.nome}) )])
            //setArrayCidades([...new Set(  arrayRequest.map((item) => {item}) )])

        }, (error) => {
            console.log(error.code);
        });
    }, []);

    function cleanForm() {
        setCity('');
        setDate('');
        litepickerRef.current.clearSelection()
        litepickerRef.current.destroy()
        createDatepicker()
    }

    function validateForm() {
        let startDate = litepickerRef.current.options.startDate == null
        let endDate = litepickerRef.current.options.endDate == null

        if ((city === undefined || city === null || city.length < 1) && (startDate || endDate)) {
            toast.error('Selecione uma data ou uma cidade')
            return false
        }
        return true
    }


    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        let startDate = litepickerRef.current.options.startDate !== null ? litepickerRef.current.options.startDate.dateInstance.toISOString().slice(0, 10) : ''
        let endDate = litepickerRef.current.options.endDate !== null ? litepickerRef.current.options.endDate.dateInstance.toISOString().slice(0, 10) : ''
        let url

        if ((city !== undefined & city !== null && city.length > 1) && (startDate !== '' && endDate !== '')) {
            url = `/search?dataInicial=${startDate}&dataFinal=${endDate}&cidade=${city}`

        } else if (startDate !== '' && endDate !== '') {
            url = `/datasDisponiveis?dataInicial=${startDate}&dataFinal=${endDate}`
        } else if (city !== undefined && city !== null && city.length > 1) {
            url = `/cidade?nomeCidade=${city}`
        }

        axios.get(`${urlBase}/produtos${url}`).then((response) => {

            filteredData(response.data)
            toast.success("Próximo destino econtrado!")
        }, (error) => {
            if (error.response.status == 401) return toast.error('Nenhuma acomodação encontrada para essa cidade');
            if (error.response.status == 403) return toast.error('Recarregue a página e tente novamente.');
            if (error.response.status == 404) return toast.error('Erro ao preencher o formuário. Recarregue a página e tente novamente.');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
        });

        cleanForm();
    }


    return (
        <section className='searchBarStyle'>
            <h1 className='searchTitle'>Buscar ofertas em hotéis, casas e muito mais</h1>

            <form onSubmit={handleSubmit} className='formStyle'>

                <div className='citySection'>
                    <label htmlFor="city" >
                        <MapPin size={20} color="#54577689" weight="fill" className='mapIcon' />
                    </label>
                    {arrayCidades &&
                        <Autocomplete
                            className='inputSearchStyle'
                            value={city}
                            onChange={(event, newValue) => { setCity(newValue) }}
                            //freeSolo={true}
                            disablePortal
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            id="controllable-states-demo"
                            options={arrayCidades}
                            color='red'
                            renderInput={(params) => <TextField {...params} placeholder='Onde vamos?' />}
                        />
                    }
                </div>

                <section className="datepickerSection">
                    <label htmlFor="date" className="datepickerLabel">
                        <Calendar size={28} color="#545776" weight="fill" className='calendarIcon' />
                    </label>

                    <input
                        className="text-small inputSearchStyle"
                        type="text"
                        name="date"
                        id='datepicker'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        autoComplete="off"
                        placeholder="Check in  -  Check out"
                        ref={litepickerRef}
                    />
                </section>
                <button className="btnSearchBar" type="submit"> Buscar </button>
            </form>
        </section>
    )
}