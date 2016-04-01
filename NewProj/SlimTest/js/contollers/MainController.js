app.controller('MainController', ['$scope', function($scope) { 
  $scope.Title = 'Quench';
  $scope.day = 'Tuesday';
  $scope.drink =
  {
  	name: 'mojito',
  	venue: 'Ozonas',
  	price: 18
  };
}
]);