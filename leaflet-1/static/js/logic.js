var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 13
    });
  
  
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken: pk.eyJ1Ijoia3ZlcmVkYSIsImEiOiJja2Z3eDIybWQxYnFmMnhxZnRzd2M1OGpjIn0.11gCjeUvWpq29v48perO9w
    }).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

console.log(queryUrl);

d3.json(queryUrl, function(data) {

function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: markerColor(feature.properties.mag),
        color: "#000000",
        radius: markerSize(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}
// marker size
function markerSize(mag)
    return mag *4
// marker color
function markerColor(mag) {
    if (mag < 5){
        return "#ea2c2c"
    }
    else if (mag > 4){
        return "#ea822c"
    }
    else if (mag > 3){
        return "#ee9c00"
    }
    else if (mag > 2){
        return "#eecc00"
    }
    else if (mag > 1){
        return "#d4ee00"
    }
    else {
        return "#98ee00"
    }
}
// GeoJson layer
    L.geoJson(data, {

        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        
        style: styleInfo,
        //binding a pop-up to each layer 
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place
        
        }
    }).addTo(myMap);
    
    
    //  set up legend
    var legend = L.control({position: "bottomright"});
    
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var mag  = [0, 1, 2, 3, 4, 5];
        var markerColor = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"];
            
        for (var i = 0; i < mag.length; i++) {
            div.innerHTML +=
                "<i style='background: " + markerColor[i] + "'></i> " + mag[i] + (mag[i + 1] ? "&ndash;" + mag[i + 1] + "<br>" : "+");
        }
        return div;
    };

    legend.addTo(myMap);

    });        