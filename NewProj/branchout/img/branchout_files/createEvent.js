var total_num_events = 20;

$(document).ready(function() {
  if($("#loadMore").length > 0)
    document.getElementById("loadMore").addEventListener("click", load_more);
  // get current location and pass it in as paramater here
  if($("body.getevents").length > 0)
    getEvents("Dallas");
});

function createEvent() {
  var category = [];
  for(var obj in $(".category:checked"))
    category.push(obj.value);
    
	$.ajax({
		url: "http://private-anon-cdd35958b-branchout.apiary-mock.com/party",
		type: "post",
		data: {
			"eventName":$("#eventName").val(),
			"eventDate":$("#eventDate").val(),
			"startTime":$("#startTime").val(),
      "endTime":$("endTime").val(),
			"eventVenue":$("#eventVenue").val(),
			"address":$("#address").val(),
			"eventCity":$("#eventCity").val(),
			"eventZip":$("#eventZip").val(),
			"eventPrice":$("#eventPrice").val(),
      "eDesc":$("#eDesc").val(),
			"category": category,
      "ePic":$("#ePic").val()
		},
		dataType: "json",
		success: function(data) {
			if(data.bad == "false") {
				alert("Event was created successfully!");
				goHome();
			}
			else
				alert("Error: " + data.errorType);
		}
	});
}

function editEvent(toChange) {
	details = {"eName":"ignore", "eDate":"ignore", "sTime":"ignore",
				"eVenue":"ignore", "eAddress":"ignore", "eCity":"ignore",
				"eZip":"ignore", "ePrice":"ignore", "eDesc":"ignore", "category":"ignore",
        "ePic":"ignore"}

	//set variables
	if(toChange === "eName") {
		//could add an if else for validEventName
		details['eName'] = document.getElementById("eName").value;
	}

	else if (toChange === "eDate") {
		details['eDate'] = document.getElementById("eDate").value;
	}

	else if (toChange === "sTime") {
		details['sTime'] = document.getElementById("sTime").value;
	}

  else if (toChange === "eTime") {
    details['eTime'] = document.getElementById("eTime").value;
  }

	else if (toChange === "eVenue") {
		details['eVenue'] = document.getElementById("eVenue").value;
	}

	else if (toChange === "eAddress") {
		details['eAddress'] = document.getElementById("eAddress").value;
	}

	else if (toChange === "eCity") {
		details['eCity'] = document.getElementById("eCity").value;
	}

	else if (toChange === "eZip") {
		details['eZip'] = document.getElementById("eZip").value;
	}

  else if (toChange === "eDesc") {
    details['eDesc'] = document.getElementById("eDesc").value;
  }

  else if (toChange === "ePic") {
    details['ePic'] = document.getElementById("ePic").value;
  }

  //FIGURE OUT HOW TO DO CATEGORY CHANGES!!!!!


	//change event
	$.ajax({
		url: "",
		type: "post",
		data: details,
		dataType: "json",
		success: function(data) {
			if (data.success) {
				$('#curEName').text(data.eName);
				$('#curEDate').text(data.eDate);
				$('#curSTime').text(data.sTime);
        $('#curETime').text(data.eTime);
				$('#curEVenue').text(data.eVenue);
				$('#curEAddress').text(data.eAddress);
				$('#curECity').text(data.eCity);
				$('#curEZip').text(data.eZip);
				$('#curEPrice').text(data.ePrice);
        $('#curEDesc').text(data.eDesc);
        $('#curEPic').text(data.ePic);
			}
			else
				alert(data.errorType);
		}
	});

	//clear input fields
	$("#eName").val('');
	$("#eDate").val('');
  $("#sTime").val('');
	$("#eTime").val('');
	$("#eVenue").val('');
	$("#eAddress").val('');
	$("#eCity").val('');
	$("#eZip").val('');
	$("#ePrice").val('');
  $("#eDesc").val('');
  $("#ePic").val('');
}

//move this to REDIRECT.js eventually
function goHome() {
	window.location = "dashboard.html";
}

function setEditableFalse() {
	document.getElementById('optDisp1').style.display = "none";
	document.getElementById('optDisp2').style.display = "none";
	document.getElementById('optDisp3').style.display = "none";
  document.getElementById('optDisp3.5').style.display = "none";
	document.getElementById('optDisp4').style.display = "none";
	document.getElementById('optDisp5').style.display = "none";
	document.getElementById('optDisp6').style.display = "none";
	document.getElementById('optDisp7').style.display = "none";
	document.getElementById('optDisp8').style.display = "none";
  document.getElementById('optDisp9').style.display = "none";
  document.getElementById('optDisp10').style.display = "none";
}

function setEditableTrue() {
	document.getElementById('optDisp1').style.display="block";
	document.getElementById('optDisp2').style.display="block";
	document.getElementById('optDisp3').style.display="block";
  document.getElementById('optDisp3.5').style.display="block";
	document.getElementById('optDisp4').style.display="block";
	document.getElementById('optDisp5').style.display="block";
	document.getElementById('optDisp6').style.display="block";
	document.getElementById('optDisp7').style.display="block";
	document.getElementById('optDisp8').style.display="block";
  document.getElementById('optDisp9').style.display="block";
  document.getElementById('optDisp10').style.display="block";

}

function toggle() {
	if(document.getElementById('optDisp1').style.display == "none") {
		document.getElementById("editableButton").innerHTML="View Event";
		setEditableTrue();
	}
	else {
		document.getElementById("editableButton").innerHTML="Edit Event";
		setEditableFalse();
	}
}

function toggle_visibility(id) {
	var e = document.getElementById(id);
	if (e.style.display == 'visible' || e.style.display == '')
	{
		e.style.display = 'hidden';
	}
	else
	{
		e.style.display = 'visible';
	}
}

function getEvents(location) {
  var search = "all";
  console.log(param("loc"));
  if (param("loc") != 0 && param("loc") != null ) {
    location = param("loc");
    updateLocation(location);
  }
  if (param("q") != 0 && param("q") != null) {
    search = param("q");
  }
  var args = {
    app_key: " Nq2QtpQ9Ld2gPRRV",
    // keywords: "baseball",
    keywords: search,
    where: location,
    t: "Future",
    page_size: 20,
    sort_order: "popularity",
  };

  EVDB.API.call("/events/search", args, function(data) {
    console.log(data);
    var content_left = document.getElementById("event-content-left");
    var content_right = document.getElementById("event-content-right");
    if (data.events == null) {
      var note = document.createElement("h1");
      note.textContent = "Sorry there are no events that match this search. Would you like to create one?";
      content_left.appendChild(note);
    } else {
      var events = data.events.event;
      for (e in events){

        // console.log(events[e].venue_address);
        var date = new Date(events[e].start_time);


        var event_div = document.createElement("div");
        var h2 = document.createElement("h2");
        h2.className = "major event";
        var span = document.createElement("span");
        span.textContent = events[e].title;
        h2.appendChild(span);
        var event_body = document.createElement("div");
        event_body.className = "event-body";
        var row = document.createElement("div");
        row.className = "row";

        var h1 = document.createElement("h1");
        h1.innerHTML = "<i class=\"fa fa-calendar\"></i>  " + date.toDateString();
        var time = document.createElement("h1");
        time.innerHTML = "<i class=\"fa fa-clock-o\"></i>  " + date.toLocaleTimeString();
        var venue = document.createElement("h1");
        venue.innerHTML = "<i class=\"fa fa-map-marker\"></i>  " + events[e].venue_name;
        var moreButton = document.createElement("button");
        moreButton.className = "button small";
        moreButton.innerHTML = "<i class=\"fa fa-ellipsis-h\"></i>";
        var info = document.createElement("div");
        info.className = "info";


        if (events[e].image != null) {
          var img = document.createElement("img");
          img.src = events[e].image.medium.url;
          img.className = "event";
          row.appendChild(img);
        } else {
          var img = document.createElement("img");
          img.src = "http://www.starttaamo.fi/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png";
          img.className = "event";
          row.appendChild(img);
        }

        info.appendChild(h1);
        info.appendChild(time);
        info.appendChild(venue);
        info.appendChild(moreButton);
        row.appendChild(info);
        event_body.appendChild(row);
        event_div.appendChild(h2);
        event_div.appendChild(event_body);
        if (e % 2 == 0) {
          content_left.appendChild(event_div);
        } else {
          content_right.appendChild(event_div);
        }

      }

    }
    $("#loading").css("display", "none");

  });

}

function load_more() {
  skip_total = total_num_events;
  total_num_events += 20;
  var search = "all";
  var location = "Dallas";
  console.log(param("loc"));
  if (param("loc") != 0 && param("loc") != null ) {
    location = param("loc");
  }
  if (param("q") != 0 && param("q") != null) {
    search = param("q");
  }
  var args = {
    app_key: " Nq2QtpQ9Ld2gPRRV",
    q: search,
    where: location,
    t: "Future",
    page_size: total_num_events,
    sort_order: "popularity",
  };

  EVDB.API.call("/events/search", args, function(data) {

    var content_left = document.getElementById("event-content-left");
    var content_right = document.getElementById("event-content-right");
    if (data.events == null) {
      var note = document.createElement("h1");
      note.textContent = "Sorry there are no events that match this search. Would you like to create one?";
      content_left.appendChild(note);
    } else {
      var events = data.events.event;
      for (e in events) {
        if (e > skip_total) {

          var date = new Date(events[e].start_time);

          var event_div = document.createElement("div");
          var h2 = document.createElement("h2");
          h2.className = "major event";
          var span = document.createElement("span");
          span.textContent = events[e].title;
          h2.appendChild(span);
          var event_body = document.createElement("div");
          event_body.className = "event-body";
          var row = document.createElement("div");
          row.className = "row";

          var h1 = document.createElement("h1");
          h1.innerHTML = "<i class=\"fa fa-calendar\"></i>  " + date.toDateString();
          var time = document.createElement("h1");
          time.innerHTML = "<i class=\"fa fa-clock-o\"></i>  " + date.toLocaleTimeString();
          var venue = document.createElement("h1");
          venue.innerHTML = "<i class=\"fa fa-map-marker\"></i>  " + events[e].venue_name;
          var moreButton = document.createElement("button");
          moreButton.className = "button small";
          moreButton.innerHTML = "<i class=\"fa fa-ellipsis-h\"></i>";
          var info = document.createElement("div");
          info.className = "info";


          if (events[e].image != null) {
            var img = document.createElement("img");
            img.src = events[e].image.medium.url;
            img.className = "event";
            row.appendChild(img);
          } else {
            var img = document.createElement("img");
            img.src = "http://www.starttaamo.fi/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png";
            img.className = "event";
            row.appendChild(img);
          }

          info.appendChild(h1);
          info.appendChild(time);
          info.appendChild(venue);
          info.appendChild(moreButton);
          row.appendChild(info);
          event_body.appendChild(row);
          event_div.appendChild(h2);
          event_div.appendChild(event_body);
          if (e % 2 == 0) {
            content_left.appendChild(event_div);
          } else {
            content_right.appendChild(event_div);
          }
        }
      }

    }
    $("#loading").css("display", "none");

  });



}

function param(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function updateLocation(location) {
  var loc = document.getElementById("location");
  loc.textContent = "Location: " + location;
}

function populateResults(results) {
  var content_left = document.getElementById("event-content-left");
  var content_right = document.getElementById("event-content-right");
  if (results == null) {
    var note = document.createElement("h1");
    note.textContent = "Sorry there are no events that match this search. Would you like to create one?";
    content_left.appendChild(note);
  } else {
    for (e in results){

      // console.log(events[e].venue_address);
      var date = new Date(results[e].date + " " + results[e].start_time);

      var event_div = document.createElement("div");
      var h2 = document.createElement("h2");
      h2.className = "major event";
      var span = document.createElement("span");
      span.textContent = results[e].title;
      h2.appendChild(span);
      var event_body = document.createElement("div");
      event_body.className = "event-body";
      var row = document.createElement("div");
      row.className = "row";

      var h1 = document.createElement("h1");
      h1.innerHTML = "<i class=\"fa fa-calendar\"></i>  " + date.toDateString();
      var time = document.createElement("h1");
      time.innerHTML = "<i class=\"fa fa-clock-o\"></i>  " + date.toLocaleTimeString();
      var venue = document.createElement("h1");
      venue.innerHTML = "<i class=\"fa fa-map-marker\"></i>  " + results[e].where;
      var moreButton = document.createElement("button");
      moreButton.className = "button small";
      moreButton.innerHTML = "<i class=\"fa fa-ellipsis-h\"></i>";
      var info = document.createElement("div");
      info.className = "info";
      var star = document.createElement("span");
      star.setAttribute("class", "interest");
      star.innerHTML = "<input type='checkbox' id='" + results[e].eid + "' name='showInterest' onclick='star(this);'>\n" +
                        "<label class='inter' for='" + results[e].eid + "' title='Interested in Event'></label>";

      if (results[e].image != null) {
        var img = document.createElement("img");
        img.src = results[e].image;
        img.className = "event";
        row.appendChild(img);
      } else {
        var img = document.createElement("img");
        img.src = "http://www.starttaamo.fi/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png";
        img.className = "event";
        row.appendChild(img);
      }


      info.appendChild(star);
      info.appendChild(h1);
      info.appendChild(time);
      info.appendChild(venue);
      info.appendChild(moreButton);
      row.appendChild(info);
      event_body.appendChild(row);
      event_div.appendChild(h2);
      event_div.appendChild(event_body);
      if (e % 2 == 0) {
        content_left.appendChild(event_div);
      } else {
        content_right.appendChild(event_div);
      }

    }

  }
}

function search() {
  $.ajax({
    url: "http://private-3ce3-branchout.apiary-mock.com/search",
    type: "post",
    data: {
      "query": $("#search").val()
    },
    dataType: "json",
    success: function(data) {
      if(data.bad == "false")
        populateResults(data.results);
      else {
        alert("Error: " + data.errorType);
        return false;
      }
    }
  });
}

function star(clicky) {
  if(!clicky.checked) //Do nothing because i forgot to make an "unstar" api call
    return;

  var event_id = clicky.id;

  $.ajax({
    url: "http://private-anon-f8c8b19f3-branchout.apiary-mock.com/imlovinit",
    type: "post",
    data: {
      "eid": event_id
    },
    dataType: "json",
    success: function(data) {
      if(data.bad == "true") {
        alert("[ERROR] We're sorry. Event could not be starred.");
        clicky.checked = false;
      }
      else
        alert("Starred!");
    }
  });
}
