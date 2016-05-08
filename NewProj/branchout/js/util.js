$(document).ready(function() {
  //Load static stuff
  var scripts = ["assets/js/jquery.dropotron.min.js", "assets/js/skel.min.js",
                "assets/js/skel-viewport.min.js", "assets/js/util.js", "assets/js/main.js"];
  for(var s in scripts)
    $('<script src=\"' + scripts[s] + '\"></script>').appendTo('head');

  //Load dynamic stuff
  $.when(
      $.getScript( "js/userExperience.js"),
      $.getScript("js/accounts.js"),
      $.getScript( "js/validation.js" ),
      $.getScript("js/search.js"),
      $.getScript("js/sortandfilter.js"),
      $.Deferred(function( deferred ){
          $( deferred.resolve );
      })
  ).done(function(){
      set_nav();

      if($("body.createEvent").length > 0)
        $.getScript("js/manageEvents.js");

      //Covers login, register, and profile pages
      if($("body.profile").length > 0 || $("body.register").length > 0 || $("body.login").length > 0) {
        $.getScript("js/accounts.js", function() {
          if($("body.profile").length > 0) {
            $.getScript("js/profile.js", function () {
              get_profile();
            });
          }
        });
      }

      //Covers editEvent, myEvents, favorites and search pages
      if($("body.editEvent").length > 0 || $("body.myEvents").length > 0 || $("body.dashboard").length > 0 || $("body.search").length > 0 || $("body.favorites").length > 0) {
        $.getScript("js/search.js", function () {
          if($("body.editEvent").length > 0) {
            $.getScript("js/manageEvents.js", function() {
                getEventInfo();
            });
          } else if($("body.dashboard").length > 0 || $("body.myEvents").length > 0) {
            $.when(
              $.getScript("js/ics/ics.deps.min.js"),
              $.getScript("js/ics/ics.js"),
              $.getScript("js/ics/ics.min.js"),
              $.Deferred(function(deferred) {
                $(deferred.resolve);
              })
            ).done(function() {
              if($("body.dashboard").length > 0) {
                $.getScript("js/sortandfilter.js"),
                $.getScript("js/favorites.js", function() {
                  get_favorites();
                });
              }
              else {
                $.getScript("js/manageEvents.js", function() {
                    getMyEvents();
                });
              }
            });
          }

          if($("body.dashboard").length > 0) {
            $.getScript("js/profile.js", function() {
              getNotifications();
            });
          }

          if($("body.myEvents").length > 0 || $("body.search").length > 0) {
            $.when(
              $.getScript("js/eventLocation.js"),
              $.getScript("js/map.js"),
              $.getScript("js/sortandfilter.js"),
              $.getScript("http://api.eventful.com/js/api"),
              $.Deferred(function(deferred) {
                $(deferred.resolve);
              })
            ).done(function() {
              if($("body.search").length > 0) {
                $.when(
                  $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC5s6g-Pz5sVB-XYQZ9bnUAux7k3GDVCpM"),
                  $.getScript("js/favorites.js"),
                  $.Deferred(function(deferred) {
                    $(deferred.resolve);
                  })
                ).done(function() {
                  if(!param("search-source") || param("search-source") == "branchout") {
                    $(".switch-other").css("display", "none");
                  }
                  else {
                    $(".switch-branchout").css("display", "none");
                    $("#search-source").val('other');
                  }

                    sendSearch();
                });
              }
            });
          }
        });
      }
  });
});

function goHome() {
	window.location = "dashboard.html";
}

function updateLocation(location) {
  var loc = document.getElementById("location");
  loc.textContent = "Location: " + location;
}

function param(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function load_map(address) {
  var geocoder = new google.maps.Geocoder();
  var map = new google.maps.Map(document.getElementById('directionsMap'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var pos;
  //var infoWindow = new google.maps.InfoWindow({map: map});
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      //var dest = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      document.getElementById("getDirections").style.display = "block";
      //getDirectionsRoute(pos, dest, directionsService, directionsDisplay);
      codeAddressDirections(pos, address, directionsService, directionsDisplay);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

}

function getDirectionsRoute(currentLoc, eLocation, directionsService, directionsDisplay) {
  console.log('calculateAndDisplayRoute');
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

function closeDirections() {
  document.getElementById("getDirections").style.display = "none";
  $( "#directionsPanel" ).empty();

}

function codeAddressDirections(currentLoc, address, directionsService, directionsDisplay) {
  var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        //map.setCenter(results[0].geometry.location);
        //addMarkerAddress(results[0].geometry.location, eventName);
        getDirectionsRoute(currentLoc, results[0].geometry.location, directionsService, directionsDisplay);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}
