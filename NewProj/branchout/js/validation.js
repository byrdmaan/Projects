function isLoggedIn() {
  $.ajax({
      url: "/branchout/checkLoggedIn/checkLoggedIn.php",
      type: "get",
      success: function(data) {
        var response = JSON.parse(data);
        if(response.bad == "false") {
          $(".nonuser").css("display", "none");
          $(".user").css("display", "inline-block");
          var name = document.getElementById("sayhello");
          name.textContent = "Hi there, " + response.errormsg + "!";
        } else {
          $(".user").css("display", "none");
          $(".nonuser").css("display", "inline-block");
          if($(".usersonly").length > 0) {
            alert("I'm sorry you must be logged in to view this page.");
            window.location = "index.html";
          }
        }
      }
  });
}

function isStarred(eid) {
  result = false;
  $.ajax({
      url: "scripting_stuff/checkIfStarred.php",
      type: "post",
      dataType: "json",
      async: false,
      data: {"eid": eid},
      success: function(data) {
        if(!data.bad && data.starred) {
          result = true;
        }
      }
  });
  return result;
}

function isValidEmail(email) {
    var regex = /\w+@\w+\.\w{3}/;

    if(regex.test(email))
        return true;
    else {
        alert("You must enter an email address.");
        return false;
    }
}

function isValidFirst(name) {
    var regex = /^[A-Z][-a-zA-Z]+$/;

    if(regex.test(name))
        return true;
    else {
        alert("Your first name must start with an uppercase letter and be followed by only letters from the English alphabet.");
        return false;
    }
}

function isValidLast(name) {
    var regex = /^[A-Z][-a-zA-Z]+$/;

    if(regex.test(name))
        return true;
    else {
        alert("Your last name must start with an uppercase letter and be followed by only letters from the English alphabet.");
        return false;
    }
}

function isValidPass(pass) {
    var isValid = /[\w]{8,64}/;
    if(isValid.test(pass))
        return true;
    else {
        alert("Passwords must be 8-64 characters and contain at least one uppercase letter and one number.");
        return false;
    }
}

function isValidUsername(name) {
  var regex = /[\w]{4,20}/;

  if(regex.test(name))
      return true;
  else {
      alert("You must enter a username that is 4-20 characters and only contains alphanumeric characters.");
      return false;
  }
}

function isValidZip(zip) {
  var regex = /^[\d]{5}$/;

  if(regex.test(zip))
      return true;
  else {
      alert("Please enter a valid 5 digit zip code.");
      return false;
  }
}

function param(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function isBranchout() {
  if (param("search-source") == "branchout") {
    return true;
  } else {
    return false;
  }
}

function validTime() {
    //var regex = /[0-1][0-9]:[0-5][0-9]\s[A|P]M/;
    var name = document.getElementById("startTime").value;
    //if(regex.test(name))
        return true;
    /*else {
        alert("Time must be formatted HH:MM followed by AM/PM");
        return false;
    }*/
}

function validEvent() {
	if(!validTime())
		return false;
	else
		return true;
}
