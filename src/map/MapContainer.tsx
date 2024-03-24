import { Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = 'pk.eyJ1Ijoiamhld3NvbiIsImEiOiJjbHU1b2RqMTIwaDNhMmxudjJ4cWk3NGV2In0.73E5eCnVMUhvb2d1nUqOEA';

const MapContainer = (route: any) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = -3.64;
    const lat = 56.13;
    const zoom = 9;
    const bounds = [
        [-4.907922506048819, 55.59200415994516], // Southwest coordinates
        [-2.5565555416764436, 56.60958712052606] // Northeast coordinates
    ];

    useEffect(() => {
        // code from the next step will go here!
        const geojson = {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.662323, 45.523751]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'Washington, D.C.'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.692323, 45.523751]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }

            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.612323, 45.523751]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }

            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.682323, 45.523751]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }

            }
            ]
            // features: route?.route?.route.map((r) => {
            //     return ({
            //         type: 'Feature',
            //         geometry: {
            //             type: 'Point',
            //             coordinates: [r.location.lon, r.location.lat]
            //         },
            //         properties: {
            //             title: 'Mapbox',
            //             description: 'Washington, D.C.'
            //         }
            //     })
            // })
        };

        console.log(geojson)

        if (map?.current?.isStyleLoaded()) {
            console.log()
            console.log(map)
            // add markers to map
            geojson.features?.forEach(function (marker) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';

                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map.current);
            });

            // map.current.on('load', () => {
            const out = route?.route?.route.map((r) => {
                return ([r.location.lon, r.location.lat])
            })
            console.log(out)
            map.current.resize()
            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': route?.route?.route.map((r) => {
                                return ([r.location.lon, r.location.lat])
                            })
                        },
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8
                }
            })
            // });
        }


    }, [route, map])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom,
            // maxBounds: bounds
        });


    });

    return (
        <Box sx={{ height: '100%' }}>
            <Box className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </Box>
            <Box sx={{ height: '100vh' }} ref={mapContainer} className="map-container" />
        </Box>
    );

}

export default MapContainer;