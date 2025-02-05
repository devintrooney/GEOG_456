/// I am placing here a set of js lines that we will use in class
/// However try not to depend entirely on copy-pasting so that way you get to learn better what is happening in the code

// This is an object for assigning style to leaflet markers
var markerOptions = {
    radius: 8,
    fillColor: "#000080",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
};

/* var map = L.map('map').setView(carolinaHall, 17);
        
var marker = L.marker(carolinaHall).bindPopup("<b>Carolina Hall</b>").addTo(map);

L.circleMarker(carolinaHall,markerOptions).addTo(map);

*/

// L.geoJSON(centroids).addTo(map);
var districtLON = centroids.features[0].geometry.coordinates[0]
var districtLAT = centroids.features[0].geometry.coordinates[1]

// in this line I am getting the lat and lon of the first feature in the array
// I use .slice().reverse() to reverse the original [lon,lat] to [lan,lon] since leaflet uses data in [lat,lon] format
var firstCentroid = centroids.features[0].geometry.coordinates.slice().reverse()

// in this line I am making a circle marker for the first waypoint in the array. 
L.circleMarker(firstCentroid,markerOptions).bindPopup(centroids.features[0].properties.note ).addTo(map);

// This is using the method of pointToLayer from leaflet which iterates through every feature in the geojson 
var cc = L.geoJSON(centroids, {
    pointToLayer: function (feature, latlng) {
        // console.log(feature)
        return L.circleMarker(latlng, markerOptions).bindPopup(feature.properties.note);
    }
}).addTo(map);

/////////////////////////////////////
//Working with array methods in js //
/////////////////////////////////////
/*
// the map method creates a new array 
myFeatures = centroids.features.map(e => e)
// in the previous line I just created a new array called myFeatures
// in this line I am printing out the first longitude in the array of features.
console.log(myFeatures[0].geometry.coordinates[0])

// i am creating an array of longitudes and of latitudes
myLongitudes = centroids.features.map(e => e.geometry.coordinates[0])
myLatitudes = centroids.features.map(e => e.geometry.coordinates[1])


// the forEach() method is similar to map(), but does not create a new array
centroids.features.forEach(e => console.log('long = ' + e.geometry.coordinates[0]))

//cc.remove() // removing the leaflet layer
//markerOptions.fillColor = 'red' // changing the fill color property
// centroids.features.forEach(e => L.circleMarker(e.geometry.coordinates.slice().reverse(),markerOptions).addTo(map));
// the previous line demonstrates how I can use the forEach() iteration to generate the same result as the L.geoJSON method
// this works as long as I give the coordinates in lat/lon.  
*/
//////////////////////////////////////
//Working with leaflet layer controls/
//////////////////////////////////////

// Go to Leaflet Provider Demo //
//https://leaflet-extras.github.io/leaflet-providers/preview/

// here I am adding the ESRI tileLayer
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
// this is an object with the tile layers
// the property or key is the text and the value is the variable holding the tileLayer
var baseLayers = {
    "OpenStreetMap": OSM,
    "ESRI": Esri_WorldImagery
    };
// this is an object with the vectors
// the property or key is the text and the value is the variable holding the vectors
var overlayMaps = {
    "Districts": districtBoundaries
    "Circles": cc
};
// This method will create the button for controlling layers
var layerControl = L.control.layers(baseLayers,overlayMaps).addTo(map);

//////////////////////////////////////
//Working with leaflet layer events///
//////////////////////////////////////

/* here I am creating an empty variable
var daEvent;
// here I am creating a empty leaflet popup object using the .popup() method
var popup = L.popup();

// this is a function that receives one parameter that we have named e 
// in js we often name events something like e, evt, ev, or event. 
function onMapClick(e) {
    daEvent = e // here I am assigning the value e to daEvent so we can access/use/discuss it later. 
    // console.log(e) // printing e in the console.log
    popup
        .setLatLng(e.latlng) // setting the lat long to the popup object
        .setContent("You clicked the map at " + e.latlng.toString() + " and at Zoom " + e.sourceTarget._zoom) // making a popup with text based on values of e.
        .openOn(map);// placing the popup in the map. 
}

map.on('click', onMapClick); // creating a leaflet event listener
// it will listen for click events and when a click happens the function onMapClick will be called. 
// JS has the particularity that event listeners automatically pass the argument of the event to the function
// so in this case you do not have to write onMapClick(e), in fact that would not work.... i know this is weird. 
