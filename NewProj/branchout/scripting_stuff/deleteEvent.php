<?php
$servername = "localhost";
$username = "root";
$password = "Buzzzzzz2";
$dbname = "BranchOut";

session_start();
$db = new mysqli($servername, $username, $password, $dbname);
if ($db->connect_error)
{
    die("Connection failed: " . $db->connect_error);
}

//$eventId = $_POST['eventId'];
$eventId = 12;

if ($eventId != NULL)
{
	$query = "DELETE FROM events WHERE eventId = '$eventId'";
    $deleting = mysqli_query($db, $query);

    $query = "DELETE FROM going WHERE eventId = '$eventId'";
    $deleting = mysqli_query($db, $query);

    $query = "DELETE FROM category_selected WHERE eventId = '$eventId'";
    $deleting = mysqli_query($db, $query);

    $sql = "UPDATE interested SET changed = 1 WHERE eventId = '$eventId';";
    $query = mysqli_query($db, $sql);

    // $sql = "UPDATE interested SET valueChanged = "deleted" WHERE eventId = '$eventId';";
    // $query = mysqli_query($db, $sql);

	$bad = "false";
    $errormsg = "N/A";
}
else
{
	$bad = "true";
	$errormsg = "Wasn't deleted";
}

$response = array("bad"=>$bad, "errormsg"=>$errormsg);
echo json_encode($response);
?>