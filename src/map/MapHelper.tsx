import mapboxgl from "mapbox-gl";
import "./map.css"

export const addRouteLineLayer = (map: mapboxgl.Map, route: any) => {
    if (map.getLayer("route")) return;

    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': route?.route?.route.map((r) =>
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

export const addLiveRouteLineLayer = (map: mapboxgl.Map, route: any) => {
    if (map.getLayer('liveRoute')) {
        map.removeLayer('liveRoute');
    }
    if (map.getSource('liveRoute')) {
        map.removeSource('liveRoute');
    }
    let stopADep: string | null = null;
    let stopBArr: string | null = null;
    let prevStop: [number, number] = [0, 0];

    const liveCoords = route?.route?.route
        .map((r) => {
            const departure = r.departure?.actual || r.departure?.estimated || r.departure?.scheduled;
            const arrival = r.arrival?.actual || r.arrival?.estimated || r.arrival?.scheduled;

            if (!stopBArr) {
                stopADep = departure;
                stopBArr = arrival;
                prevStop = [r.location.lon, r.location.lat];
            } else {
                stopBArr = arrival;
                const currentTime = new Date();

                // Check if the current time is between the start and end times
                if (currentTime >= new Date(stopADep!) && currentTime <= new Date(stopBArr!)) {
                    stopADep = departure;
                    return [[prevStop[0], prevStop[1]], [r.location.lon, r.location.lat]];
                }

                prevStop = [r.location.lon, r.location.lat];
                stopADep = departure;
            }
        })
        .filter(function (r) {
            return r !== undefined;
        }) as Array<[[number, number], [number, number]]>;



    map.addSource('liveRoute', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': liveCoords[0]
            },
        }
    });

    map.addLayer({
        id: 'liveRoute',
        type: 'line',
        source: 'liveRoute',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#ff00ff',
            'line-width': 8
        }
    })
}

export const addRouteMarkerLayer = (map: mapboxgl.Map, route: any) => {
    if (map.getLayer("places")) return;
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': route?.route?.route.map((r) =>
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

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}