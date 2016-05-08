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

$followingId = $_POST['followingId'];

//checked if logged in
if ($_SESSION["LoggedIn"]=="true") {
	$userId = $_SESSION["userId"];
	$following = mysqli_query($database, "SELECT COUNT(*) FROM following WHERE userId = '$userId' AND followingId = '$followingId'");
	if ($following > 0) {
		$unfollow = mysqli_query($database, "DELETE FROM following WHERE userId = '$userId' AND followingId = '$followingId'";
	} else {
		$follow = mysqli_query($database, "INSERT INTO following(userId, followingId) VALUES ('$userId', '$followingId')";
	}

	$response = array("bad"=>false, "errormsg"=>"N/A");
} else {
	$response = array("bad"=>true, "errormsg"=>"User not logged in");
}

echo json_encode($response);
?>