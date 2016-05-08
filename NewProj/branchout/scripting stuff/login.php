<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "burrito";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$username = $_POST['username'];
$password = $_POST['password'];

$query = mysqli_query($conn, "SELECT * FROM Users where username='$username' AND password='$password'");

$rows = mysqli_num_rows($query);
// echo $rows;
if ($rows >= 1)
{
	$bad = "false";
	$errormsg = "NA";

	//eileen added
  $blah = $query->fetch_assoc();
	$email = $blah['email'];

}
else
{
	$bad = "true";
	$errormsg = "Username or Password is invalid";
}


//eileen added
session_start();
$_SESSION["LoggedIn"] = "true";
$_SESSION["username"] = $username;
$_SESSION["email"] = $email;


$arr = array("bad"=>$bad, "errormsg"=>$errormsg);

echo json_encode($arr);



?>
