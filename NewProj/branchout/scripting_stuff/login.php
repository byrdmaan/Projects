<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

//setting and checking the database connection
$db = new mysqli($servername, $username, $password, $dbname);
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

//looking for user in DB using email and password
$username = $_POST['username'];
$password = $_POST['password'];
$query = mysqli_query($db, "SELECT * FROM registeredUser WHERE username='$username' AND password='$password'");
$rows = mysqli_num_rows($query);

if ($rows >= 1) {
	$bad = "false";


	//Pulling User information for future identification
  	$user = $query->fetch_assoc();
	  $userId = $user['userId'];
    $email = $user['email'];
    $errormsg = $user['fName'];
    $last_name = $user['lName'];
    session_start();
    $_SESSION["LoggedIn"] = "true";
    $_SESSION["userId"] = $userId;
    $_SESSION["email"] = $email;
    $_SESSION["fName"] = $errormsg;
    $_SESSION['lName'] = $last_name;

} else {
	$bad = "true";
	$errormsg = "Username or Password is invalid";
}

$response = array("bad"=>$bad, "errormsg"=>$errormsg);
echo json_encode($response);
?>
