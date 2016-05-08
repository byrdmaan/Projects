var map;
var geocoder; //= new google.maps.Geocoder();
var bounds;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var events;
var directionsService;
var directionsDisplay;
var currentLoc;
var eLocations = [];
var global_distances = [];
distanceCounter = 0;
var maxDistances = 20;


function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12
  });
  var bounds = new google.maps.LatLngBounds();
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  var pos;
  //var infoWindow = new google.maps.InfoWindow({map: map});
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setCurrentLoc(pos);
      //getDirections();
      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  //codeAddress("3072 SMU Blvd, Dallas, TX");
  //codeAddress("Dallas, TX");
  //codeAddress("klyde warren park, Dallas, TX");

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('dirPanel'));

  //codeAddressDistance("Houston, TX", "1");
  //codeAddressDistance("Austin, TX", "2");
  //codeAddressDistance("Houston,TX", "3");
  //getDistancesArray();


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function specialInit() {
  geocoder = new google.maps.Geocoder();
}

function codeAddressDistance(address,eid) {
    geocoder.geocode( { 'address': address}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        //map.setCenter(results[0].geometry.location);
        //addMarkerAddress(results[0].geometry.location, eventName);
        getDistance(results[0].geometry.location,eid);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}

function addMarkerAddress(position, eventName) {

        var marker;
        //var infoWindow = new google.maps.InfoWindow();

        //bounds.extend(position);
        var eventLabel = labels[labelIndex % labels.length];
        addListEvent(eventLabel, eventName);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            label: labels[labelIndex++ % labels.length],
            title: marker
        });
        marker.addListener('click', function() {
          //infowindow.open(map, marker);
        });

        //infoWindow.setContent(eventName);
        //infoWindow.open(map, marker);

        //map.fitBounds(bounds);
  }

  function addMarkerEvent(eEvent) {
    var eventName = eEvent.title;

    var myLatLng = {lat: parseFloat(eEvent.latitude), lng: parseFloat(eEvent.longitude)};
    eLocations[labelIndex] = myLatLng;
        var marker;
        //var infoWindow = new google.maps.InfoWindow();

        //bounds.extend(position);
        var eventLabel = labels[labelIndex % labels.length];
        addListEvent(eventLabel, eEvent);
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            label: labels[labelIndex++ % labels.length],
            title: marker
        });
        marker.addListener('click', function() {
          //labelIndex - 1;
          getDirections(eventLabel);
          $('html,body').scrollTop(0);
        });

        //infoWindow.setContent(eventName);
        //infoWindow.open(map, marker);

        //map.fitBounds(bounds);
  }

function addListEvent(eventLabel, eEvent) {
  //var eventTime = eEvent.start_time;
  //var eventVenue = eEvent.venue_name;

  var list = document.getElementById("eventsList");
  var eList = document.createElement("li");
  var eArticle = document.createElement("article");
  var eName = document.createElement("h6");

  var eDiv = document.createElement("div");
  var eImg = document.createElement("img");
  eImg.setAttribute("src", "img/marker.png");
  eImg.setAttribute("class", "marker");
  eDiv.appendChild(eImg);
  eDiv.setAttribute("class", "markerDiv");

  var labelSpan = document.createElement("span");
  labelSpan.setAttribute("class", "markerLabel");

  var eAnchor = document.createElement("a");
  eAnchor.setAttribute("href", "#");
  eAnchor.addEventListener("click", function() {
    getDirections(eventLabel);
  });

  eArticle.setAttribute("class", "box post-summary");
  var labelNode = document.createTextNode(eventLabel);
  var nameNode = document.createTextNode(eEvent.title);
  labelSpan.appendChild(labelNode);

  var br = document.createElement('br');
  var venueNode = document.createTextNode(eEvent.venue_name);
  var timeNode = document.createTextNode(eEvent.start_time);
  var infoSpan = document.createElement('span');
  infoSpan.appendChild(venueNode);
  infoSpan.appendChild(br);
  infoSpan.appendChild(timeNode);

  eAnchor.appendChild(nameNode);
  eDiv.appendChild(labelSpan);
  eName.appendChild(eAnchor);
  eArticle.appendChild(eDiv);
  eArticle.appendChild(eName);
  eArticle.appendChild(infoSpan);
  eList.appendChild(eArticle);
  list.appendChild(eList);

}

/*$(window).scroll(function() {

  console.log($("#footer").height());
  console.log($('#main-wrapper').height());
   //if($(window).scrollTop() + $(window).height() > $(document).height() - $("#footer").height()) {
  if($(window).scrollTop() + $(window).height() > $('#main-wrapper').height()) {
       $('#eventMap').addClass('fixed_map');
       var marHeight = $('#main-wrapper').height() - $('#map').height() - $('#footer').height();
       marHeight += 'px';
       console.log(marHeight);
       $('fixed_map').css('margin-top', marHeight);
   }else{
       $('#eventMap').removeClass('fixed_map');
   }
});*/

function getDirections(eLabel) {
  var index = eLabel.charCodeAt(0) - 65;
  calculateAndDisplayRoute(eLocations[index]);
}

function calculateAndDisplayRoute(eLocation) {
  directionsService.route({
    origin: currentLoc,
    destination: eLocation,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      showPanel();
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function showPanel() {
  $("#eventMap").css("position", "relative");
  $("#dirPanel").css("display", "block");
  $("#map").css("display", "none");
}

function hidePanel() {
    document.getElementById('eventMap').style.position = 'fixed';
    document.getElementById("dirPanel").style.display = "none";
    document.getElementById("map").style.display = "block";
    map.setCenter(currentLoc);
    map.setZoom(12);
}

function setCurrentLoc(pos) {
  currentLoc = pos;
}

function getDistance(dest,eid) {

  var pos;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      setDistance(pos, dest, eid);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


}

function setDistance(pos, dest, eid) {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [pos],
      destinations: [dest],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      /*transitOptions: TransitOptions,
      drivingOptions: DrivingOptions,
      avoidHighways: Boolean,
      avoidTolls: Boolean,*/
    }, callback);

function callback(response, status) {
  if (status == google.maps.DistanceMatrixStatus.OK) {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

      var results = response.rows[0].elements;
      var element = results[0];
      var distance = element.distance.text;
      //console.log(distance);
      //distance[distanceCounter] = distance;
      addDistance(distance,eid);
      distanceCounter++;

    }
  }

}
//{"123 mi": {"eid1", "eid2"}, "1 mi": {"eid3"}, }
/*
var distances = []
{distance: "123 mi"
ids: []}
*/
function addDistance(distance,eid) {
  distance = distance.slice(0, -3);
  var exists = false;
  for(var i = 0; i < global_distances.length; i++) {
    if(distance == global_distances[i].distance) {
      exists = true;
      global_distances[i].ids.push(eid);
      break;
    }
  }

  if(exists == false) {
    global_distances.push({
      distance: distance,
      ids: [eid]
    });
  }
}

function getDistancesArray() {
  console.log(global_distances);
  return global_distances;
}

function distancesDone() {
  if(distanceCounter >= maxDistances-1) {
    return true;
  }
  else {
    return false;
  }
}
