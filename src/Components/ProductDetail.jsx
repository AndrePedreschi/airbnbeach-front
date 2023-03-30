import './ProductDetail.scss'
import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from 'react-router-dom'
import { Carousel } from "../Components/Carousel";
import { HeartIcon } from "../Components/HeartIcon";
import { StarRate } from '../Components/StarRate';
import { Map } from "../Components/Map";
import { gradeStatus } from '../utils/gradeStatus'
import { breakLines } from '../utils/breakLines'
import Litepicker from 'litepicker';

import {
    Copy,
    ShareNetwork,
    X,
    MapPin,
    WifiHigh,
    PawPrint,
    Television,
    CookingPot,
    Car,
    Bathtub,
    Wind
} from 'phosphor-react'

import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";


export function ProductDetail() {
    const productData = useOutletContext();
    const [modal, setModal] = useState(false);
    const [share, setShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
            //mobileFriendly: true,
            //splitView: true,
            selectForward: true,
            //singleMode: false,
            singleMode: true,
            lang: "pt-BR",
            format: "DD MMM",
            autoApply: true,
            autoClose: true,
            tooltipText: { "one": "dia", "other": "dias" },
            inlineMode: true,
            //minDate:'03/15/2023',

            lockDaysFilter: (date1, date2, pickedDates) => {
                return lockedDates.includes(date1.format('YYYY-MM-DD'));
            },

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
        }, 2);
    }, [windowWidth])
    //useffect usado para criar o calendário
    useEffect(() => {
        setShareUrl(window.location.href)
        setTimeout(() => {
            createDatepicker()
        }, 1);
    }, [])


    return (
        <section className="productDetailContainer">

            {modal &&
                <div className="carouselContainer" >
                    <div className="controle" onClick={() => setModal(false)}></div>
                    <Carousel imgs={productData.img} />
                    <X size={32} className='closeIcon' type='modal' color="#ffffff" weight="bold" onClick={() => setModal(false)} />

                </div>
            }

            <section className="locationSection">
                <div className="locationText">
                    <MapPin className="mapPinStyle" size={20} color="#545776" weight="fill" />
                    <p className="text-normal">{productData.location.address}, à {productData.location.distance}m do centro</p>
                </div>

                <div className="locationGrade">
                    <div className="gradeRating">
                        <p className='text-small gradeText'>{gradeStatus(productData.grade)}</p>
                        <StarRate rate={productData.stars} />

                    </div>
                    <div className='grade'>{productData.grade.toFixed(1)}</div>
                </div>
            </section>

            <section className="shareSection">
                <HeartIcon className='heartIconStyle' id={productData.id} border={true} favorite={productData.favorite} />
                <ShareNetwork size={24} color="#000000" className='shareButton' onClick={() => setShare(true)} />

                {share &&
                    <div className="shareContainer" >
                        <div className="controle" onClick={() => setShare(false)}></div>
                        <X size={32} className='closeIcon' type='share' color="#ffffff" weight="bold" onClick={() => setShare(false)} />

                        <section className='shareContent'>
                            <h1 className='shareTitle'>Compartilhe esta oportunidade!</h1>
                            <section className='shareInputContainer'>
                                <input type="text" defaultValue={shareUrl} readOnly={true} className='shareInput' />
                                <button className='copyStyle' onClick={() => { navigator.clipboard.writeText(shareUrl); }}>
                                    <Copy className='copyButton' size={26} />
                                </button>
                            </section>

                            <div className='shareIcons'>
                                <FacebookShareButton url={shareUrl}><FacebookIcon size={32} round={true} /></FacebookShareButton>
                                <FacebookMessengerShareButton url={shareUrl}><FacebookMessengerIcon size={32} round={true} /></FacebookMessengerShareButton>
                                <LinkedinShareButton url={shareUrl}><LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                                <TelegramShareButton url={shareUrl}><TelegramIcon size={32} round={true} /></TelegramShareButton>
                                <TwitterShareButton url={shareUrl}><TwitterIcon size={32} round={true} /></TwitterShareButton>
                                <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                            </div>
                        </section>
                    </div>
                }
            </section>

            <section className="imgsSection">
                <div className="desktopStyle">
                    <img className="img0" src={productData.img[0]} />
                    <img className="img1" src={productData.img[1]} />
                    <img className="img2" src={productData.img[2]} />
                    <img className="img3" src={productData.img[3]} />
                    <img className="img4" src={productData.img[4]} />
                </div>

                <div className="seeMoreStyle">
                    <a onClick={() => setModal(!modal)}>Ver mais</a>
                </div>

                <div className='carouselComponent'>
                    <Carousel imgs={productData.img} />
                </div>
            </section>

            <section className="descriptionSection">
                <h1 className=".h1 descriptionTitle">{productData.description.title}</h1>
                {breakLines(productData.description.text).map((itens, index) => (
                    <p key={index} className='text-normal'>{itens}</p>
                ))}
            </section>

            <section className="diferentialSection">
                <h1 className="h1">O que esse lugar oferece?</h1>
                <hr />
                <div className="diferentialItens">
                    {productData.differential.includes('wi-fi') && <p className="iconsText text-normal"><WifiHigh size={20} color="#383b58" /> - Wi-Fi</p>}
                    {productData.differential.includes('pool') && <div className="iconsText text-normal"><p className='poolIcon'></p> - Piscina</div>}
                    {productData.differential.includes('pets') && <p className="iconsText text-normal"><PawPrint size={20} color="#383b58" weight="fill" /> - Pet friendly</p>}
                    {productData.differential.includes('tv') && <p className="iconsText text-normal"><Television size={20} color="#383b58" /> - Televisão</p>}
                    {productData.differential.includes('kitchen') && <p className="iconsText text-normal"><CookingPot size={20} color="#383b58" /> - Cozinha</p>}
                    {productData.differential.includes('parking') && <p className="iconsText text-normal"><Car size={20} color="#383b58" /> - Estacionamento</p>}
                    {productData.differential.includes('jacuzzi') && <p className="iconsText text-normal"><Bathtub size={20} color="#383b58" /> - Jacuzzi</p>}
                    {productData.differential.includes('air-conditioning') && <p className="iconsText text-normal"><Wind size={20} color="#383b58" /> - Ar condicionado</p>}
                </div>
            </section>

            <section className="mapSection">
                <h1 className="h1">Localização</h1>
                <Map location={productData.location.location} downtown={productData.location.downtown} address={productData.location.address} />
            </section>

            <section className="availabilitySection">
                <h1 className="h1">Datas disponíveis</h1>
                <section className="datePickerSection">
                    <div className="datepickerStyle" id='datepicker' ref={litepickerRef} />
                    <section className='initReserveSection'>
                        <p className='text-normal paragraphText'>Adicione as datas da sua viagem para obter preços exatos</p>
                        <Link to={`/product/${productData.id}/booking`} className='btnInitReserve'>Iniciar Reserva</Link>
                    </section>
                </section>
            </section>
        </section>
    )
}

