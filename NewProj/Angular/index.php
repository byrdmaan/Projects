<!DOCTYPE html>
<html lang="en-US" ng-app="myApp">
<head>

<meta http-equiv="Content-Type" content="text/html" charset ="utf-8" />
<title>Quench</title>

<!-- Google fonts -->
<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>

<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.js"></script>

<!-- Styles -->
<link rel="stylesheet" type="text/css" href="css/style.css">
<!-- Modules -->
<script src="js/app.js"></script>
<!-- Controllers -->
<script src="js/controllers/MainController.js"></script>
</head>


<body ng-app="myApp">
<div class="top">
Welcome to Quench
</div>


<div class="next">
<div ng-app="myApp">
 	<p>Where Are You Looking To Get Quenched : <input type="text" ng-model="Search"></p>
 	<h1>Drinks in {{Search}}</h1>
</div>
</div>



<div class="bottom" ng-controller="MainController">
<div class="testDrink">
<p class="title">{{ Title }}</p>
<div class="drink" ng-repeat="drink in drinks">
	<p class="name">{{ drink.name }}</p>
	<p class="price">{{ drink.price | currency}}</p>
	<p class="venue">{{ drink.venue }}</p>
	<br>
</div>
</div>

</div>


</body>
</html>