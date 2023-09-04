import './Map.scss'
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import mapIconUrl from '../assets/map-icon.png';
import mapIconShadowUrl from '../assets/map-icon-shadow.png';

export function Map2({ location, downtown, address }) {

    setTimeout(() => {
        var map = new L.map('map', {

        }).setView(location, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: mapIconShadowUrl,
                iconSize: [30, 50],
                shadowSize: [50, 64],
                iconAnchor: [19, 74],
                shadowAnchor: [20, 97],
                popupAnchor: [-3, -76]
            }
        });

        const mapIcon = new LeafIcon({ iconUrl: mapIconUrl });

        L.marker(location, { icon: mapIcon }).addTo(map)
            .bindPopup(address)
            .openPopup();

        var circle = L.circle(downtown, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 2000
        }).addTo(map);

        circle.bindPopup("Centro")
        map.addControl(new L.Control.Fullscreen());

    }, 10);

    return (
        <>
            {location !== "[undefined, undefined]" && downtown !== "[undefined, undefined]" ?
                <div id="map" className='mapStyle'></div>
                :
                <p>Ocorreu um erro com mapa da propriedade, por favor entre em contato com o suporte</p>
            }
        </>
    )
}
