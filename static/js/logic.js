//Create inital map
// let myMap = L.map("map", {
//     center: [37.7749, -122.4194],
//     zoom: 5
// });

// let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
// attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
// maxZoom: 18,
// id: "light-v10",
// accessToken: API_KEY
// }).addTo(myMap);


//Add the tile layer
// let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     zoomOffset: 18,
//     id: "mapbox/streets-v9",
//     accessToken: API_KEY
// }).addTo(myMap);

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl, function (data) {
    console.log(data.features);
    createMap(data); 
});

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
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`Place: ${feature.properties.place}<br>
                        Time: ${new Date(feature.properties.time)}<br>
                        Magnitude: ${feature.properties.mag}`);
        }
    });

// Define a baseMaps object to hold our base layers
    let baseMaps = {
    "Street Map": light,
    "Dark Map": darkmap,
    "Earth Quakes": eqLayer
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