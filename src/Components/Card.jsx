import './Card.scss'
import { useState, useEffect } from "react";
import { convertNumber } from '../utils/convertNumber'
import { gradeStatus } from '../utils/gradeStatus'
import { X, MapPin, WifiHigh, PawPrint, Television, CookingPot, Car, Bathtub, Wind } from 'phosphor-react'
import { Link } from "react-router-dom";
//import { HeartIcon } from './HeartIcon';
//import { Map } from './Map'
import { Map2 } from './Map2'
import { StarRate } from './StarRate';
import { useAuth } from "../contexts/auth";

export function Card({
    id,
    type,
    category,
    quantity,
    img,
    favorite,
    stars,
    title,
    grade,
    location,
    differential,
    description,
    filteredData
}) {
    const { loadingWait } = useAuth();
    const [modal, setModal] = useState(false);
    const [caracteristicas, setCaracteristicas] = useState('');

    useEffect(() => {
        if (differential) {
            setCaracteristicas(differential.map((item) => item.nome));
        }
    }, [differential]) 


    return (
        <>
            {type === 'category' &&
                <div type='category' className='cardBodyStyle' onClick={() => {filteredData(id); loadingWait(400)}}>
                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img} />
                    </section>

                    <section className='textSection'>
                        <h2>{category}</h2>
                        <p>{convertNumber(quantity)} {category}</p>
                    </section>
                </div>
            }

            {(type === 'recomendations') &&
                <div type='recomendations' className='cardBodyStyle'>

                    {modal &&
                        <div className="mapModalContainer" >
                            <div className="controle" onClick={() => setModal(false)}></div>
                            <Map2 location={JSON.parse(location.coordenadas !== "[undefined, undefined]" ? location.coordenadas : location.centro)} downtown={JSON.parse(location.centro)} address={location.endereco} />
                            <X size={32} className='closeIcon' color="#ffffff" weight="bold" onClick={() => setModal(false)} />

                        </div>
                    }

                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img[0].url} />
                        {/* <HeartIcon
                            className='heartIconStyle'
                            id={id}
                            //favorite={favorite} ]
                        /> */}
                    </section>

                    <section className='detailsStyle'>

                        <section className='section1'>
                            <div className='titleStyle'>
                                <div className='starsStyle'>
                                    <h4>{ }</h4>
                                    <StarRate rate={stars} />
                                </div>
                                <h1 className='title'>{title}</h1>
                            </div>

                            <div className='gradesStyle'>
                                <div className='grade'>{grade.toFixed(1)}</div>
                                <p className='text-small gradeText'>{gradeStatus(grade)}</p>
                            </div>
                        </section>

                        <section className='section2'>
                            <div className='locationContainer'>
                                <MapPin size={20} color="#545776" weight="fill" />
                                <p className='locationText text-normal'>À {convertNumber(location.distancia)}m do centro - </p>
                                <a className='googleMapsImg' onClick={() => setModal(true)} ></a>
                            </div>

                            <div className='diferentialsStyle'>
                                {caracteristicas.includes('Wi-Fi') && <WifiHigh size={20} color="#383b58" />}
                                {caracteristicas.includes('Piscina') && <p className='poolIcon'></p>}
                                {caracteristicas.includes('Pets') && <PawPrint size={20} color="#383b58" weight="fill" />}
                                {caracteristicas.includes('TV') && <Television size={20} color="#383b58" />}
                                {caracteristicas.includes('Cozinha') && <CookingPot size={20} color="#383b58" />}
                                {caracteristicas.includes('Estacionamento') && <Car size={20} color="#383b58" />}
                                {caracteristicas.includes('Jacuzzi') && <Bathtub size={20} color="#383b58" />}
                                {caracteristicas.includes('Ar-condicionado') && <Wind size={20} color="#383b58" />}
                            </div>
                        </section>

                        <section className='section3 text-normal'>
                            <p className='textStyle'>
                                {description.texto}
                            </p>
                        </section>
                        <Link to={`/product/${id}`}><button className='btn'>Ver mais</button></Link>
                    </section>
                </div>
            }
        </>
    )
}