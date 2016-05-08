<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

//setting and checking the database connection and session
session_start();
$db = new mysqli($servername, $username, $password, $dbname);
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

//pulling info
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$username = $_POST['username'];
$zipcode = $_POST['zipcode'];

// updating if userID is set user is logged in
if(isset($_SESSION["userId"])) {
    $userId = $_SESSION["userId"];
    $query = "UPDATE registeredUser SET fName = '$fname', lName = '$lname', email = '$email', phone = '$phone', username = '$username', zipcode = '$zipcode' WHERE userId = '$userId'";
    $updating = mysqli_query($db, $query);
    $_SESSION["email"] = $email;
    $_SESSION["fName"] = $fname;
    $_SESSION['lName'] = $lname;

    $bad = "false";
    $errormsg = "N/A";
} else {
	$bad = "true";
	$errormsg = "You done messed up";
}

$response = array("bad"=>$bad, "errormsg"=>$errormsg);
echo json_encode($response);
?>
