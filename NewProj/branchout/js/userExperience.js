function set_nav() {
  $('<ul id="navbar"></ul>').appendTo("nav");
  $('<li class="current nonuser" style="float:left"><a href="index.html">branchout</a></li>').appendTo('#navbar');
  $('<li class="current user" style="float:left"><a href="dashboard.html">branchout</a></li>').appendTo('#navbar');
  $('<li style="float:left"><a href="about.html" >About Us</a></li>').appendTo('#navbar');
  $('<li class="user" style="float:left"><a href="createEvent.html">Create an Event</a></li>').appendTo('#navbar');
  $('<li class="nonuser" style="float:right"><a href="#openRegister">Register</a></li>').appendTo('#navbar');
  $('<li class="nonuser" style="float:right"><a href="#openModal">Login</a></li>').appendTo('#navbar');
  $('<li id="profile" class="user" style="float:right"><a href="dashboard.html" id="sayhello"></a></li>').appendTo('#navbar');
  $('<form class="form" action="javascript:search()"><div class="search-query" ><span id="select-style-2"><select name="search-source" id="source"><option value="branchout">Branchout</option><option value="other">Eventful</option></select></span><input type="text" class="" name="q" placeholder="Find Events Now" id="search"><button id="search-button"><i class="fa fa-search"></i></button></div></form>').appendTo('#navbar');
  $('<ul style="float:right"><li ><a href="/branchout/profile.html">Account Info</a></li><li><a href="/branchout/myEvents.html">My Events</a></li><li ><a onclick="logout()">Logout</a></li></ul>').appendTo('#profile');
  $('<div id="openModal" class="modalDialog nonuser"><div> <a href="#close" title="Close" class="close">X</a><h2 style="color:white">Login</h2><form class="form" action="javascript:login()"><input type="text" class="form-input" placeholder="Username" id="login_uname"><input type="password" class="form-input" placeholder="Password" id="login_pass"><button type="submit" class="form-input" id="login-button">Login</button><p> don\'t have an account? </p><a href="#openRegister" class="button-red form-input" type="button">Register</a><a href="#close" class="button-grey form-input" type="button">Cancel</a></form></div></div>').appendTo("#nav");
  $('<div id="openRegister" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h2 style="color:white">Register</h2><form id="register" class="form" action="javascript:register();"><input type="text" class="form-input" placeholder="First Name" id="fname"><input type="text" class="form-input" placeholder="Last Name" id="lname"><input type="text" class="form-input" placeholder="Email" id="email"><input type="text" class="form-input" placeholder="Username" id="username"><input type="text" class="form-input" placeholder="Zipcode" id="zipcode"><input type="text" class="form-input" placeholder="Phone Number" id="phone_number"><input type="password" class="form-input" placeholder="Password" id="password"><input type="password" class="form-input" placeholder="Confirm Password" id="confirm_password"><button type="submit" id="login-button">Create Account</button><p> Already have an account? </p><a href="#openModal" class="button-red form-input" type="button">Login</a><a href="#close" class="button-grey form-input" type="button">Cancel</a></form></div>').appendTo('#nav')
  isLoggedIn();
}

function load_more() {
  $("#loading").css("display", "inherit");
  skip_total = total_num_events;
  total_num_events += 20;
  var search = "all";
  var location = "Dallas";
  console.log(param("loc"));
  if (param("loc") != 0 && param("loc") != null ) {
    location = param("loc");
  }
}

function setEditableFalse() {
	document.getElementById('optDisp1').style.display = "none";
	document.getElementById('optDisp2').style.display = "none";
	document.getElementById('optDisp3').style.display = "none";
  document.getElementById('optDisp35').style.display = "none";
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
  document.getElementById('optDisp35').style.display="block";
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

function drop_down(item) {
  var div = "#" + item;
  if ($(div).css("display") == "none") {
    $(".row .more").css("display", "none");
    $(div).css("display", "inherit");
    $(div).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(div).css("display", "inherit");
    });
  } else {
    $(div).addClass("fadeOutUp");

    $(div).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(div).css("display", "none");
      $(div).removeClass("fadeOutUp");
    });
  }
}
