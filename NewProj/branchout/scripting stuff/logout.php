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

//checked if logged in
if ($_SESSION["LoggedIn"]=="true")
{
	session_destroy();
	$response = array("bad"=>false, "errormsg"=>"N/A");
} else {
	$response = array("bad"=>true, "errormsg"=>"You're not allowed to leave");
}

echo json_encode($response);

?>
