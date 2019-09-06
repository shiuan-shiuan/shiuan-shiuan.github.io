var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, { maxZoom: 20, attribution: osmAttrib });
var map = L.map('map').setView([24.151687694799833, 120.64116954803465], 15).addLayer(osm);
L.control.scale().addTo(map);

function onLocationFound(e) {

    L.marker(e.latlng).addTo(map);
    L.circle(e.latlng, 30).addTo(map);
    var control = L.Routing.control(L.extend(window.lrmConfig, {
        waypoints: [
            e.latlng,
            L.latLng(24.149036, 120.664740)
        ],
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
        reverseWaypoints: true,
        showAlternatives: true,
        altLineOptions: {
            styles: [
                { color: 'black', opacity: 0.15, weight: 9 },
                { color: 'white', opacity: 0.8, weight: 6 },
                { color: 'blue', opacity: 0.5, weight: 2 }
            ]
        }
    })).addTo(map);


    L.Routing.errorControl(control).addTo(map);

}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({ setView: true, maxZoom: 16 });