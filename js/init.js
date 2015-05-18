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
var specialTrackData;
var showLabels = true;
var focusURL = '';
var focusID = '';

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
    popupAnchor: [0, -0.5 * markerSize],
    className: 'passEvent'
  });

  var GEOJSONoptions = {
    pointToLayer: function (feature, latlng) {
      var icon = feature.properties.icon;
      var iconObj;
      var iconSize = ICON_SIZE;
      var zIndex = 10000;
      if (icon && icon != 'null' && !(feature.properties && feature.properties.type === 'targetLocation')) {
        if (feature.properties && feature.properties.type === 'currentLocation' && feature.properties.minutesRemaining !== undefined) {
          iconObj = L.icon({
            iconUrl: './images/icons/' + feature.properties.icon,
            iconSize: [iconSize, iconSize],
            iconAnchor: [0.5 * iconSize, iconSize],
            popupAnchor: [0, -0.5 * iconSize],
            labelAnchor: [0.5*iconSize-5,-0.5*iconSize]
          });
        }
        else {
          iconObj = L.icon({
            iconUrl: './images/icons/' + feature.properties.icon,
            iconSize: [iconSize, iconSize],
            iconAnchor: [0.5 * iconSize, iconSize],
            popupAnchor: [0, -0.5 * markerSize],
            labelAnchor: [0.5*iconSize-5,-0.5*iconSize],
            className: 'passEvent'
          });
        }
      }
      else {
        zIndex = 50000;
        iconObj = marker;
      }
      return L.marker(latlng, {icon: iconObj, zIndexOffset: zIndex});
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.type === 'currentLocation' && feature.properties.minutesRemaining !== undefined) {
        if (showLabels === true) {
          var label = feature.id;
          label += " <br>ETA: " + feature.properties.minutesRemaining + ' mins';
          layer.bindLabel(label, {noHide: true}).showLabel();
        }
        layer.on("click",function() {
          getSpecialTrackURL(feature.id);
          getSpecialTrack();
        })
      }
      else if (feature.properties && feature.properties.type === 'currentLocation') {
        // stop showing path when arrived
        if (focusID === feature.id) {
          clearSpecialTrack();
        }
      }
    },
    opacity: 0.8,
    color: '#ff0000',
    weight:8,
    className:'top'
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

  map.on('click',function() {clearSpecialTrack();})

  poiGeoData = L.geoJson(undefined, POIoptions).addTo(map);
  geoJsonTrackData = L.geoJson(undefined, GEOJSONoptions).addTo(map);
  specialTrackData = L.geoJson(undefined, GEOJSONoptions).addTo(map);

  setSource(DEFAULT_INITIAL_MODE);
};


function getDataPOI() {
  var poiURL;
  if (MODE === 'Local') {
    poiURL = LOCAL_POI;
  }
  else {
    poiURL = CLOUD_POI;
  }
  loadJSON(poiURL, function (data) {
    document.getElementById('errorSpan').innerHTML = '';
    poiGeoData.clearLayers();
    poiGeoData.addData(data);
    setTimeout(getDataPOI, POI_INTERVAL);
  },function () {
    document.getElementById('errorSpan').innerHTML = 'Could not connect to datasource for the POI';
    setTimeout(getDataPOI, POI_INTERVAL);
  });
}



function getDataGEO() {
  var geojsonURL;
  if (MODE === 'Local') {
    geojsonURL = LOCAL_GEOJSON;
  }
  else {
    geojsonURL = CLOUD_GEOJSON;
  }
  // get the focus updated as well.
  loadJSON(geojsonURL, function (data) {
    getSpecialTrack(function() {
      document.getElementById('errorSpan').innerHTML = '';
      geoJsonTrackData.clearLayers();
      geoJsonTrackData.addData(data);
      setTimeout(getDataGEO, GEO_INTERVAL);
    });
  }, function () {
    document.getElementById('errorSpan').innerHTML = 'Could not connect to datasource for the GEOJSON';
    setTimeout(getDataGEO, GEO_INTERVAL);
  });
}

function getSpecialTrackURL(id) {
  if (MODE === 'Local') {
    focusURL = LOCAL_GEOJSON_TRACK_TEMPLATE.replace("$$ID$$",id);
  }
  else {
    focusURL = CLOUD_GEOJSON_TRACK_TEMPLATE.replace("$$ID$$",id);
  }
  focusID = id;
}

function getSpecialTrack(finishedFunction) {
  if (finishedFunction === undefined) {
    finishedFunction = function() {};
  }
  if (focusURL !== '') {
    loadJSON(focusURL, function (data) {
      document.getElementById('errorSpan').innerHTML = '';
      specialTrackData.clearLayers();
      specialTrackData.addData(data);
      finishedFunction();
    }, function () {
      document.getElementById('errorSpan').innerHTML = 'Could not connect to datasource for focus';
      finishedFunction();
    });
  }
  else {
    finishedFunction();
  }
}


function clearSpecialTrack() {
  specialTrackData.clearLayers();
  focusURL = '';
  focusID = '';
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
