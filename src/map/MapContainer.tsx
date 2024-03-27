import { Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { addLiveBusMarkerLayer, addRouteLineLayer, addRouteMarkerLayer } from "./MapHelper";
import 'mapbox-gl/dist/mapbox-gl.css';
import MobileNavigationButton from "../navigation/MobileNavigationButton";

mapboxgl.accessToken = 'pk.eyJ1Ijoiamhld3NvbiIsImEiOiJjbHU1b2RqMTIwaDNhMmxudjJ4cWk3NGV2In0.73E5eCnVMUhvb2d1nUqOEA';

const MapContainer = (routeData: any) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const lng = -3.64;
    const lat = 56.13;
    const zoom = 9;
    const bounds = [
        [-4.907922506048819, 55.59200415994516], // Southwest coordinates
        [-2.5565555416764436, 56.60958712052606] // Northeast coordinates
    ];

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom,
            maxBounds: bounds
        });

        newMap.on('load', () => {
            newMap.resize()
        })

        setMap(newMap)
    }, []);

    useEffect(() => {
        if (routeData?.route?.route && map) {
            addRouteLineLayer(map, routeData);
            addRouteMarkerLayer(map, routeData);
            addLiveBusMarkerLayer(map, routeData);
        }
    }, [routeData])

    return (
        <Box sx={{ height: '100%' }}>
            <Box sx={{ height: '100vh' }} ref={mapContainer} className="map-container" >
                <MobileNavigationButton toMap={false} />
            </Box>
        </Box>
    );

}

export default MapContainer;