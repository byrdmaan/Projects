function convertEventful(events, skip) {
  var branchout = [];
  for(var e in events) {
     console.log(events[e].description);
    // if (e >= skip) {
      var date = new Date(events[e].start_time)
      var desc = events[e].description;
      var event_categories = events[e].categories.category;
      if (events[e].image != null) {
        var event_img = events[e].image.medium.url;
      } else {
        var event_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnPlS7rAmMgIvlS0FqqHSJFGQqLcVl5Rw0NsWb_kTlC8BBvdR";
      }
      if (events[e].price != null) {
        var event_price = events[e].price;
      } else {
        var event_price = "$0";
      }
      if(!desc)
        desc = "";
      // desc = "\n<a href='" + events[e].url + "'>More information.</a>";
      var cur = {"eventId": String(events[e].id).replace("@", "at"),
                "eventName": events[e].title,
                "eventDate": date.toDateString(),
                "startTime": date.toLocaleTimeString(),
                "venue": events[e].venue_name,
                "street": events[e].venue_address,
                "city": events[e].city_name,
                "desc": desc,
                "image": event_img,
                "categories": event_categories,
                "price": event_price
      };
      branchout.push(cur);
    // }

  }
  setGlobals(branchout);
}

function filter() {
  var results = global_results, tempA = [], tempB = [], added = [];
  var noneChecked = true;

  //Categories
  $('input[name="cat"]:checked').each(function( index ) {
    noneChecked = false;
    var cval = $(this).val();
    var c_val = cval.replace("&", "&amp;");
    for(var e in global_categories[c_val])
      tempA.push(global_categories[c_val][e]);
  });

  if(noneChecked)
    tempA = results;
  noneChecked = true;
  results = [];

  //Venues
  $('input[name="venue"]:checked').each(function( index ) {
    noneChecked = false;
    for(var e in global_venues[$(this).val()])
      tempB.push(global_venues[$(this).val()][e]);
  });

  if(!noneChecked) {
    //AND results
    for(var a in tempA) {
      for(var b in tempB) {
        if(tempA[a]['eid'] == tempB[b]['eid'] && $.inArray(tempA[a]['eid'], added) == -1) {
          results.push(tempA[a]);
          added.push(tempA[a]['eid']);
        }
      }
    }
    tempA = results;
  }
  noneChecked = true;
  results = []; //idk this makes sense in my head, just trust me ok

  // console.log(tempA.length);
  //Prices
  $('input[name="price"]:checked').each(function( index ) {
    noneChecked = false;
    for(var e in global_prices[$(this).val()])
      tempB.push(global_prices[$(this).val()][e]);
  });

  if(noneChecked)
    results = tempA;
  else {
    //AND results
    added = [];
    for(var a in tempA) {
      for(var b in tempB) {
        if(tempA[a]['eid'] == tempB[b]['eid'] && $.inArray(tempA[a]['eid'], added) == -1) {
          results.push(tempA[a]);
          added.push(tempA[a]['eid']);
        }
      }
    }
  }

  // console.log(results.length);
  global_filtered = results;
  populateResults();
}

function populateFilters() {
  //$("#event-filter").css("display", "block");
  sortResults();

  //Prices
  if(!jQuery.isEmptyObject(global_prices)) {
    var price_bar = document.getElementById('filter-price');
    price_bar.innerHTML = "";
    var list = document.createElement('ul');
    for(var option in global_prices) {
      if(global_prices[option].length == 0)
        continue;

      var new_option = document.createElement('li');
      var base = "<input name=\"price\" type=\"checkbox\" id=\"" + option + "\" value=\""
                  + option + "\"/>" + "\n<label for=\"" + option;

      if(option == "$")
        base = base + "\"><i class=\"fa fa-usd\"></i></label>";
      else if(option == "$$")
        base = base + "\"><i class=\"fa fa-usd\"></i><i class=\"fa fa-usd\"></i></label>";
      else if(option == "$$$")
        base = base + "\"><i class=\"fa fa-usd\"></i><i class=\"fa fa-usd\"></i><i class=\"fa fa-usd\"></i></label>";
      else if(option == "NA")
        base = base + "\"><i class=\"fa fa-question\"></i></label>";
      else
        base = base + "\">free!</label>";

      new_option.innerHTML = base;
      list.appendChild(new_option);
    }

    price_bar.appendChild(list);
  }

  //Categories
  if(!jQuery.isEmptyObject(global_categories)) {
    var cat_bar = document.getElementById('filter-cat');
    cat_bar.innerHTML = "";
    var list = document.createElement('ul');

    for(var option in global_categories) {
      var new_option = document.createElement('li');
      new_option.innerHTML = "<input name=\"cat\" type=\"checkbox\" value=\"" + option + "\" id=\"" + option + "\"/>"
                              + "<label for=\""+ option + "\">" + option + "</label>";
      list.appendChild(new_option);
    }

    cat_bar.appendChild(list);
  }

  //Venues
  if(!jQuery.isEmptyObject(global_venues)) {
    var ven_bar = document.getElementById('filter-venue');
    ven_bar.innerHTML = "";
    var list = document.createElement('ul');

    for(var option in global_venues) {
      var new_option = document.createElement('li');
      new_option.innerHTML = "<input name=\"venue\" type=\"checkbox\" value=\"" + option + "\" id=\"" + option + "\"/>"
                              + "<label for=\"" + option + "\">" + option + "</label>";
      list.appendChild(new_option);
    }

    ven_bar.appendChild(list);
  }
}

function categorize(category) {
  var option = param("search-source");
  var search = param("q");
  window.location = "search.html?search-source=" + option + "?q=" + search + "?c=" + category;
}

function sortResults() {
  var temp;
  for(var thing in global_results) {
    //Category -- Option 1, making categories dynamic
    temp = global_results[thing].categories;
    for(var cat in temp) {
      if(global_categories.hasOwnProperty(temp[cat].name))
        global_categories[temp[cat].name].push(global_results[thing]);
      else
        global_categories[temp[cat].name] = [global_results[thing]];
    }

    //Price
    temp = global_results[thing].price;
    if (temp == "$0") {
      temp = "free";
    } else {
      temp = "$";
    }
    if(global_prices.hasOwnProperty(temp))
      global_prices[temp].push(global_results[thing]);
    else
      global_prices[temp] = [global_results[thing]];

    //Venue
    temp = global_results[thing].venue;
    if(global_venues.hasOwnProperty(temp))
      global_venues[temp].push(global_results[thing]);
    else
      global_venues[temp] = [global_results[thing]];
    }

}

function sortByLoc() {
  specialInit();
  for(var e in global_filtered) {
    codeAddressDistance(global_filtered[e].street + ", " + global_filtered[e].city, global_filtered[e].eventId);
    global_by_eid[global_filtered[e].eventId] = global_filtered[e];
  }

  global_eids = [];

  for(k in Object.keys(global_distances).sort())
    global_eids.push.apply(global_eids, dist[k]);

//  console.log(global_eids);
//  console.log("keys " + keys);
  temp = global_by_eid;
  global_by_eid = [];
  for(e in global_eids)
    global_by_eid.push(temp[e]);

//  console.log(global_by_eid);
}
