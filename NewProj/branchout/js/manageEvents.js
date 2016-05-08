function createEvent() {
  if(validEvent()) {
    var category = [];
    for(var obj in $(".category:checked"))
      category.push(obj.value);
    console.log(category);
  $.ajax({
    url: "/branchout/scripting_stuff/createEvent.php",
    type: "post",
    data: {
      "eventName":$("#eventName").val(),
      "eventDate":$("#eventDate").val(),
      "startTime":$("#startTime").val(),
      "endTime":$("#endTime").val(),
      "venue":$("#venue").val(),
      "address":$("#address").val(),
      "city":$("#city").val(),
      "zip":$("#zip").val(),
      "price":$("#price").val(),
      "desc":$("#desc").val(),
      "category": category,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnPlS7rAmMgIvlS0FqqHSJFGQqLcVl5Rw0NsWb_kTlC8BBvdR",
    },
    dataType: "json",
    success: function(data) {
      console.log(data);
      if(!data.bad) {
        alert("Event was created successfully!");
        goHome();
      }
      else
        alert("Error: " + data.errormsg);
    }
  });

  }
}

function editEvent() {
  var values = [null, null, null, null, null, null, null, null, null, null, null, null];
  var new_ids = ["curEName", "curEDate", "curSTime", "curETime", "curEVenue", "curEAddress", "curECity", "curEZip", "price", "curEDesc", "category", "image"];

  for(x = 0; x < values.length; x++) {
    if($("#" + new_ids[x]).val() == '' || $("#" + new_ids[x]).length == 0)
      continue;
    values[x] = $("#" + new_ids[x]).val();
    $("#" + new_ids[x]).val('');
  }

	var details = {"eid":param('eid'),
            "eventName":values[0],
            "eventDate":values[1],
            "startTime":values[2],
            "endTime":values[3],
            "venue":values[4],
            "address":values[5],
            "city":values[6],
            "zip":values[7],
            "price":values[8],
            "desc":values[9],
            "category":values[10],
            "image":values[11]};

  //FIGURE OUT HOW TO DO CATEGORY CHANGES!!!!!
  console.log(details);
	//change event
	$.ajax({
		url: "/branchout/scripting_stuff/editEvent.php",
		type: "post",
		data: {"eid":param('eid'),
              "eventName":values[0],
              "eventDate":values[1],
              "startTime":values[2],
              "endTime":values[3],
              "venue":values[4],
              "address":values[5],
              "city":values[6],
              "zip":values[7],
              "price":values[8],
              "desc":values[9],
              "category":values[10],
              "image":values[11]},
		dataType: "json",
		success: function(data) {
      console.log(data);
			if (data.bad == "false") {
        alert("saved");
        window.location = "myEvents.html";
      }
			else
				alert(data.errormsg);
		}
	});
}

function goEditThangs(eid) {
  window.location = "editEvent.html?eid=" + eid;
}

function getEventInfo() {
  var eid = param('eid');
  if(!eid) {
    alert("[ERROR] No event specified.");
    goHome();
  }
  $.ajax({
    url: "scripting_stuff/pullSingleEvent.php",
    type: "post",
    data: {
      "eid":eid
    },
    dataType: "json",
    success: function(data) {
      if(!data.bad) {
        console.log(data);
        $('#curEName').val(data.results.eventName);
        $('#curEDate').val(data.results.eventDate);
        $('#curSTime').val(data.results.startTime);
        $('#curETime').val(data.results.endTime);
        $('#curEVenue').val(data.results.venue);
        $('#curEAddress').val(data.results.street);
        $('#curECity').val(data.results.city);
        $('#curEZip').val(data.results.zip);
        $('#price').val(data.results.price);
        $('#curEDesc').val(data.results.desc);
        $('#curEPic').val(data.results.image);
      }
      else
        alert("[ERROR] " + data.errormsg);
    }
  });
}

function getMyEvents() {
  $.ajax({
    url:"scripting_stuff/pullCreatedEvents.php",
    type: "get",
    dataType: "json",
    success: function(data) {
      console.log(data.bad);
      console.log(data.errormsg);
      if(data.bad == false) {
        setGlobals(data.results);
        populateResults("edit");
      }
      else {
        alert("Error: " + data.errormsg);
        return false;
      }
    }
  });
}
