// global vars
var poiGeoData;
var geoJsonTrackData;
var specialTrackData;
var showLabels = true;
var focusURL = '';
var focusID = '';
var globalPopup = undefined;
var POIglobalPopup = undefined;;


/**
 * Draw the map, this is done once. The config for how the json is loaded is also in here.
 */
function drawMap() {
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map('map', {zoomAnimation: false}).setView([43.600344, 1.43194], 13);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  // setup default marker icon
  var marker = L.icon({
    iconUrl: './images/icons/Map-Marker-Ball-Azure-icon.png',
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [0.5 * PIN_SIZE, PIN_SIZE],
    popupAnchor: [0, -0.5 * PIN_SIZE],
    className: 'passEvent'
  });

  // options on how to parse the geojson input
  var GEOJSONoptions = {
    pointToLayer: function (feature, latlng) {
      var icon = feature.properties.icon;
      var iconObj;
      var zIndex = 10000; // want this to be high.
      if (icon && icon != 'null' && !(feature.properties && feature.properties.type === 'targetLocation')) {
        var iconConfig = {
          iconUrl: './images/icons/' + feature.properties.icon,
          iconSize: [ICON_SIZE, ICON_SIZE],
          iconAnchor: [0.5 * ICON_SIZE, ICON_SIZE],
          popupAnchor: [0, -0.5 * ICON_SIZE],
          labelAnchor: [0.5*ICON_SIZE-5,-0.5*ICON_SIZE],
          //className: 'passEvent'
        }

        // if this thing is driving it will get a click event otherwise it has to propagate the event.
        //if (feature.properties && feature.properties.type === 'currentLocation' && feature.properties.minutesRemaining !== undefined) {
        //  delete iconConfig.className;
        //}

        iconObj = L.icon(iconConfig);
      }
      else {
        // markers are over icons.
        zIndex = 50000;
        iconObj = marker;
      }
      return L.marker(latlng, {icon: iconObj, zIndexOffset: zIndex});
    },
    onEachFeature: function (feature, layer) {
      // bind events, labels and popups to features
      var etaLabel = undefined;
      if (feature.properties && feature.properties.type === 'currentLocation' && feature.properties.minutesRemaining !== undefined) {
        if (showLabels === true) {
          etaLabel = " <br>ETA: " + feature.properties.minutesRemaining + ' mins';
          if (focusID !== feature.id) {
            layer.bindLabel(feature.id + etaLabel, {noHide: true});
          }
        }

        // there can be multiple click events on a single item.
        layer.on("click",function() {
          focusID = feature.id;
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

      // popup is combined of multiple stages, the label is not shown when the popup is to clean the gui.
      var popupLabel = 'id:' + feature.id;
      if (feature.properties && feature.properties.taskTitle) {
        popupLabel += "<br />title:" + feature.properties.taskTitle;
      }
      if (feature.properties && feature.properties.taskStep) {
        popupLabel += "<br />step:" + feature.properties.taskStep;
      }
      if (etaLabel) {
        popupLabel += "<br />" + etaLabel;
      }

      // if the feature is selected, we set the globalPopup because we cannot open the popup here. It also makes it persistent.
      if (focusID === feature.id) {
        globalPopup = layer.bindPopup(popupLabel, {closeButton:false});
      }
      else {
        layer.bindPopup(popupLabel, {closeButton:false});
      }

      // set the focusID and hide the label.
      layer.on("click",function() {
        focusID = feature.id;
        layer.hideLabel();
      });
    },
    // options for the path
    opacity: 0.8,
    color: '#ff0000',
    weight:8,
    className:'top' // not really doing anything?
  }

  // options on how to load the POI data.
  var POIoptions = {
    pointToLayer: function (feature, latlng) {
      var icon = feature.properties.icon;
      var iconObj;
      var iconSize = ICON_SIZE_POI;
      if (icon && icon != 'null') {
        if (feature.properties.icon === 'firedpt_building.png' || feature.properties.icon === 'hospital_building.png' || feature.properties.icon === 'police_building.png') {
          iconSize = ICON_SIZE_POI_ALMENDE;
        }
        iconObj = L.icon({
          iconUrl: './images/icons/' + feature.properties.icon,
          iconSize: [iconSize, iconSize],
          iconAnchor: [0.5 * iconSize, iconSize],
          popupAnchor: [0, -0.5 * iconSize]
        });
      }
      else {
        iconObj = marker;
      }
      return L.marker(latlng, {icon: iconObj, zIndexOffset: 0});
    },
    onEachFeature: function (feature, layer) {
      // setup popups
      if (feature && feature.id !== undefined) {
        var label = feature.id;
        if (feature.id === "") {
          label = "no name supplied."
        }

        // this is for persistent popups over refreshes.
        if (feature.id === "" || feature.id !== focusID) {
          layer.bindPopup(label);
        }
        else {
          POIglobalPopup = layer.bindPopup(label);
        }

        // we require and ID for this.
        if (feature.id !== "") {
          layer.on('click', function () {
            focusID = feature.id;
          })
        }
      }
    }
  }

  // remove track on click anywhere else.
  map.on('click',function() {clearSpecialTrack(); globalPopup = undefined; POIglobalPopup = undefined; focusID = '';});

  // bind empty geoJSON layers to map.
  poiGeoData = L.geoJson(undefined, POIoptions).addTo(map);
  geoJsonTrackData = L.geoJson(undefined, GEOJSONoptions).addTo(map);
  specialTrackData = L.geoJson(undefined, GEOJSONoptions).addTo(map);

  // get the data.
  setSource(DEFAULT_INITIAL_MODE);
};


function setSource(source) {
  if (source === 'Cloud' || source === 'Local') {
    MODE = source;
    document.getElementById('usingSpan').innerHTML = 'Currently using: ' + source;
    getDataPOI();
    getDataGEO();
  }
  else {
    console.error("Only allowed source strings are: 'Cloud' and 'Local'");
  }
}

/**
 * get the POI data.
 */
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
    if (POIglobalPopup) {
      POIglobalPopup.openPopup();
    }
    setTimeout(getDataPOI, POI_INTERVAL);
  },function () {
    document.getElementById('errorSpan').innerHTML = 'Could not connect to datasource for the POI';
    setTimeout(getDataPOI, POI_INTERVAL);
  });
}


/**
 * get the GEOJSON data
 */
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
      if (globalPopup) {
        globalPopup.openPopup();
      }
      setTimeout(getDataGEO, GEO_INTERVAL);
    });
  }, function () {
    document.getElementById('errorSpan').innerHTML = 'Could not connect to datasource for the GEOJSON';
    setTimeout(getDataGEO, GEO_INTERVAL);
  });
}


/**
 * Get the URL for the path visualization, we call this the 'focus'
 * @param id --> ID of the feature
 */
function getSpecialTrackURL(id) {
  if (MODE === 'Local') {
    focusURL = LOCAL_GEOJSON_TRACK_TEMPLATE.replace("$$ID$$",id);
  }
  else {
    focusURL = CLOUD_GEOJSON_TRACK_TEMPLATE.replace("$$ID$$",id);
  }
}


/**
 * Get the focus track if needed. The finished function is here so we get the same positions for the overlapping cars.
 * @param finishedFunction
 */
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

/**
 * remove focus
 */
function clearSpecialTrack() {
  specialTrackData.clearLayers();
  focusURL = '';
}


/**
 * load online json file
 * @param path  --> URL
 * @param success --> function
 * @param error --> function
 */
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

