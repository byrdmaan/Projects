<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

session_start();
$db = new mysqli($servername, $username, $password, $dbname);
if ($db->connect_error)
{
    die("Connection failed: " . $db->connect_error);
}

$eventID = $_POST["eid"];
$userID = $_SESSION["userId"];

// $eventId = 10;
// $userId = 5;

if($_SESSION["LoggedIn"]=="true")
{
	$eventStarred = mysqli_query($db, "SELECT * FROM interested WHERE userId = '$userID' AND eventId = '$eventID'");
  $row = $eventStarred -> fetch_assoc();

	if ($row != NULL)
  {
		$response = array("bad"=>false, "errormsg"=>"Everything will be okay", "starred"=>true);
	}

  else
  {
		$response = array("bad"=>false, "errormsg"=>"Everything will be okay", "starred"=>false);
	}

}

else
{
	$response = array("bad"=>true, "errormsg"=>"User not logged in");
}

echo json_encode($response);
?>
