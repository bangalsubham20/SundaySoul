import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiMapPin } from 'react-icons/fi';

// Fix for default marker icon missing in production build
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ lat, lng, popupText }) => {
    // If coordinates are missing, don't render map
    if (!lat || !lng) return null;

    return (
        <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-xl relative z-0">
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                    <Popup>
                        <div className="text-teal-900 font-bold">
                            {popupText || 'Trip Location'}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
