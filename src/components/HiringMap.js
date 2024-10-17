import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Icon URLs
const customIcon = new L.Icon({
    iconUrl: '/images/marker-icon.png', // path to your local marker-icon.png
    shadowUrl: '/images/marker-shadow.png', // path to your local marker-shadow.png
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapComponent = () => {
    useEffect(() => {
        const map = L.map('map', {
            center: [19.039304863326628, 72.8438939481569], // Center of the map (Bandra)
            zoom: 14, // Initial zoom level
            scrollWheelZoom: false // Disable scroll zoom
        });
        // Add a tile layer (OpenStreetMap tiles)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const markers = [
            { 
                name: "Mahindra Brothers", 
                lat: 19.0544, 
                lon: 72.8403, 
                address: "123 Diamond Lane, Bandra", 
                hiringCapacity: 250 
            },
            { 
                name: "Vasupujya", 
                lat: 19.0581, 
                lon: 72.8303, 
                address: "456 Gem Street, Bandra Kurla Complex", 
                hiringCapacity: 300 
            },
            { 
                name: "Nihiar", 
                lat: 19.0196, 
                lon: 72.8411, 
                address: "789 Jewel Road, Dadar", 
                hiringCapacity: 200 
            },
            { 
                name: "Gitanjali", 
                lat: 19.0234, 
                lon: 72.8539, 
                address: "101 Gem Plaza, Mahim", 
                hiringCapacity: 150 
            },
            { 
                name: "Kiran Gems", 
                lat: 19.0320, 
                lon: 72.8430, 
                address: "112 Diamond Crescent, Dadar", 
                hiringCapacity: 180 
            },
            { 
                name: "Hira Panna", 
                lat: 19.0468, 
                lon: 72.8425, 
                address: "123 Hira Bhavan, Bandra", 
                hiringCapacity: 220 
            },
            { 
                name: "Pooja Diamonds", 
                lat: 19.0221, 
                lon: 72.8548, 
                address: "130 Pooja Bungalow, Dadar", 
                hiringCapacity: 160 
            },
            { 
                name: "Siddharth Gems", 
                lat: 19.0245, 
                lon: 72.8570, 
                address: "45 Siddharth Building, Dadar", 
                hiringCapacity: 280 
            },
            { 
                name: "Gems Plaza", 
                lat: 19.0465, 
                lon: 72.8560, 
                address: "75 Gems Avenue, Mahim", 
                hiringCapacity: 120 
            },
            { 
                name: "Pioneer Diamonds", 
                lat: 19.0530, 
                lon: 72.8375, 
                address: "200 Pioneer Point, Bandra", 
                hiringCapacity: 100 
            },
            { 
                name: "Vasupujya", 
                lat: 19.0503, 
                lon: 72.8345, 
                address: "300 Vasupujya House, Shivaji Park", 
                hiringCapacity: 50 
            },
            { 
                name: "Shree Ramkrishna", 
                lat: 19.0423, 
                lon: 72.8384, 
                address: "50 Ramkrishna Nagar, Bandra", 
                hiringCapacity: 200
            },
            { 
                name: "Diamond World", 
                lat: 19.0400, 
                lon: 72.8390, 
                address: "78 Diamond Heights, Bandra", 
                hiringCapacity: 150 
            },
            { 
                name: "Jewels of India", 
                lat: 19.0470, 
                lon: 72.8430, 
                address: "95 Jewels Center, Dadar", 
                hiringCapacity: 300 
            },
        ];
        
        

        markers.forEach((marker) => {
            const newMarker = L.marker([marker.lat, marker.lon], { icon: customIcon }).addTo(map);

            // Popup on hover
            newMarker.bindTooltip(`<strong>${marker.name}</strong><br>${marker.address}<br>hiring capacity: ${marker.hiringCapacity}`, {
                permanent: false, // Popup appears only on hover
                direction: "top",
                className: "custom-popup",
            });
        });
        // Prevent map from moving
        map.on('drag', function (e) {
            map.panTo(map.getCenter());
        });

        return () => {
            map.remove(); // Cleanup map instance on component unmount
        };
    }, []);

    return (
        <section className="featured-companies">
            <h2>Currently Hiring Companies</h2>
            <div id="map" style={{ height: "500px", width: "100%" , border:"1px solid black"}}></div>
        </section>
    );
};

export default MapComponent;
