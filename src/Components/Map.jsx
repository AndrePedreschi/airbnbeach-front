import './Map.scss'
import { MapContainer, TileLayer, Marker, Circle, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import mapIconUrl from '../assets/map-icon.png';
import mapIconShadowUrl from '../assets/map-icon-shadow.png';

export function Map({ location, downtown, address }) {

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
        <>
            {location !== "[undefined, undefined]" && downtown !== "[undefined, undefined]" ?
                <MapContainer className='mapStyle' fullscreenControl={true} fullscreenControlOptions={{ position: 'topleft' }} center={location} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={location} icon={mapIcon}>
                        <Tooltip direction="top" offset={[-15, -15]} opacity={1} permanent><b>{address}</b></Tooltip>
                    </Marker>
                    <Circle center={downtown} radius={2000} fillColor='#ee375c' color='red' />
                </MapContainer>
                :
                <p>Ocorreu um erro com mapa da propriedade, por favor entre em contato com o suporte</p>
            }
        </>
    )
}
