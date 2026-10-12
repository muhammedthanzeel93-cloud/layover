import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Point } from '../lib/routing';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface MapComponentProps {
  origin: Point;
  destination: Point;
  stations: Point[];
}

export default function MapComponent({ origin, destination, stations }: MapComponentProps) {
  const centerLat = (origin.lat + destination.lat) / 2;
  const centerLng = (origin.lng + destination.lng) / 2;

  return (
    <div className="h-full w-full overflow-hidden relative z-0">
      <MapContainer center={[origin.lat, origin.lng]} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={[centerLat, centerLng]} zoom={11} />
        
        <Marker position={[origin.lat, origin.lng]}>
          <Popup>DXB Origin Concourse</Popup>
        </Marker>
        
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>Destination Point</Popup>
        </Marker>

        {stations.map((st, i) => (
          <Marker key={i} position={[st.lat, st.lng]} opacity={0.5}>
            <Popup>Metro Station</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
