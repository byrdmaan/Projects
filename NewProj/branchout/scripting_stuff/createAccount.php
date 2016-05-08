
<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

//checking connection
$database = new mysqli($servername, $username, $password, $dbname);
if ($database->connect_error)
    die("Connection failed: " . $database->connect_error);


// $regUsername = 'Mamma Jamma Slim Slamma';
// $fName = 'Jimbo';
// $lName = 'Mamma Jamma';
// $email = 'BeepMeIfYouWannaReachMe@gmail.com';
// $password = 'dogsarecool';
// $zipcode = 78746;
// $phone = 5129097234;



//--------------------------------------------
//-- check if email is new
//--------------------------------------------

$regUsername = $_POST['username'];
$fName = $_POST['firstname'];
$lName = $_POST['lastname'];
$email = $_POST['email'];
$password = $_POST['password'];
$zipcode = $_POST['zipcode'];
$phone = $_POST['phone'];

$emailTaken = false;
$usernameTaken = false;

//--------------------------------------------
//-- check if email is new
//--------------------------------------------

$sql = "SELECT * FROM registeredUser WHERE email = '$email';";
$currentEmail = mysqli_query($database, $sql);
if($currentEmail->num_rows > 0)
{
	$emailTaken = true;
	$response = array("bad"=>true, "errormsg"=>"Email is already taken! #BeMoreOriginal");
}

//--------------------------------------------
//-- check if username is new
//--------------------------------------------

$sql = "SELECT * FROM registeredUser WHERE username = '$regUsername';";
$currentUsername = mysqli_query($database, $sql);
if($currentUsername->num_rows > 0)
{
	$usernameTaken = true;
	$response = array("bad"=>true, "errormsg"=>"Username is already taken! #BeBetter");
}

//--------------------------------------------
//-- input username info
//--------------------------------------------


if($emailTaken == false && $usernameTaken == false)
{
	//email isn't taken; putting info into the data base
  $rating = 5;
	$createUser = $database->prepare("INSERT INTO registeredUser (username, fname, lname, email, password, zipcode, rating, phone) VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
	$createUser->bind_param('sssssiis', $regUsername, $fName, $lName, $email, $password, $zipcode, $rating, $phone);
	$createUser->execute();
	$createUser->close();
  $response = array("bad"=>false, "errormsg"=>"N/A");

}

//response is sent
if($emailTaken == true && $usernameTaken == true)
{
	$response = array("bad"=>true, "errormsg"=>"Email and Username are already taken! #GitchaYourHeadInTheGame");
}


echo json_encode($response);


?>
