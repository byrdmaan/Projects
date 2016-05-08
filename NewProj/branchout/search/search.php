<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BranchOut";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
session_start();
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$smallQuery = $_GET['query'];
$queryList = explode(" ", $smallQuery);

$query = mysqli_query($conn, "SELECT * FROM events");
$rows = mysqli_num_rows($query);

if ($rows >= 1)
{
	$bad = "false";
  	$errormsg = "NA";
  	for ($x = 0; $x < $rows; $x++)
  	{
      $mine = $query->fetch_assoc();
      $catId = array();
      $catName = array();
  		$userId = $mine['userId'];
  		$eventId = $mine['eventId'];
  		$eventName = $mine['eventName'];
  		$eventDate = $mine['eventDate'];
  		$startTime = $mine['startTime'];
  		$endTime = $mine['endTime'];
  		$numFlags = $mine['numFlags'];
  		$venue = $mine['venue'];
  		$street = $mine['street'];
  		$city = $mine['city'];
  		$zipcode = $mine['zipcode'];
  		$description = $mine['description'];
  		$image = $mine['image'];



      $query2 = mysqli_query($conn, "SELECT * FROM category_selected WHERE eventId = '$eventId'");
      $rows2 = mysqli_num_rows($query2);
      //echo $rows2;
      for ($z = 0; $z < $rows2; $z++)
      {
        $mine2 = $query2->fetch_assoc();
        $catId[] = $mine2['catId'];
        //echo $mine2['catId'], "\n";
      }
      //echo "\n";
      for ($z = 0; $z < sizeof($catId); $z++ )
      {

        $newthing = $catId[$z];
        $query3 = mysqli_query($conn, "SELECT * FROM category_options WHERE catId = '$newthing'");
        $mine3 = $query3->fetch_assoc();
        $catName[$z] = $mine3['catName'];
        if($catName[$z] == 'free' || $catName[$z] == '$' || $catName[$z] == '$$' || $catName[$z] == '$$$')
        {
          if($catName[$z] == 'free')
            $price = 'free';

          if($catName[$z] == '$')
            $price = '$';

          if($catName[$z] == '$$')
            $price = '$$';

          if($catName[$z] == '$$$')
            $price = '$$$';
        }
      }
  		$otherArr = array("userId"=>$userId, "eventId"=>$eventId, "eventName"=>$eventName, "eventDate"=>$eventDate, "startTime"=>$startTime, "endTime"=>$endTime, "numFlags"=>$numFlags,"venue"=>$venue, "street"=>$street, "city"=>$city, "zipcode"=>$zipcode, "price"=>$price, "desc"=>$description, "image"=>$image, "category"=>$catName);
  		for ($y = 0; $y < sizeof($queryList); $y++)
  		{
        $pos = false;
        $pos2 = 1;
        $description = trim($description);
        $eventName2 = trim($eventName);
        $queryList[$y] = trim($queryList[$y]);
  			$pos = strpos($description, $queryList[$y]);
  			if($pos !== False)
  			{
          break;
  			}
        $pos = strpos($eventName2, $queryList[$y]);
        if($pos !== False)
        {
          break;
        }
  			$pos2 = strcmp($description, $queryList[$y]);
  			if($pos2 == 0)
  			{
          break;
  			}
        $pos2 = strcmp($eventName2, $queryList[$y]);
        if($pos2 == 0)
        {
          break;
        }
  		}
  		if ($pos !== False)
  		{
  			$eventArr[] = $otherArr;
  		}
      if ($pos2 == 0)
      {
        $eventArr[] = $otherArr;
      }
	}
}
else
{
	$bad = "false"; //don't want an error on empty result set
	$errormsg = "Invalid";
}

/*if (is_null($eventArr))
/{
  $bad = "true";
  $errormsg = "Invalid";
}*/

$arr = array("bad"=>$bad, "errormsg"=>$errormsg, "results"=>$eventArr);
echo json_encode($arr);
