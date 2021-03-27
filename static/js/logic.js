
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

function markerSize(mag) {
    return mag * 50000;
}

function markerColor(magnitude) {
    if (magnitude <= 1) {
        return "#800026";
    } else if (magnitude <= 2) {
        return "#BD0026";
    } else if (magnitude <= 3) {
        return "#E31A1C";
    } else if (magnitude <= 4) {
        return "#FC4E2A";
    } else if (magnitude <= 5) {
        return "#FD8D3C";
    } else {
        return "#FEB24C";
    };
}

//Query the URL
d3.json(queryUrl, function (data) {
    console.log(data.features);
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

    let streetLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

    //This layer holds all the markers
    // let eqLayer = L.geoJSON(data.features, {
    //     onEachFeature: function(feature, layer) {
    //         layer.bindPopup(`Place: ${feature.properties.place}<br>
    //                         Magnitude: ${feature.properties.mag}`);
    //     }
    var eqLayer = L.layerGroup()


    let overlayMaps = {
        "Earth Quakes": eqLayer
    };


    // Define a baseMaps object to hold our base layers
    let baseMaps = {
        "Light Layer": light,
        "Dark Map": darkmap,
        "Street Layer": streetLayer
    };

    // Create map
    let myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 3,
        layers: [light, eqLayer]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);
    for (var i = 0; i < data.features.length; i++) {
        var coordinates = data.features[i]['geometry']['coordinates']
        var magnitude = data.features[i]['properties']['mag']
        var eqData = []
        eqData.push(L.circle([coordinates[1], coordinates[0]], {
            stroke: true,
            color: markerColor(magnitude),
            weight: 1,
            radius: markerSize(magnitude)
        }).bindPopup(`<h1> ${data.features[i]['properties']['place']}</h1><br>
        <h1> Magintude: ${magnitude}</h1>`)
        .addTo(eqLayer))
    }

    let legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h3> Magnitude Legend </h3>'
    let magnitudes = [0,1,2,3,4,5].
    labels - [];
    colors = ["#800026","#BD0026","#E31A1C", "#FC4E2A","#FD8D3C","#FEB24C"]
    for (let i=0; i < magnitudes.length; i++) {
        div.innerHTML+=`<svg class= "legstyle" style = "background: ${colors[i]}"> </svg> <p> ${magnitudes[i]} - ${magnitudes[i+1]} </p>`
    }
    return div;
}

// Adding legend to the map
legend.addTo(myMap);

};



