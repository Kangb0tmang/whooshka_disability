var map;
var zoomLevel = 16;
var melbourne = {lat: -37.8136, lng: 144.9631};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoomLevel,
    center: melbourne,
    gestureHandling: 'greedy'
  });

  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      icon: './public/images/general_carspot_icon.png'
    });
  });
  var options =  {
    minimumClusterSize: 3,
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',

  };
  var markerCluster = new MarkerClusterer(map, markers, options);
}

var allDisabledSpots = [];
filteredSpots.forEach(function(disSpot) {
  var spotBayId = disSpot.bayid;
  allDisabledSpots.push({bay_id: spotBayId});
});

var locations = [];
carSpots.forEach(function(carspot){
  var latitude = carspot.lat;
  var longitude = carspot.lon;
  locations.push({lat: parseFloat(latitude), lng: parseFloat(longitude)});
});

var showDisabledSpots = [];
carSpots.forEach(function(spot){
  allDisabledSpots.forEach(function(disabled) {
    if (disabled.bay_id === spot.bay_id) {
      var latitude = spot.lat;
      var longitude = spot.lon;
      showDisabledSpots.push({lat: parseFloat(latitude), lng: parseFloat(longitude)});
    }
  });
});

function redrawDisabledSpots(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoomLevel,
    center: melbourne,
    gestureHandling: 'greedy'
  });

  var disabledMarkers = showDisabledSpots.map(function(disabledSpot, i) {
    return new google.maps.Marker({
      position: disabledSpot,
      icon: './public/images/disabled_carspot_icon.png'
    });
  });
  var markerCluster = new MarkerClusterer(map, disabledMarkers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
