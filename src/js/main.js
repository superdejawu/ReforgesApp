$(".fly-now-button").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(droneRangesLayer)) {
        // $(this).removeClass('selected');
        map.removeLayer(droneRangesLayer);
    } else {
        map.addLayer(droneRangesLayer);
        // $(this).addClass('selected');
   }
});



//INITIALIZE COLOURS
var grapefruit = '#ff5b5b';
var waterBlue = '#0a9ac7';
var sky = '#89d8f9';

//INITIALIZE MAP
//====================================================================================

var map = L.map('mapid', {
  zoomControl:false,
  center: [51.505, -0.09],
  zoom: 13,
  layers: droneRangesLayer
  })


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(map);


L.control.zoom({
 position:'bottomright'
}).addTo(map);



//INITIALIZE MARKERS
//====================================================================================

//Icons
//--------------------------------------------------------------
var alertIcon = L.icon({
iconUrl: './dist/images/alert-marker@2x.png',
iconSize:     [40, 41], // size of the icon
iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location

});

var dockIcon =  L.icon({
iconUrl: './dist/images/dock@2x.png',
iconSize:     [46, 55], // size of the icon
iconAnchor:   [23, 27.5], // point of the icon which will correspond to marker's location

});

var droneIcon =  L.icon({
iconUrl: './dist/images/drone@2x.png',
iconSize:     [30, 29], // size of the icon
iconAnchor:   [15, 17], // point of the icon which will correspond to marker's location

});

//Marker Creation
//--------------------------------------------------------------
var alerts = [
  [51.5,-0.07],
  [51.518, -0.06]
];

var docks = [
    [51.52, -0.09]
];

var drones = [
    [51.52, -0.09]
];

var alertMarkers=[];
var droneMarkers=[];
var dockMarkers = [];

docks.forEach(function(dock, index){
  dockMarkers.push(L.marker(dock, {icon:dockIcon}).addTo(map));
});

drones.forEach(function(drone, index){
  droneMarkers.push(L.marker(drone, {icon:droneIcon}).addTo(map));
});


alerts.forEach(function(alert, index){
  alertMarkers.push(L.marker(alert, {icon:alertIcon}).addTo(map));
});


//Layer Creation
//--------------------------------------------------------------


var droneRange = L.circle([51.52, -0.09], {
  color: waterBlue,
  fillColor: sky,
  fillOpacity: 0.4,
  radius: 1000
});

var droneRangesLayer = L.layerGroup([droneRange]);



//Marker Behaviour
//--------------------------------------------------------------

// dockMarkers.forEach(function(marker,index){
//   marker.on('click', onDockMarkerClick);
// });

droneMarkers.forEach(function(marker,index){
  marker.on('click', onDroneMarkerClick);
});

alertMarkers.forEach(function(marker,index){
  marker.on('click', onAlertMarkerClick);
});
//
function onDockMarkerClick(e){
  onMarkerClick(e);
}

function onDroneMarkerClick(e){
  onMarkerClick(e);
  droneRangesLayer.addTo(map);
}

function onAlertMarkerClick(e){
  onMarkerClick(e);
}


function onMarkerClick(e) {
 map
    .setView(e.latlng,14,{animate:true});
  }
