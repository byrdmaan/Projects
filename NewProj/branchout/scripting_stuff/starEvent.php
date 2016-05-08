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

$eventID = $_POST['eid'];
$userID = $_SESSION["userId"];

// $eventID = 5;
// $userID = 1;

$sql = "INSERT INTO interested VALUES($userID, '$eventID', 0, NULL);";
$query = mysqli_query($db, $sql);

$bad = "false";
$errormsg = "Nothing to see here";
$response = array("bad"=> $bad, "errormsg"=> $userID);
echo json_encode($response);


?>
