<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "Quench";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
{
	die("Connection failed: " . $conn->connect_error);
}

$cityName = $_POST['cityName'];
$drinkName= $_POST['drinkName'];
$drinkPrice = $_POST['drinkPrice'];

$sql = "INSERT INTO drink VALUES ('$drinkName','$cityName','$drinkPrice')";
mysqli_query($conn, $sql);
$response = array("bad"=>false, "errormsg"=>"Your event has been created!");
echo json_encode($response);
?>