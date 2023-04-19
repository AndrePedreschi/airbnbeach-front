import './ProductDetail.scss'
import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from 'react-router-dom'
import { Carousel } from "../Components/Carousel";
//import { HeartIcon } from "../Components/HeartIcon";
import { StarRate } from '../Components/StarRate';
import { Map } from "../Components/Map";
import { gradeStatus } from '../utils/gradeStatus'
import { breakLines } from '../utils/breakLines'
import Litepicker from 'litepicker';
import { useAuth } from "../contexts/auth";


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
import { Loading } from './Loading';


export function ProductDetail() {
    const productData = useOutletContext();
    const [caracteristicas, setCaracteristicas] = useState(productData.caracteristicas.map((item) => item.nome));
    const [modal, setModal] = useState(false);
    const [share, setShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const litepickerRef = useRef(null);
    const { loading } = useAuth();

    useEffect(() => {
        createDatepicker()
    }, [])


    function createDatepicker(datas) {
        if (datePicker) {
            litepickerRef.current.destroy()
        }
        if (productData !== undefined) {


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
                    if (productData.lockedDates && productData.lockedDates !== undefined) {
                        return productData.lockedDates.includes(date1.format('YYYY-MM-DD'));
                    } else {
                        return
                    }
                },

                setup: (picker) => {
                    picker.on('render', (ui) => {
                        setDatePicker(true)
                    });
                },
            });

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
    }, []);

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

    useEffect(() => {
        setShareUrl(window.location.href)
    }, [])

    function unsecuredCopyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text; document.body.appendChild(textArea);
        textArea.focus(); textArea.select();

        try {
            document.execCommand('copy')
        } catch (err) {
            console.error('Unable to copy to clipboard', err)
        }

        document.body.removeChild(textArea)
    };

    function copyUrl() {
        let url = window.location.href

        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(url);
        } else {
            unsecuredCopyToClipboard(url);
        }
    }

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    return (
        <section className="productDetailContainer">

            {modal &&
                <div className="carouselContainer" >
                    <div className="controle" onClick={() => setModal(false)}></div>
                    <Carousel imgs={productData.imagens} />
                    <X size={32} className='closeIcon' type='modal' color="#ffffff" weight="bold" onClick={() => setModal(false)} />

                </div>
            }

            <section className="locationSection">
                <div className="locationText">
                    <MapPin className="mapPinStyle" size={20} color="#545776" weight="fill" />
                    <p className="text-normal">{productData.localizacao.endereco}, à {productData.localizacao.distancia}m do centro</p>
                </div>

                <div className="locationGrade">
                    <div className="gradeRating">
                        <p className='text-small gradeText'>{gradeStatus(productData.avaliacao)}</p>
                        <StarRate rate={productData.estrelas} />

                    </div>
                    <div className='grade'>{productData.avaliacao.toFixed(1)}</div>
                </div>
            </section>

            <section className="shareSection">
                {/* <HeartIcon
                    className='heartIconStyle'
                    id={productData.id}
                    border={true}
                //favorite={productData.favorito}
                /> */}
                <ShareNetwork size={24} color="#000000" className='shareButton' onClick={setShare} />

                {share &&
                    <div className="shareContainer" >
                        <div className="controle" onClick={() => setShare(false)}></div>
                        <X size={32} className='closeIcon' type='share' color="#ffffff" weight="bold" onClick={() => setShare(false)} />

                        <section className='shareContent'>
                            <h1 className='shareTitle'>Compartilhe esta oportunidade!</h1>
                            <section className='shareInputContainer'>
                                <input type="text" defaultValue={shareUrl} readOnly={true} className='shareInput' />
                                <button className='copyStyle' onClick={() => { copyUrl(shareUrl) }}>
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
                <div className={productData.imagens.length < 5 ? "desktopStyle2" : "desktopStyle"}>
                    {productData.imagens[0] && <img className="img0" src={productData.imagens[0].url} />}
                    {productData.imagens[1] && <img className="img1" src={productData.imagens[1].url} />}
                    {productData.imagens[2] && <img className="img2" src={productData.imagens[2].url} />}
                    {productData.imagens[3] && <img className="img3" src={productData.imagens[3].url} />}
                    {productData.imagens[4] && <img className="img4" src={productData.imagens[4].url} />}
                </div>

                <div className="seeMoreStyle" style={productData.imagens.length < 5 ? { color: 'black' } : { color: '#ffffff' }}>
                    <a onClick={() => setModal(!modal)}>Ver mais</a>
                </div>

                <div className='carouselComponent'>
                    <Carousel imgs={productData.imagens} />
                </div>
            </section>

            <section className="descriptionSection">
                <h1 className=".h1 descriptionTitle">{productData.descricao.titulo}</h1>
                {breakLines(productData.descricao.texto).map((itens, index) => (
                    <p key={index} className='text-normal'>{itens}</p>
                ))}
            </section>

            <section className="diferentialSection">
                <h1 className="h1">O que esse lugar oferece?</h1>
                <hr />

                <div className="diferentialItens">
                    {caracteristicas.includes('Wi-Fi') && <p className="iconsText text-normal"><WifiHigh size={20} color="#383b58" /> - Wi-Fi</p>}
                    {caracteristicas.includes('Piscina') && <div className="iconsText text-normal"><p className='poolIcon'></p> - Piscina</div>}
                    {caracteristicas.includes('Pets') && <p className="iconsText text-normal"><PawPrint size={20} color="#383b58" weight="fill" /> - Pet friendly</p>}
                    {caracteristicas.includes('TV') && <p className="iconsText text-normal"><Television size={20} color="#383b58" /> - Televisão</p>}
                    {caracteristicas.includes('Cozinha') && <p className="iconsText text-normal"><CookingPot size={20} color="#383b58" /> - Cozinha</p>}
                    {caracteristicas.includes('Estacionamento') && <p className="iconsText text-normal"><Car size={20} color="#383b58" /> - Estacionamento</p>}
                    {caracteristicas.includes('Jacuzzi') && <p className="iconsText text-normal"><Bathtub size={20} color="#383b58" /> - Jacuzzi</p>}
                    {caracteristicas.includes('Ar-condicionado') && <p className="iconsText text-normal"><Wind size={20} color="#383b58" /> - Ar condicionado</p>}
                </div>
            </section>

            <section className="mapSection">
                <h1 className="h1">Localização</h1>
                <Map location={JSON.parse(productData.localizacao.coordenadas !== "[undefined, undefined]" ? productData.localizacao.coordenadas : productData.localizacao.centro)} downtown={JSON.parse(productData.localizacao.centro)} address={productData.localizacao.endereco} />
            </section>

            <section className="availabilitySection">
                <h1 className="h1">Datas disponíveis</h1>

                <section className="datePickerSection">
                    <div className="datepickerStyle" id='datepicker' ref={litepickerRef} />
                    <section className='initReserveSection'>
                        <p className='text-normal paragraphText'>Adicione as datas da sua viagem para obter preços exatos</p>
                        <Link to={`/product/${productData.id}/booking`} className='btnInitReserve' onClick={topFunction}>Iniciar Reserva</Link>
                    </section>
                </section>

                
            </section>
            <Loading loading={loading} />
        </section>
    )
}

