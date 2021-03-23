
// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

function markerSize(mag) {
    return mag *3;
}

d3.json(queryUrl, function (data) {
    // console.log(data.features);
    createMap(data); 
});

function mapFeatures(data) {

}

function createMap(data) {
    // Define streetmap and darkmap layers
    let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    //This layer holds all the markers
    let eqLayer = L.geoJSON(data.features, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Place: ${feature.properties.place}<br>
                            Magnitude: ${feature.properties.mag}`);
        }
    });

    let overlayMaps = {
        "Earth Quakes": eqLayer
    };

// Define a baseMaps object to hold our base layers
    let baseMaps = {
    "Street Map": light,
    "Dark Map": darkmap,
    };

    // Create a new map
    let myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 3,
        layers: [light, eqLayer]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}

// data.forEach( eqPoint => {
//     L.circle(eqPoint.location, {
//         color:color,
//         fillColor: color,
//         fillOpacity: 0.5,
//         radius: Math.sqrt(eqpoint.points)*areaScale
//     }).addTo(myMap);
// });