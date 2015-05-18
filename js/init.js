//
//eve.system.init({
//  transports: [
//    {
//      type: 'http'
//    }
//  ]
//});
//
//var proxy = new proxyAgent("proxy");
//
//proxy.rpc.request(EVE_ADDRESS, {method:'test',params:{a:1,b:4}}).done(function (reply) {console.log(reply);});

var poiGeoData;
var geoJsonTrackData;

function drawMap() {
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map('map', {zoomAnimation: false}).setView([43.600344, 1.43194], 13);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  var markerSize = 40;
  var marker = L.icon({
    iconUrl: './images/icons/Map-Marker-Ball-Azure-icon.png',
    iconSize: [markerSize, markerSize],
    iconAnchor: [0.5 * markerSize, markerSize],
    popupAnchor: [0, -0.5 * markerSize]
  });

  var options = {
    pointToLayer: function (feature, latlng) {
      var icon = feature.properties.icon;
      var iconObj;
      var iconSize = 50;
      if (icon && icon != 'null') {
        iconObj = L.icon({
          iconUrl: './images/icons/' + feature.properties.icon,
          iconSize: [iconSize, iconSize],
          iconAnchor: [0.5 * iconSize, iconSize],
          popupAnchor: [0, -0.5 * markerSize]
        });
      }
      else {
        iconObj = marker;
      }
      return L.marker(latlng, {icon: iconObj, zIndexOffset: 10000});
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.type === 'currentLocation' && feature.properties.minutesRemaining !== undefined) {
        var label = feature.id;
        label += " <br>ETA: " + feature.properties.minutesRemaining + ' mins';
        layer.bindLabel(label, {noHide: true}).showLabel();
      }
    }
  }

  var POIoptions = {
    pointToLayer: function (feature, latlng) {
      var icon = feature.properties.icon;
      var iconObj;
      var iconSize = 50;
      if (icon && icon != 'null') {
        iconObj = L.icon({
          iconUrl: './images/icons/' + feature.properties.icon,
          iconSize: [iconSize, iconSize],
          iconAnchor: [0.5 * iconSize, iconSize],
          popupAnchor: [0, -0.5 * markerSize]
        });
      }
      else {
        iconObj = marker;
      }
      return L.marker(latlng, {icon: iconObj, zIndexOffset: 0});
    },
    onEachFeature: function (feature, layer) {
      if (feature && feature.id !== undefined) {
        var label = feature.id;
        if (feature.id === "") {
          label = "no name supplied."
        }
        layer.bindPopup(label);
      }
    }
  }


  poiGeoData = L.geoJson(undefined, POIoptions).addTo(map);
  geoJsonTrackData = L.geoJson(undefined, options).addTo(map);

  setSource(DEFAULT_INITIAL_MODE);
};

function getDataPOI() {
  var poiURL;
  console.log('getPOI')
  if (MODE === 'Local') {
    poiURL = LOCAL_POI;
  }
  else {
    poiURL = CLOUD_POI;
  }
  loadJSON(poiURL, function (data) {
    poiGeoData.clearLayers();
    poiGeoData.addData(data);
    setTimeout(getDataPOI, POI_INTERVAL);
  });

}


function getDataGEO() {
  console.log('getGEO')
  var geojsonURL;
  if (MODE === 'Local') {
    geojsonURL = LOCAL_GEOJSON;
  }
  else {
    geojsonURL = CLOUD_GEOJSON;
  }
  loadJSON(geojsonURL, function (data) {
    geoJsonTrackData.clearLayers();
    geoJsonTrackData.addData(data);
    setTimeout(getDataGEO, GEO_INTERVAL);
  });

}

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText), path);
      }
      else {
        if (error === undefined) {
          console.error("ERROR:", path)
        }
        else {
          error();
        }
      }
    }
  };
  xhr.open("GET", path, true);

  xhr.send();
}

function setSource(source) {
  if (source === 'Cloud' || source === 'Local') {
    MODE = source;
    document.getElementById('usingSpan').innerHTML = 'Currently using: ' + source;
    getDataPOI();
    getDataGEO();
  }
  else {
    console.error("Only allowed source strings are: Cloud and Local");
  }
}
