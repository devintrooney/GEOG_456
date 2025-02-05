var marker = L.marker([35.911276,-79.05004]).bindPopup("<b>Carolina Hall</b>").addTo(map);
var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
