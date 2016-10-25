// Darken Overlay

var darkenOverlay = document.getElementById('darken-overlay');

// Fly Now Button

$('.fly-now-button').click(function (event) {
    event.preventDefault();
    map.closePopup();

    if (map.hasLayer(droneRangesLayer)) {
      map.removeLayer(droneRangesLayer);
    }

    if (map.hasLayer(flightPathLayer)) {
        // $(this).removeClass('selected');
        // map.removeLayer(droneRangesLayer);
        map.removeLayer(flightPathLayer);

        darkenOverlay.style.opacity = '0';
        $('.fly-now-button-text').text('Fly Now');
        $('.fly-now-button-text').css('color', waterBlue);

        this.style.backgroundColor = 'white';
    } else {
        // map.addLayer(droneRangesLayer);

        map.addLayer(flightPathLayer);
        map.fitBounds(flightPath.getBounds(), {paddingTopLeft: [330, 0]});

        darkenOverlay.style.opacity = '1';
        $('.fly-now-button-text').text('Confirm');
        $('.fly-now-button-text').css('color', 'white');
        this.style.backgroundColor = waterBlue;

        // $(this).addClass('selected');
   }
});

// INITIALIZE COLOURS

// var grapefruit = '#ff5b5b';
var waterBlue = '#0a9ac7';
var sky = '#89d8f9';

// INITIALIZE MAP
// ====================================================================================

var map = L.map('mapid', {
  zoomControl: false,
  center: [44.175, -79.48],
  zoom: 14,
  layers: droneRangesLayer
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);

L.control.zoom({
 position: 'bottomright'
}).addTo(map);

// INITIALIZE MARKERS
// ====================================================================================

// Icons
// --------------------------------------------------------------
var alertIcon = L.icon({
iconUrl: './dist/images/alert-marker@2x.png',
iconSize: [40, 41], // size of the icon
iconAnchor: [20, 20] // point of the icon which will correspond to marker's location

});

var dockIcon = L.icon({
iconUrl: './dist/images/dock@2x.png',
iconSize:   [46, 55], // size of the icon
iconAnchor: [23, 27.5] // point of the icon which will correspond to marker's location

});

var droneIcon = L.icon({
iconUrl:  './dist/images/drone@2x.png',
iconSize:   [30, 29], // size of the icon
iconAnchor: [15, 17] // point of the icon which will correspond to marker's location

});

// Marker Creation
// --------------------------------------------------------------
var alerts = [
  [44.180, -79.480],
  [44.170, -79.485]
];

var docks = [
    [44.1682151, -79.4655632]
];

var drones = [
    [44.1682151, -79.4655632]
];

var alertMarkers = [];
var droneMarkers = [];
var dockMarkers = [];

docks.forEach(function (dock, index) {
  dockMarkers.push(L.marker(dock, {icon: dockIcon}).addTo(map));
});

drones.forEach(function (drone, index) {
  droneMarkers.push(L.marker(drone, {icon: droneIcon}).addTo(map));
});

var alertPopupContent = ['This is an alert!', 'And this is another one!'];
  alerts.forEach(function (alert, index) {
  alertMarkers.push(L.marker(alert, {icon: alertIcon}).addTo(map));
  alertMarkers[index].bindPopup(alertPopupContent[index]);
});

// LAYER CREATION
// --------------------------------------------------------------

var droneRange = L.circle([44.1682151, -79.4655632], {
  color: waterBlue,
  fillColor: sky,
  fillOpacity: 0.4,
  radius: 2000
});

var latlngs = [
    [44.1682151, -79.4655632],
    [44.180, -79.480],
    [44.170, -79.485],
    [44.1682151, -79.4655632]
];
var flightPath = L.polyline(latlngs, {color: sky});

var droneRangesLayer = L.layerGroup([droneRange]);

var flightPathLayer = L.layerGroup([flightPath]);

// Marker Behaviour
// --------------------------------------------------------------

// dockMarkers.forEach(function(marker,index){
//   marker.on('click', onDockMarkerClick);
// });

droneMarkers.forEach(function (marker, index) {
  marker.on('click', onDroneMarkerClick);
});

// Alert Marker & Panel Behaviour
alertMarkers.forEach(function (marker, index) {
  marker.on('click', onAlertMarkerClick);
});

$('#alert1').click(function (e) {
  event.preventDefault();
  map

     .setView(alerts[0], 15, {animate: true});
      alertMarkers[0].openPopup();
});

$('#alert2').click(function (e) {
  event.preventDefault();
  map
     .setView(alerts[1], 15, {animate: true});
     alertMarkers[1].openPopup();
});

map.on('click', onMapClick);
//
// function onDockMarkerClick (e) {
//   onMarkerClick(e);
// }

function onDroneMarkerClick (e) {
  // onMarkerClick(e);
  if (map.hasLayer(droneRangesLayer)) {
    map.removeLayer(droneRangesLayer);
  } else {
    droneRangesLayer.addTo(map);
  }
}

function onAlertMarkerClick (e) {
  onMarkerClick(e);
  if (map.hasLayer(droneRangesLayer)) {
    map.removeLayer(droneRangesLayer);
  }
}

function onMarkerClick (e) {
 map
    .setView(e.latlng, 15, {animate: true});
  }

function onMapClick (e) {
  if (map.hasLayer(droneRangesLayer)) {
    map.removeLayer(droneRangesLayer);
  }
  if (map.hasLayer(flightPathLayer)) {
    map.removeLayer(flightPathLayer);
  }
  map.setZoom(14);
  darkenOverlay.style.opacity = '0';

  $('.fly-now-button-text').text('Fly Now');
  $('.fly-now-button-text').css('color', waterBlue);
  $('.fly-now-button').css('background-color', 'white');
}
