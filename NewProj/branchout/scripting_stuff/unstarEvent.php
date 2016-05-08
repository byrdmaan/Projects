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

$sql = "DELETE FROM interested WHERE userId = $userID AND eventId = '$eventID';";
mysqli_query($db, $sql);

$bad = "false";
$errormsg = "Nothing to see here";
$response = array("bad"=> $bad, "errormsg"=> $errormsg);
echo json_encode($response);

mysqli_close($db);
?>
