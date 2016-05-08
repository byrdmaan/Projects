var total_num_events = 20;
var skip_total = 0;
var global_results = {}, global_filtered = {}, global_categories = {}, global_eids = [], global_by_eid = {}
  global_prices = {"free":[], "$":[], "$$":[], "$$$":[], "NA":[]}, global_venues = {};

function populateResults(mode) {
  var content_left = document.getElementById("event-content-left");
  content_left.innerHTML = ""; //clear
  var content_right = document.getElementById("event-content-right");
  content_right.innerHTML = ""; //clear

  if (global_filtered == null) {
    var note = document.createElement("h1");
    note.innerHTML = "Sorry there are no events that match this search.<br>Would you like to <a href='createEvent.html'>create one</a>?";
    content_left.appendChild(note);
  } else {
    for (e in global_filtered){
      var string_id = String(global_filtered[e].eventId);

      // console.log(events[e].venue_address);
      var date = new Date(global_filtered[e].eventDate + " " + global_filtered[e].startTime);
      var event_div = document.createElement("div");
      event_div.className = "event_shadow";
      var h2 = document.createElement("h2");
      h2.className = "major event";
      var span = document.createElement("span");
      span.id = string_id + "_title";
      span.textContent = global_filtered[e].eventName;
      h2.appendChild(span);
      var event_body = document.createElement("div");
      event_body.className = "event-body";
      var row = document.createElement("div");
      row.className = "row events";

      var event_img_div = document.createElement("div");
      event_img_div.className = "event-image";

      var h1 = document.createElement("h1");
      h1.id = string_id + "_date";
      h1.innerHTML = "<i class=\"fa fa-calendar\"></i>  " + date.toDateString();
      var time = document.createElement("h1");
      time.id = string_id + "_time";
      time.innerHTML = "<i class=\"fa fa-clock-o\"></i>  " + date.toLocaleTimeString();
      var venue = document.createElement("h1");
      venue.id = string_id + "_venue";
      venue.innerHTML = "<i class=\"fa fa-map-marker\"></i>  " + global_filtered[e].venue;
      var moreButton = document.createElement("button");
      moreButton.className = "button small";
      moreButton.innerHTML = "<i class=\"fa fa-ellipsis-h\"></i>";
      var info = document.createElement("div");
      info.className = "info";

      var star = document.createElement("span");
      star.setAttribute("class", "interest");
      // console.log("star time");
      if(mode == "star") {
        star.innerHTML = "<input type='checkbox' id='" + global_filtered[e].eventId + "' name=\"events\"'>\n" +
                          "<label style=\"display: inline\" for='" + global_filtered[e].eventId + "' title='Interested in Event'><i class=\"fa fa-check\"></i></label>";
      }
      else if(mode == "edit") {
        star.innerHTML = "<input onclick='goEditThangs(" + global_filtered[e].eventId + ");' type='button' id='" + global_filtered[e].eventId + "' value='Edit Event' name=\"events\"'>\n" +
                          "<label style=\"display: inline\" for='" + global_filtered[e].eventId + "' title='Edit Event'></label>";
      }
      else {
        if(isStarred(global_filtered[e].eventId)) {
          star.innerHTML = "<input checked type='checkbox' id='" + global_filtered[e].eventId + "' onclick='star(this);'>\n" +
                          "<label style=\"display: inline\" for='" + global_filtered[e].eventId + "' title='Interested in Event'><i class=\"fa fa-star\"></i></label>";
        } else {
          star.innerHTML = "<input type='checkbox' id='" + global_filtered[e].eventId + "' onclick='star(this);'>\n" +
                          "<label style=\"display: inline\" for='" + global_filtered[e].eventId + "' title='Interested in Event'><i class=\"fa fa-star\"></i></label>";
        }
      }

      var string_id = String(global_filtered[e].eventId) + "_more";
      moreButton.setAttribute("onclick", "drop_down(\""+ string_id + "\")");
      var moreDiv = document.createElement("div");
      moreDiv.className = "more animated fadeInDown";
      moreDiv.id = string_id;
      moreDiv.innerHTML = "<div class=\"more-content\"><strong>Venue Address</strong><button class=\"button\" onclick=\"load_map('" + global_filtered[e].street + ", " + global_filtered[e].city + "')\""
                          + "style=\"float:right\">get directions</button><br>" + global_filtered[e].street + ", " + global_filtered[e].city
                          + "<br><strong>Description</strong><br><span id=\"" + string_id + "_desc\">" + global_filtered[e].desc + "</span></div>"
      //Add error handling!
      if(mode == "search" && global_filtered[e].street)
        codeAddressDistance(global_filtered[e].street);

      var info = document.createElement("div");
      info.className = "info";

      if (global_filtered[e].image != null && global_filtered[e].image != "") {
        console.log(global_filtered[e].image);
        var img = document.createElement("img");
        img.src = global_filtered[e].image;
        img.className = "event";
        event_img_div.appendChild(img);
      } else {
        var img = document.createElement("img");
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnPlS7rAmMgIvlS0FqqHSJFGQqLcVl5Rw0NsWb_kTlC8BBvdR";
        img.className = "event";
        event_img_div.appendChild(img);
      }


      info.appendChild(star);
      info.appendChild(h1);
      info.appendChild(time);
      info.appendChild(venue);
      info.appendChild(moreButton);
      row.appendChild(event_img_div)
      row.appendChild(info);
      event_body.appendChild(row);
      event_div.appendChild(h2);
      event_div.appendChild(event_body);
      event_div.appendChild(moreDiv);
      if (e % 2 == 0) {
        content_left.appendChild(event_div);
      } else {
        content_right.appendChild(event_div);
      }

    }
    $("#loading").css("display", "none");
  }
}

function render(args, skip) {
  EVDB.API.call("/events/search", args, function(data) {
    var content_left = document.getElementById("event-content-left");
    var content_right = document.getElementById("event-content-right");

    if (data.events == null) {
      var note = document.createElement("h1");
      note.innerHTML = "Sorry there are no events that match this search. <br>Would you like to <a href='createEvent.html'>create one</a>?";
      content_left.appendChild(note);
      $(".actions").css("display", "none");
    } else {
      $(".actions").css("display", "inherit");
      var events = data.events.event;
      convertEventful(events, skip);
      if (skip == 0)
        sortByLoc();
      populateResults("other");
      populateFilters();
    }
    $("#loading").css("display", "none");

  });

}

function search() {
  $("#loading").css("display", "block");
  $("#event-content-left").html('');
  $("#event-content-right").html('');

  var option = $("#source").val();
  var search = '';
  if ($("#search").val() != null || $("#search").val() != '') {
    search = $("#search").val();
  }

  window.location="search.html?search-source=" + option + "&q=" + search;
}

function sendSearch(skip) {
    if (skip != null) {
      skip_total + skip;
    }
    total_num_events = total_num_events + skip_total;
    console.log(total_num_events);
    var option = param("search-source");
    if(!option)
      option = "branchout";

    var search = param("q");
    if(!search || search == null)
      search = "all";

    if (option == "branchout") {
      $.ajax({
        url: "search/search.php",
        type: "get",
        data: {
          "query": search
        },
        dataType: "json",
        success: function(data) {
          if(data.bad == "false") {
            setGlobals(data.results);
            sortByLoc();
            populateResults("search");
            populateFilters();
          }
          else {
            alert("Error: " + data.errormsg);
            return false;
          }
        }
      });
    } else {
        var cat = "all";
        if (param("c")) {
          cat = param("c");
        }
        var order = "popularity";
        var args = {
          app_key: " Nq2QtpQ9Ld2gPRRV",
          keywords: search,
          where: "Dallas",
          t: "Future",
          page_size: total_num_events,
          category: cat,
          sort_order: order,
          include: 'categories,price',
        };
        render(args, skip_total);
    }
}

function setGlobals(results) {
  global_filtered = results;
  global_results = results;
}
