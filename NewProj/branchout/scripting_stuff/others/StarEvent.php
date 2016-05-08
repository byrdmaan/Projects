<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

//checking connection
session_start();
$database = new mysqli($servername, $username, $password, $dbname);
if ($database->connect_error) {
    die("Connection failed: " . $database->connect_error);
}

$eventId = $_POST['eid'];

//checked if logged in
if ($_SESSION["LoggedIn"]=="true") {
	$userId = $_SESSION["userId"];
	$eventStarred = mysqli_query($database, "SELECT COUNT(*) FROM interested WHERE userId = '$userId' AND eventId = '$eventId'");
	if ($eventStarred > 0) {
		$unstar = mysqli_query($database, "DELETE FROM interested WHERE userId = '$userId' AND eventId = '$eventId'";
	} else {
		$star = mysqli_query($database, "INSERT INTO interested(userId, eventId, changed) VALUES ('$userId', '$eventId', FALSE)";
	}

	$response = array("bad"=>false, "errormsg"=>"N/A");
} else {
	$response = array("bad"=>true, "errormsg"=>"User not logged in");
}

echo json_encode($response);
?>
