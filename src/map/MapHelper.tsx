import mapboxgl, { GeoJSONSource, LngLatLike } from "mapbox-gl";
import "./map.css"
import { getGapInMinutes } from "../TimeHelper";
import { FeatureCollection, Point } from 'geojson';

export const addRouteLineLayer = (map: mapboxgl.Map, routeData: any) => {
    // Displays the route line, for this demo I haven't bothered loading
    // a new line every time we receive route as it's the same route
    if (map?.getLayer("route")) return;

    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': routeData?.route?.route.map((r: any) =>
                    ([r.location.lon, r.location.lat])
                )
            },
        }
    });

    map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#888',
            'line-width': 8
        }
    })
}

export const addLiveBusMarkerLayer = async (map: mapboxgl.Map, routeData: any) => {

    const geojson: FeatureCollection<Point, { rotation?: number; description: string }> = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: {
                rotation: routeData?.route.vehicle.gps.heading,
                description: `<b>Bus location</b> </br> Last updated: ${getGapInMinutes(new Date(routeData?.route?.vehicle.gps.last_updated))}`
            },
            geometry: {
                type: 'Point',
                coordinates: [routeData?.route.vehicle.gps.longitude, routeData?.route.vehicle.gps.latitude]
            }
        }]
    };
    
    // if there already is a liveBus Source, update the data to show the latest position and heading
    if (map.getSource('liveBus')) {
        (map.getSource('liveBus') as GeoJSONSource).setData(geojson);
        return;
    }

    map.loadImage(
        "src/images/bus.png",
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('busImage', image!);

            map.addSource('liveBus', {
                type: 'geojson',
                data: geojson
            });
            map.addLayer({
                'id': 'liveBus',
                'type': 'symbol',
                'source': 'liveBus',
                'layout': {
                    'icon-image': 'busImage',
                    'icon-size': 0.075,
                    'icon-rotate': ['get', 'rotation']
                }
            });
        });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'liveBus', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        if (e.features![0].geometry.type === 'Point') {
            // Copy coordinates array.
            const coordinates = e!.features![0].geometry.coordinates.slice();
            const description = e!.features![0].properties!.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates as LngLatLike).setHTML(description).addTo(map);
        }

    });

    map.on('mouseleave', 'liveBus', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}

export const addRouteMarkerLayer = (map: mapboxgl.Map, routeData: any) => {
    if (map.getLayer("places")) return;

    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': routeData?.route?.route.map((r: any) =>
            ({
                'type': 'Feature',
                'properties': {
                    'description':
                        `${r.location.detailed_name}  <br /> ${r.location.region_name}`
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [r.location.lon, r.location.lat]
                }
            }))
        }
    });
    map.addLayer({
        'id': 'places',
        'type': 'circle',
        'source': 'places',
        'paint': {
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        if (e.features![0].geometry.type === 'Point') {

            // Copy coordinates array.
            const coordinates = e.features![0].geometry.coordinates.slice();
            const description = e.features![0].properties!.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates as LngLatLike).setHTML(description).addTo(map);
        }

    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}