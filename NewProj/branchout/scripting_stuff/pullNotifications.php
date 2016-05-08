<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";


//checking connection
session_start();
$database = new mysqli($servername, $username, $password, $dbname);
if ($database->connect_error)
    die("Connection failed: " . $database->connect_error);

$userId = $_SESSION["userId"];
// $userId = 7;
$results =[];


$sql = "SELECT eventId FROM interested WHERE changed=TRUE AND userId = '$userId';";
$result = mysqli_query($database, $sql);

while($eventIds = $result -> fetch_assoc())
{
  $eventId = $eventIds['eventId'];
  $changesArray = [];

  $sql = "SELECT valueChanged FROM events WHERE eventId = '$eventId';";
  $findchangedValuesStr = mysqli_query($database, $sql);
  $row = $findchangedValuesStr -> fetch_assoc();
  $changedValuesStr = $row['valueChanged'];
  $changedValueArray = explode(", ",$changedValuesStr);

  $findEventName = mysqli_query($database, "SELECT eventName FROM events WHERE eventId = '$eventId' ");
  $row = $findEventName -> fetch_assoc();
  $eventName = $row['eventName'];

  $findValue = mysqli_query($database, "SELECT eventDate FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $eventDate = $row['eventDate'];

  $findValue = mysqli_query($database, "SELECT startTime FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $startTime = $row['startTime'];

  $findValue = mysqli_query($database, "SELECT endTime FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $endTime = $row['endTime'];

  $findValue = mysqli_query($database, "SELECT venue FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $venue = $row['venue'];

  $findValue = mysqli_query($database, "SELECT street FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $street= $row['street'];

  $findValue = mysqli_query($database, "SELECT city FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $city = $row['city'];

  $findValue = mysqli_query($database, "SELECT zipcode FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $zipcode = $row['zipcode'];

  $findValue = mysqli_query($database, "SELECT description FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $desc = $row['description'];

  $findValue = mysqli_query($database, "SELECT image FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $image = $row['image'];

  $notification = array("eid" => $eventId, "eventName" => $eventName, "eventDate"=>$eventDate,"startTime"=>$startTime,"endTime"=>$endTime, "venue"=>$venue,"street"=>$street,"city"=>$city,"zip"=>$zipcode, "price"=>$price, "desc"=>$desc, "image"=>$image, "changes"=>$changedValueArray);
  array_push($results,$notification);

  $sql = "UPDATE interested SET changed = FALSE WHERE eventId = '$eventId' AND userId = '$userId';";
  $query = mysqli_query($database, $sql);
}

$response = array("bad"=>false, "errormsg"=>"You're not allowed to leave", "results"=>$results);
echo json_encode($response);
?>
