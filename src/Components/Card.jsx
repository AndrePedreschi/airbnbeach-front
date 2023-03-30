import './Card.scss'
import { useState, useEffect } from "react";
import { convertNumber } from '../utils/convertNumber'
import { gradeStatus } from '../utils/gradeStatus'
import { toast } from 'react-toastify';
import { X, Star, MapPin, WifiHigh, Shower, PawPrint, Television, CookingPot, Car, Bathtub, Wind } from 'phosphor-react'
import { Link, useNavigate } from "react-router-dom";
import { HeartIcon } from './HeartIcon';
import { Map } from './Map'
import { Map2 } from './Map2'
import { StarRate } from './StarRate';

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
    const [modal, setModal] = useState(false);


    /* function descriptionText() {
        if (description.length > 75) {
            return description.slice(0, 75)
        } else {
            return description
        }
    } */






    return (
        <>
            {type === 'category' &&
                <div>
                    {/* <Link to={`/category/${id}`} type='category' className='cardBodyStyle'>
                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img} />
                    </section>

                    <section className='textSection'>
                        <h2>{category}</h2>
                        <p>{convertNumber(quantity)} hotéis</p>
                    </section>
                </Link> */}
                    <div type='category' className='cardBodyStyle' onClick={()=>filteredData(category)}>
                        <section className='thumbStyle'>
                            <img className='imgStyle' src={img} />
                        </section>

                        <section className='textSection'>
                            <h2>{category}</h2>
                            <p>{convertNumber(quantity)} hotéis</p>
                        </section>
                    </div>
                </div>
            }

            {(type === 'recomendations') &&
                <div type='recomendations' className='cardBodyStyle'>

                    {modal &&
                        <div className="mapModalContainer" >
                            <div className="controle" onClick={() => setModal(false)}></div>
                            <Map2 location={location.location} downtown={location.downtown} address={location.address} />
                            <X size={32} className='closeIcon' color="#ffffff" weight="bold" onClick={() => setModal(false)} />

                        </div>
                    }

                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img} />
                        <HeartIcon className='heartIconStyle' id={id} favorite={favorite} />
                    </section>

                    <section className='detailsStyle'>

                        <section className='section1'>
                            <div className='titleStyle'>
                                <div className='starsStyle'>
                                    <h4>Hotel</h4>
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
                                <p className='locationText text-normal'>À {convertNumber(location.distance)}m do centro - </p>
                                <a className='googleMapsImg' onClick={() => setModal(true)} ></a>
                            </div>

                            <div className='diferentialsStyle'>
                                {differential.includes('wi-fi') && <WifiHigh size={20} color="#383b58" />}
                                {differential.includes('pool') && <div className='poolIcon' />}
                                {differential.includes('pets') && <PawPrint size={20} color="#383b58" weight="fill" />}
                                {differential.includes('tv') && <Television size={20} color="#383b58" />}
                                {differential.includes('kitchen') && <CookingPot size={20} color="#383b58" />}
                                {differential.includes('parking') && <Car size={20} color="#383b58" />}
                                {differential.includes('jacuzzi') && <Bathtub size={20} color="#383b58" />}
                                {differential.includes('air-conditioning') && <Wind size={20} color="#383b58" />}
                            </div>
                        </section>

                        <section className='section3 text-normal'>
                            <p className='textStyle'>
                                {description}
                                {/* {descriptionText()}
                                {description.length > 75 && <Link to={`/product/${id}`} className='maisTexto '>mais...</Link>} */}
                            </p>
                        </section>
                        <Link to={`/product/${id}`}><button className='btn'>Ver mais</button></Link>
                    </section>
                </div>
            }
        </>
    )
}