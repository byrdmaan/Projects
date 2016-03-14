var myApp = angular.module("myApp", []).controller('MainController', ['$scope', function($scope) { 
  $scope.Title = 'Quench';
  $scope.day = 'Tuesday';
  $scope.drinks =
  [
  {
  	name: 'mojito',
  	venue: 'Ozonas',
  	price: 18
  },
  {
  	name: 'marg',
  	venue: 'myhouse',
  	price: 2
  }
  ];
}
]);