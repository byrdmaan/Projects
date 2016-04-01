var myApp = angular.module("myApp", []).controller('MainController', ['$scope', function($scope) { 
  $scope.Title = 'Quench';
  $scope.day = 'Tuesday';
  $scope.drinks =
  [
  {
  	name: 'Mojito',
  	venue: 'Parliment',
  	price: 8
  },
  {
  	name: 'Frozen Margarita',
  	venue: 'Ozonas',
  	price: 2
  }
  ];
}
]);