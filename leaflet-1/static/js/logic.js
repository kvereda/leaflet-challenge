// map
var myMap = L.map('mapid', {
  center: [45.52, -122.67],
  zoom: 13
});

// tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// console.log(queryUrl);

// data
d3.json(queryUrl, function(data) {
//     createFeature(data.features);
// });
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }// end of styleInfo

  // marker magnitude color
  function getColor(magnitude) {
    switch (true) {
    case magnitude < 5:
      return "#ea2c2c";
    case magnitude > 4:
      return "#ea822c";
    case magnitude > 3:
      return "#ee9c00";
    case magnitude > 2:
      return "#eecc00";
    case magnitude > 1:
      return "#d4ee00";
    default: 
      return "#98ee00";
    }
  }

  // // marker size
  function getRadius(magnitude) {
    if (magnitude ===0) {
      return 1;
    }
    return magnitude * 4;
  }

  // GeoJson layer
  L.geoJson(data, {

    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
    },
        
    style: styleInfo,
    // binding a pop-up to each layer 
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(myMap);//end of geoJson layer

  //  set up legend
  var legend = L.control({
    position: "bottomright"
  });
    
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var mag  = [0, 1, 2, 3, 4, 5];
    var markerColor = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
            
    for (var i = 0; i < mag.length; i++) {
      div.innerHTML +=
        "<i style='background: " + markerColor[i] + "'></i> " + mag[i] + (mag[i + 1] ? "&ndash;" + mag[i + 1] + "<br>" : "+");
    }
    return div;
  };

  legend.addTo(myMap);//end of legend

  // function createFeatures(earthquakeData) {

    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

    // }
    // var earthquakes = L.geoJSON(earthquakeData, {
    //     onEachFeature: onEachFeature
    //   })
      
    // createMap(earthquakes);
// }// end of function createFeatures
    
// function createMap(earthquakes) {
//     var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//     });
//     var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "dark-v10",
//         accessToken: API_KEY
//     });

//   // Define a baseMaps object to hold our base layers
//     var baseMaps = {
//         "Street Map": streetmap,
//         "Dark Map": darkmap
//     };

//     var overlayMaps = {
//         Earthquakes: earthquakes
//     };

//     var myMap = L.map("map", {
//         center: [
//           45.52, -122.67
//         ],
//         zoom: 13,
//         layers: [streetmap, earthquakes]
//     });
      
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//       }).addTo(myMap);   
    
// }// end of function createMap

}); 