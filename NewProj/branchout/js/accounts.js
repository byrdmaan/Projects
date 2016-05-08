function register() {
    var email = document.getElementById('email').value;
    var first = document.getElementById('fname').value;
    var last = document.getElementById('lname').value;
    var pass = document.getElementById('password').value;
    var passConfirm = document.getElementById('confirm_password').value;
    var uname = document.getElementById('username').value;
    var zip = document.getElementById('zipcode').value;
    var phone = document.getElementById('phone_number').value;

    if(pass != passConfirm) {

      alert("Passwords must match.");
      return false;
    }
    if(!isValidFirst(first))
      return false;
    if(!isValidLast(last))
      return false;
    if(!isValidEmail(email))
      return false;
    if(!isValidZip(zip))
      return false;
    if(!isValidUsername(uname))
      return false;
    if(!isValidPass(pass))
      return false;

    // if(sendRegister(first, last, email, zip, uname, pass, phone)) {
    //   alert("Welcome");
    // }

    $.ajax({
      url: "/branchout/scripting_stuff/createAccount.php",
      type: "post",
      data: {
        "firstname": first,
        "lastname": last,
        "email": email,
        "zipcode": zip,
        "username": uname,
        "password":pass,
        "phone": phone
      },
      dataType: "json",
      success: function(data) {
        console.log(data);
        if(!data.bad) {
          sendLogin(uname, pass);
          return true;
        }
        else {
          alert("Error: " + data.errormsg);
          return false;
        }
      }
    });

}

function sendRegister(fname, lname, email, zip, uname, pass, phone) {
  $.ajax({
    url: "/branchout/scripting_stuff/createAccount.php",
    type: "post",
    data: {
      "firstname": fname,
      "lastname": lname,
      "email": email,
      "zipcode": zip,
      "username": uname,
      "password":pass,
      "phone": phone
    },
    dataType: "json",
    success: function(data) {
      console.log(data);
      if(!data.bad) {
        alert("Welcome " + fname + "!");
        window.location = "/branchout/dashboard.html";
        return true;
      }
      else {
        alert("Error: " + data.errormsg);
        return false;
      }
    }
  });
}

function login() {
  var username = document.getElementById('login_uname').value;
  var pass = document.getElementById('login_pass').value;
  if (username == '' || pass == '') {
    alert("Please Enter Username and Password");
  } else {
      sendLogin(username, pass);
    }
}

function sendLogin(uname, pass){
  $.ajax({
      url: "/branchout/scripting_stuff/login.php",
      type: "post",
      data: {
        'username': uname,
        'password': pass
      },
      dataType: "json",
      success: function(data) {
        if(data.bad == 'true') {
          alert(data.errormsg);
          return false;
        } else {
            alert("Welcome " + data.errormsg + "!");
            window.location="dashboard.html";
        }
      }
  });

}

function getNotifications() {
  $.ajax({
      url: "/branchout/scripting_stuff/pullNotifications.php",
      type: "get",
      dataType: "json",
      success: function(data) {
        if(data.bad) {
          alert(data.errormsg);
        } else {
          console.log(data);
          populateNotifications(data.results);
        }
      }
  });
}

function logout() {
  $.ajax({
      url: "/branchout/scripting_stuff/logout.php",
      type: "get",
      data: {
      },
      dataType: "json",
      success: function(data) {
        alert("Goodbye " + data.errormsg);
        window.location = "index.html";
      }
  });

}
