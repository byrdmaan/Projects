<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

//checking connection
session_start();
$database = new mysqli($servername, $username, $password, $dbname);
if ($database->connect_error)
{
  die("Connection failed: " . $database->connect_error);
}

//checked if logged in
if ($_SESSION["LoggedIn"]=="true")
{
  $lastname = $_SESSION["lName"];
  $firstname = $_SESSION['fName'];
	$response = array("bad"=>"false", "errormsg"=>"$firstname $lastname");
}

else
{
	$response = array("bad"=>"true", "errormsg"=>"User not logged in");
}

echo json_encode($response);
?>
