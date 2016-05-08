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

//------------------------------------------
//-- ACTUAL POSTED AND SESSION VALUES
//------------------------------------------
$userId = $_SESSION["userId"];
$eventId = $_POST['eid'];
$eventName = $_POST['eventName'];
$eventDate = $_POST['eventDate'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$venue = $_POST['venue'];
$street = $_POST['address'];
$city = $_POST['city'];
$zipcode = $_POST['zip'];
$description = $_POST['desc'];
$image = $_POST['image'];

$cost = $_POST['price'];
$catName = $_POST['category'];

//------------------------------------------
//-- TEST VALUES
//------------------------------------------
// $userId = 1;
// $eventId = 10;
// $eventName = "";
// $eventDate ="";
// $startTime =  "";
// $endTime = "";
// $venue = "who am I";
// $street = "";
// $city = "";
// $zipcode = NULL;
// $description = "";
// $image = "";

// $cost = "";
// $catName = array();
//--------------------------------------------

$changedValues = array();

if($eventName && $eventName != '')
{
  $findEventName = mysqli_query($db, "SELECT eventName FROM events WHERE eventId = '$eventId' ");
  $row = $findEventName -> fetch_assoc();
  $eName = $row['eventName'];

  if($eName != $eventName) {
    $sql = "UPDATE events SET eventName = '$eventName' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'EventName');
  }
}

if($eventDate && $eventDate != '')
{
  $findValue = mysqli_query($db, "SELECT eventDate FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $eDate = $row['eventDate'];
  if($eDate != $eventDate) {
    $sql = "UPDATE events SET eventDate = '$eventDate' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'EventDate');
  }
}

if($startTime && $startTime != '')
{
  $findValue = mysqli_query($db, "SELECT startTime FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $sTime = $row['startTime'];

  if($sTime != $startTime) {
    $sql = "UPDATE events SET startTime = '$startTime' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'StartTime');
  }
}

if($endTime && $endTime != '')
{
  $findValue = mysqli_query($db, "SELECT endTime FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $eTime = $row['endTime'];

  if($eTime != $endTime) {
    $sql = "UPDATE events SET endTime = '$endTime' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'EndTime');
  }
}

if($venue && $venue != '')
{
  $findValue = mysqli_query($db, "SELECT venue FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $v = $row['venue'];

  if($v != $venue) {
    $sql = "UPDATE events SET venue = '$venue' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'Venue');
  }
}

if($street && $street != '')
{
  $findValue = mysqli_query($db, "SELECT street FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $s= $row['street'];

  if($s != $street) {
    $sql = "UPDATE events SET street = '$street' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'Street');
  }
}

if($city && $city != '')
{
  $findValue = mysqli_query($db, "SELECT city FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $c = $row['city'];

  if($c != $city) {
    $sql = "UPDATE events SET city = '$city' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'City');
  }
}

if($zipcode && $zipcode != '')
{
  $findValue = mysqli_query($db, "SELECT zipcode FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $zip = $row['zipcode'];

  if($zip != $zipcode) {
    $sql = "UPDATE events SET zipcode = '$zipcode' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'Zipcode');
  }
}

if($description && $description != '')
{
  $findValue = mysqli_query($db, "SELECT description FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $desc = $row['description'];

  if($desc != $description) {
    $sql = "UPDATE events SET description = '$description' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'Description');
  }
}

if($image && $image != '')
{
  $findValue = mysqli_query($db, "SELECT image FROM events WHERE eventId = '$eventId' ");
  $row = $findValue -> fetch_assoc();
  $img = $row['image'];

  if($img != $image) {
    $sql = "UPDATE events SET image = '$image' WHERE eventId = '$eventId' AND userId = '$userId';";
    $query = mysqli_query($db, $sql);
    array_push($changedValues, 'Image');
  }
}


//--------------------------------
//Adjusting category
//--------------------------------
if($catName && $catName != '')
{

  $sql = "DELETE FROM category_selected WHERE eventId = '$eventId' AND catId != 8 AND catId != 9 AND catId != 10 AND catId != 11;";
  $query = mysqli_query($db, $sql);
  array_push($changedValues, 'Category');

  $NumberOfCats = count($catName);


  $count = 0;
  //  $freshtoppingID = mysql_result(  $findfreshtoppingID, 0);

  while($count < $NumberOfCats)
  {
    $currentCategory = $catName[$count];

    $sql = "SELECT catId FROM category_options WHERE catName = '$currentCategory';";
    $query = mysqli_query($db, $sql);

    $row = $query -> fetch_assoc();
    $currentCatId = $row['catId'];

    mysqli_query($db, "INSERT INTO category_selected values ('$eventId', '$currentCatId');");
    $count++;
  }
}


//----------------------------------------
//Delete Existing Cost categories
//----------------------------------------

if($cost && $cost != '')
{
  $sql = "SELECT catId FROM category_options WHERE catName = '$cost';";
  $query = mysqli_query($db, $sql);
  array_push($changedValues, 'Cost');
  $row = $query->fetch_assoc();
  $newCostId = $row['catId'];

  $sql = "DELETE FROM category_selected WHERE eventId = '$eventId' AND catId = 8;";
  $query = mysqli_query($db, $sql);
  $sql = "DELETE FROM category_selected WHERE eventId = '$eventId' AND catId = 9;";
  $query = mysqli_query($db, $sql);
  $sql = "DELETE FROM category_selected WHERE eventId = '$eventId' AND catId = 10;";
  $query = mysqli_query($db, $sql);
  $sql = "DELETE FROM category_selected WHERE eventId = '$eventId' AND catId = 11;";
  $query = mysqli_query($db, $sql);

  $sql = "INSERT INTO category_selected VALUES($eventId, $newCostId);";
  $query = mysqli_query($db, $sql);
}

if($changedValues)
{
  $sql = "UPDATE interested SET changed = 1 WHERE eventId = '$eventId';";
  $query = mysqli_query($db, $sql);

  $NumberOfChanges = count($changedValues);

  //if($NumberOfChanges <= 3)
    $writtenChange = implode(", ", $changedValues);

  //if($NumberOfChanges > 3)
    //$writtenChange = "Many";

  $sql = "UPDATE events SET valueChanged = '$writtenChange' WHERE eventId = '$eventId';";
  $query = mysqli_query($db, $sql);
}

$bad = "false";
$errormsg = "none";
$response = array("bad"=> $bad, "errormsg"=> $errormsg);
echo json_encode($response);

mysqli_close($db);
?>
