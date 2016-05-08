function export_favorites() {
  var selection = $("input[name='selection']:checked")[0];
  var events = $("input[name='events']:checked");

  if(!selection) {
    alert("[ERROR] You must choose an option in Step 1.");
    return;
  }
  if(events.length == 0) {
    alert("[ERROR] You must select at least one event.");
    return;
  }

  var message = "Saving ";
  var calendar = ics();
  for(var e in events) {
    var string_id = "#" + String(events[e].id);
    //Title
    var id = string_id + "_title";
    if(!$(id).html())
      continue;
    var title = $(id).text();

    //Desc
    id = string_id + "_desc";
    var desc = $(id).text();

    //Location
    id = string_id + "_venue";
    var loc = $(id).text();

    //Date
    id = string_id + "_date";
    var date = $(id).text();

    console.log(title + " " + desc + " " + loc + " " + date);
    calendar.addEvent(title, desc, loc, date, date);
  }

  calendar.download("branchout_starred_events");
}

function get_favorites() {
  var arr = [];
  $.ajax({
    url: "scripting_stuff/pullStarredEvents.php",
    type: "get",
    dataType: "json",
    async: false,
    success: function(data) {
      if(data.bad == false) {
        for (var e in data.results) {
          if (data.results[e].eventId[0] == "E") {
            var temp = {
              app_key: " Nq2QtpQ9Ld2gPRRV",
              id: data.results[e].eventId,
              page_size: 25,
            };
            EVDB.API.call("/events/get", temp, function(oData) {
              var date = new Date(oData.start_time);
              var d = new Object();
              d = {
                "category": ["sports"],
                "city": oData.city,
                "desc": oData.description,
                "eventId": oData.id.replace("@","at"),
                "endTime": oData.stop_time,
                "eventDate": date.toDateString(),
                "eventName": oData.title,
                "image": oData.images.image[0].medium.url,
                "price": "$",
                "startTime": date.toLocaleTimeString(),
                "street": oData.address,
                "venue": oData.venue_name,
                "zip": oData.postal_code,
              };
              arr.push(d);
              setGlobals(arr);
              populateResults("star");

            });
          } else {
            // console.log(data.results[e]);
            console.log(data.results[e]);
            arr.push(data.results[e]);
            setGlobals(arr);
            populateResults("star");
          }
        }

      }
      else {
        alert("Error: " + data.errormsg);
        return false;
      }
    }
  });

}

function deselect() {
  $("input[name='events']").prop('checked', false);
}

function selectall() {
  $("input[name='events']").prop('checked', true);
}

function star(clicky) {
  var event_id = clicky.id;

  if(!clicky.checked) {
    $.ajax({
      url: "scripting_stuff/unstarEvent.php",
      type: "post",
      data: {
        "eid": event_id
      },
      dataType: "json",
      success: function(data) {
        if(data.bad == "true") {
          alert("[ERROR] We're sorry. Event could not be un-starred.");
          clicky.checked = false;
        }
      }
    });
  }
  else {
    $.ajax({
      url: "scripting_stuff/starEvent.php",
      type: "post",
      data: {
        "eid": event_id
      },
      dataType: "json",
      success: function(data) {
        console.log("checked " + event_id + " " + data);
        if(data.bad == "true") {
          alert("[ERROR] We're sorry. Event could not be starred.");
          clicky.checked = false;
        }
      }
    });
  }
}

function get_help(type) {
  var help = $("#help-window")[0];

  if(type == "apple") {
    $("#help h1")[0].textContent = "Import to Apple Calendars";
    help.innerHTML = "<ol><li>Choose File > Import > Import.</li><li>Locate and select the calendar file you downloaded, then click import."
                      + "</li><li>Select a calendar to add the events to.</li></ol>";
  }
  else {
    if(type == "google")
      $("#help h1")[0].textContent = "Import to Google Calendars";
    else
      $("#help h1")[0].textContent = "Import to Android Calendars";

      help.innerHTML = "<ol><li>Open Google Calendar in a browser.</li><li>In the top right, click the gear button > Settings.</li>"
                      + "<li>Open the Calendars tab</li><li>Click Import calendars between the \"My calendars\" and \"Other Calendars\""
                      + " sections.</li><li>Click Choose File and select the calendar file you exported.</li><li>Select a calendar"
                      + " to add the events to.</li><li>Click Import.</li></ol>";
  }

}

function hide_help() {
  $("#overlay").css('visibility', 'hidden');
}
