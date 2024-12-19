import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
  const position = [-2.529991, 117.462824];
  const [laporanUser, setLaporanUser] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/laporan', { withCredentials: true })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          console.log('API response:', response.data);
          setLaporanUser(response.data.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="map-container border rounded">
      <MapContainer center={position} zoom={4.5} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {laporanUser.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.position.latitude, marker.position.longitude]}
          >
            <Popup>
              {`Deskripsi Kerusakan : ${marker.deskripsi}`}
              <br />
              {`Status Laporan : ${marker.status}`}
              <br />
              {`Latitude : ${marker.position.latitude}`}
              <br />
              {`Longitude : ${marker.position.longitude}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
