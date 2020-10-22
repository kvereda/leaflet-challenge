// USGS url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

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
}//end of color

// marker size
function getRadius(magnitude) {
  if (magnitude ===0) {
    return 1;
  }
    return magnitude * 4;
}//end of size

// data
d3.json(queryUrl, function(data) {

    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // geoJson
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature : function (feature, layer) {

    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    },     
    
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.properties.mag),
        fillOpacity: 1,
        stroke: false,
    })
  }
  });//end of geoJson


  // map creation
  createMap(earthquakes);
}//end of createmap 

// map & layers
function createMap(earthquakes) {     

  var satelitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var baseMaps = {
    "Satelite Map": satelitemap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map('mapid', {
    center: [45.52, -122.67],
    zoom: 5,
    layers: [satelitemap,earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  //  set up legend
  var legend = L.control({position: "bottomright"});
    
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var mag  = [0, 1, 2, 3, 4, 5];
    var getColor = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
            
    for (var i = 0; i < mag.length; i++) {
      div.innerHTML +=
        "<i style='background: " + getColor(magnitudes[i] + 1) + '"></i> ' + 
        + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
    }
    return div;
  };

  legend.addTo(myMap);//end of legend
}