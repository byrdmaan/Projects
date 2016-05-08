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

// updating if userID is set user is logged in
if(isset($_SESSION["userId"])) {
    $userId = $_SESSION["userId"];
    $query = "SELECT * from registeredUser where userId = '$userId'";
    $select = mysqli_query($db, $query);
    $row = $select->fetch_assoc();
    // fname = '$fname', lname = '$lname', email = '$email', password = '$password', username = '$username', zipcode = '$zipcode'
    $firstname = $row["fName"];
    $lastname = $row["lName"];
    $username = $row["username"];
    $email = $row["email"];
    $zipcode = $row["zipcode"];
    $phone = $row["phone"];


} else {

}

$response = array("firstname"=>$firstname, "lastname"=>$lastname, "email"=>$email, "username"=>$username, "zipcode"=>$zipcode, "phone"=>$phone );
echo json_encode($response);
?>
