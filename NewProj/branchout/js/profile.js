function get_profile() {
  console.log("getting profile");

  $.ajax({
      url: "/branchout/scripting_stuff/others/getProfile.php",
      type: "get",
      data: {
      },
      dataType: "json",
      success: function(data) {
        console.log(data.firstname);
        $("#fname_1").val(data.firstname);
        $("#lname_1").val(data.lastname);
        $("#email_1").val(data.email);
        $("#username_1").val(data.username);
        $("#zipcode_1").val(data.zipcode);
        $("#phone_number_1").val(data.phone);
      }
  });
}

function update_profile() {
  var fname = $("#fname_1").val();
  var lname = $("#lname_1").val();
  var email = $("#email_1").val();
  var username = $("#username_1").val();
  var zipcode = $("#zipcode_1").val();
  var phone = $("#phone_number_1").val();
  $.ajax({
      url: "/branchout/scripting_stuff/others/updateProfile.php",
      type: "post",
      data: {
        "fname": fname,
        "lname": lname,
        "email": email,
        "username": username,
        "zipcode": zipcode,
        "phone": phone
      },
      dataType: "json",
      success: function(data) {
        alert("Your information has been updated!");
        window.location = "dashboard.html";
      }
  });
}

function populateNotifications(notifications) {
  var content = document.getElementById("notifications");
  content.innerHTML = ""; //clear
  var something_changed = " <i style=\"color:red\" id=\"notification\" class=\"fa fa-exclamation animated shake\"></i>";

  if (notifications == null || notifications.length < 1) {
    var note = document.createElement("h1");
    note.innerHTML = "Nothing has changed!";
    content.appendChild(note);
  } else {
    for (e in notifications){
      var string_id = String(notifications[e].eventId);

      // console.log(events[e].venue_address);
      var date = new Date(notifications[e].eventDate + " " + notifications[e].startTime);
      var event_div = document.createElement("div");
      var h2 = document.createElement("h2");
      h2.className = "major event";
      var span = document.createElement("span");
      span.id = string_id + "_title";
      console.log("Array: " + notifications[e].changed);
      console.log($.inArray('EventName', notifications[e].changed));
      if(notifications[e].changes.indexOf('EventName') > -1)
        span.innerHTML = notifications[e].eventName + something_changed;
      else
        span.innerHTML = notifications[e].eventName;
      h2.appendChild(span);
      var event_body = document.createElement("div");
      event_body.className = "event-body";
      var row = document.createElement("div");
      row.className = "row events";

      var event_img_div = document.createElement("div");
      event_img_div.className = "event-image";

      var h1 = document.createElement("h1");
      h1.id = string_id + "_date";
      if(notifications[e].changes.indexOf('EventDate')  > -1)
        h1.innerHTML = "<i class=\"fa fa-calendar\"></i>  " + date.toDateString() + something_changed;
      else
        h1.innerHTML = "<i class=\"fa fa-calendar\"></i>  " + date.toDateString();
      var time = document.createElement("h1");
      time.id = string_id + "_time";
      if(notifications[e].changes.indexOf('StartTime')  > -1)
        time.innerHTML = "<i class=\"fa fa-clock-o\"></i>  " + date.toLocaleTimeString() + something_changed;
      else
        time.innerHTML = "<i class=\"fa fa-clock-o\"></i>  " + date.toLocaleTimeString();
      var venue = document.createElement("h1");
      venue.id = string_id + "_venue";
      if(notifications[e].changes.indexOf('Venue')  > -1)
        venue.innerHTML = "<i class=\"fa fa-map-marker\"></i>  " + notifications[e].venue + something_changed;
      else
        venue.innerHTML = "<i class=\"fa fa-map-marker\"></i>  " + notifications[e].venue;

      var string_id = String(notifications[e].eventId) + "_more";
      var moreDiv = document.createElement("div");
      moreDiv.id = string_id;
      if(notifications[e].changes.indexOf('Street')  > -1 || notifications[e].changes.indexOf('City')  > -1 || notifications[e].changes.indexOf('Zipcode')  > -1)
        moreDiv.innerHTML = notifications[e].street + ", " + notifications[e].city
                        + "<h1>Description</h1><span id=\"" + string_id + "_desc\">" + notifications[e].desc
                        + "</span></div>" + something_changed;
      else
        moreDiv.innerHTML = notifications[e].street + ", " + notifications[e].city
                          + "<h1>Description</h1><span id=\"" + string_id + "_desc\">" + notifications[e].desc + "</span></div>";

      var info = document.createElement("div");
      info.className = "info";
      info.id = "notification";

      if (notifications[e].image != null) {
        var img = document.createElement("img");
        img.src = notifications[e].image;
        img.className = "event";
        event_img_div.appendChild(img);
      } else {
        var img = document.createElement("img");
        img.src = "http://www.starttaamo.fi/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png";
        img.className = "event";
        event_img_div.appendChild(img);
      }

      info.appendChild(h1);
      info.appendChild(time);
      info.appendChild(venue);
      info.appendChild(moreDiv);
      //row.appendChild(event_img_div)
      row.appendChild(info);
      event_body.appendChild(row);
      event_div.appendChild(h2);
      event_div.appendChild(event_body);
      //event_div.appendChild(moreDiv);
      content.appendChild(event_div);

    }

  }
}
