function setQuery() {
  loc = "Dallas"
  var search = "all";
  // console.log(param("loc"));
  if (param("loc") != 0 && param("loc") != null ) {
    loc = param("loc");
  }
  if (param("q") != 0 && param("q") != null) {
    search = param("q");
  }

  // can set these to whatever you would like. These are the arguments for the API call
  var args = {
    app_key: " Nq2QtpQ9Ld2gPRRV",
    keywords: search,
    where: loc,
    t: "Future",
    page_size: 20,
    sort_order: "popularity",
  };
  getLoc(args);
}

function getLoc(args) {
  EVDB.API.call("/events/search", args, function(data) {
    if (data.events == null) {
      //there are no events in this area
    } else {
      var events = data.events.event;
      for (e in events) {
        // do whatever you need with this info. <------------------------------------------
        //console.log("events");
        //console.log(events[e]);
        //start_time and venue_name
        //for button: description, url, venue_address?
        addMarkerEvent(events[e]);
      }
    }
    return events;
  });

}
