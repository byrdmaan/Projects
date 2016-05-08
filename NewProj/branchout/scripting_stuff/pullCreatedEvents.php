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
// $userId = 6;
$results =[];

$sql = "SELECT eventId FROM events WHERE userId='$userId' ";
$result = mysqli_query($database, $sql);

while($eventIds = $result -> fetch_assoc())
{
  $allCategories = [];
  $eventId = $eventIds['eventId'];

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

  $findValue = mysqli_query($database, "SELECT catId FROM category_selected WHERE eventId = '$eventId' ");

  while($row = $findValue -> fetch_assoc())
  {
    $category = $row['catId'];
    $findCategoryName = mysqli_query($database, "SELECT catName FROM category_options WHERE catId = '$category' ");
    $row = $findCategoryName -> fetch_assoc();
    $categoryName = $row['catName'];

    if($categoryName == 'free' || $categoryName == '$' || $categoryName == '$$' || $categoryName == '$$$')
    {
      if($categoryName == 'free')
        $price = 'free';

      if($categoryName == '$')
        $price = '$';

      if($categoryName == '$$')
        $price = '$$';

      if($categoryName == '$$$')
        $price = '$$$';
    }

    else
    {
      array_push($allCategories, $categoryName);
    }

  }

  $event = array("eventId" => $eventId, "eventName" => $eventName, "eventDate"=>$eventDate,"startTime"=>$startTime,"endTime"=>$endTime, "venue"=>$venue,"street"=>$street,"city"=>$city,"zip"=>$zipcode, "price"=>$price, "desc"=>$desc, "image"=>$image, "category"=>$allCategories);
  array_push($results,$event);
}

$response = array("bad"=>false, "errormsg"=>"Yay events yay", "results"=>$results);
echo json_encode($response);
?>
