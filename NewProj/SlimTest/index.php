<!DOCTYPE html>
<html lang="en-US" ng-app="myApp">
<head>

<meta http-equiv="Content-Type" content="text/html" charset ="utf-8" />
<title>Quench</title>

<!-- Google fonts -->
<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Quattrocento:400,700' rel='stylesheet' type='text/css'>

<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

<!-- Regular JS -->
<script src="js/getCity.js" type="text/javascript"></script>

<!-- Styles -->
<link rel="stylesheet" type="text/css" href="css/style.css">
<!-- Modules -->
<script src="js/app.js"></script>
<!-- Controllers -->
<script src="js/controllers/MainController.js"></script>
</head>


<body ng-app="myApp">



<!--
<div class="next">
<form method="post">
<div ng-app="myApp">
 	<h1>Know a drink?</h1>
 	<p>Where : <input type="text" ng-model="cityName" id="cityName"></p>
 	<p>What Kind : <input type="text" ng-model="drinkName" id="drinkName"></p>
 	<p>How Much in Dollars : <input type="text" ng-model="drinkPrice" id="drinkPrice"></p>
 	<h1><a href="">A {{drinkName}} in {{cityName}} costs {{drinkPrice}} dollars</a></h1>
 	<button id="mine" onclick="getCity()">Input Into Database</button>
</div>
</form>
</div>



<div class="bottom" ng-controller="MainController">
<div class="testDrink">
<p class="title">{{ Title }}</p>
<table border="1">
<tr>
	<th>name</th>
	<th>price</th>
	<th>venue</th>
</tr>
<tr ng-repeat="drink in drinks">
	<td class="name">{{ drink.name }}</td>
	<td class="price">{{ drink.price | currency}}</td>
	<td class="venue">{{ drink.venue }}</td>
</tr>
</table>
</div>


</div>
-->





</body>
</html>