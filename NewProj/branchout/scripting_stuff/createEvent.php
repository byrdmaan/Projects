
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

//Info into variables
$eventName = $_POST['eventName'];
$userId = $_SESSION['userId'];
$eventDate = $_POST['eventDate'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$description = $_POST['desc'];
$street = $_POST['address'];
$city = $_POST['city'];
$zip = $_POST['zip'];
$image = $_POST['image']; 
$venue = $_POST['venue'];

//----------------------------
// TEST VALUES 
//----------------------------
// $eventName = "Lemonade Party";
// $userId = 2;
// $eventDate = "2015-12-1";
// $startTime = "8:00";
// $endTime = NULL;
// $description = "Come Hang";
// $street = "Sleazy Street";
// $city = "Austin";
// $zip = "56534";
// $image = "image up in here"; 
// $venue = "mi casa";
// $cost = "$";
// $categories = ["alcohol"];
//-----------------------------

$newEvent = "INSERT INTO events(userId, eventName, eventDate, startTime, endTime, description, street, city, zipcode, image, venue) values('$userId', '$eventName', '$eventDate', '$startTime', '$endTime', '$description', '$street', '$city', '$zip', '$image', '$venue')";
mysqli_query($database, $newEvent);

// Getting new Event ID
$findEventId = mysqli_query($database, "SELECT eventId FROM events WHERE userId='$userId' AND eventName='$eventName'");
$row = $findEventId -> fetch_assoc();
$eventId = $row['eventId'];

//---------------------------------------------------------------IMPORTANT catID or catId? currently using catId

$cost = $_POST['price'];
$categories = $_POST['category'];

//Adding all categories
$numCats = count($categories);
$count = 0;
while($count < $numCats)
{
  $currCat = $categories[$count];
  $getCatId = mysqli_query($database, "SELECT catId FROM category_options WHERE catName = '$currCat'");
  $row = $getCatId -> fetch_assoc();
  $catId = $row['catId'];

  mysqli_query($database, "INSERT INTO category_selected VALUES ('$eventId', '$catId')");
  $count++;
}

//Adding the cost 
$getCatId = mysqli_query($database, "SELECT catId FROM category_options WHERE catName = '$cost'");
$row = $getCatId -> fetch_assoc();
$catId = $row['catId'];
mysqli_query($database, "INSERT INTO category_selected VALUES('$eventId', '$catId')");

//-----------------------------------------------------------------------------------------------------------

$response = array("bad"=>false, "errormsg"=>"Your event has been created!");
echo json_encode($response);
?>
