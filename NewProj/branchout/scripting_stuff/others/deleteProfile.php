<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

//setting and checking the database connection and session
session_start();
$db = new mysqli($servername, $username, $password, $dbname);
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

//Deleting profile if userID is set user is logged in
if(isset($_SESSION["userId"])) {
    $userId = $_SESSION["userId"];
    $query = "DELETE FROM registeredUser WHERE userId = '$userId'";
    $deleting = mysqli_query($db, $query);

    $query = "DELETE FROM interested WHERE userId = '$userId'";
    $deleting = mysqli_query($db, $query);

    $query = "DELETE FROM going WHERE userId = '$userId'";
    $deleting = mysqli_query($db, $query);


    //Deleting Users Events
    $sql = "SELECT eventId FROM events WHERE userId='$userId'";
    $result = mysqli_query($database, $sql);

    while($eventIds = $result -> fetch_assoc())
    {
        $eventId = $eventIds['eventId'];
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

            $sql = "UPDATE interested SET valueChanged = 'deleted' WHERE eventId = '$eventId';";
            $query = mysqli_query($db, $sql);
        }
    }

    session_destroy();
    $bad = "false";
    $errormsg = "N/A";
} else {
	$bad = "true";
	$errormsg = "Wasn't deleted";
}

$response = array("bad"=>$bad, "errormsg"=>$errormsg);
echo json_encode($response);
?>
