import './Map.scss'
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
//import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
//import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import mapIconUrl from '../assets/map-icon.png';
import mapIconShadowUrl from '../assets/map-icon-shadow.png';

export function Map({ location, downtown, address }) {
    //const mapRef = useRef();

    /* useEffect(() => {
        const current = { current: {} = mapRef };
        const { leafletElement: map } = current;
    }, []); */
    /* atributo do MapContainer
    ref={mapRef} */

    /* const MyMarker = (props) => {
        const leafletRef = useRef();
        useEffect(() => {
            leafletRef.current.openPopup();
        }, [])
        return <Marker ref={leafletRef} {...props} />
    } */

    const LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: mapIconShadowUrl,
            iconSize: [30, 50],
            shadowSize: [50, 64],
            iconAnchor: [30, 12],
            shadowAnchor: [30, 25],
            popupAnchor: [-3, -76]
        }
    });
    const mapIcon = new LeafIcon({ iconUrl: mapIconUrl });

    return (
        <MapContainer className='mapStyle'  fullscreenControl={true} fullscreenControlOptions={{position:'topleft'}} center={location} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* <MyMarker position={location} >
                <Popup>
                    <b>{address}</b>
                </Popup>
            </MyMarker> */}
            {/* <Marker position={location} >
                <Popup>
                    <b>{address}</b>
                </Popup>
            </Marker> */}
            <Marker position={location} icon={mapIcon}>
                {/* <Popup> <b>{address}</b> </Popup> */}
                <Tooltip direction="top" offset={[-15, -15]} opacity={1} permanent><b>{address}</b></Tooltip>
            </Marker>
            <Circle center={downtown} radius={2000} fillColor='#ee375c' color='red' />
        </MapContainer>
    )
}
