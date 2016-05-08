<?php
$sql = mysql_query("SELECT * FROM Orders limit 20");

$response = array();
$posts = array();
$result = mysql_query($sql);
while($row = mysql_fetch_array($result))
{
	$orderID = $row['orderID'];
	$userID = $row['userID'];
	$status = $row['status'];
	$totalPrice = $row['totalPrice'];

	$posts[] = array('orderID'=>$orderID, 'userID'=>$userID, 'status'=>$status, 'totalPrice'=>$totalPrice);

}

$response['orders'] = $posts;

$fp = fopen('results.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);

?>