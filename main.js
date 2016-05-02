var bitcoinCalculator = angular.module('bitcoinCalculator', []);
bitcoinCalculator.controller('bitcoinController', ($scope, $http) => {
  $http.get('https://bitpay.com/api/rates')
    .success(data => {
      $scope.rates = data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].code == 'USD') {
          $scope.currRate = data[i].rate;
        }
      }
      $scope.initialAmt = 5000;
      $scope.newAmt = price => { return price / $scope.currRate * $scope.initialAmt; };
      $scope.profit = price => { return price / $scope.currRate * $scope.initialAmt - $scope.initialAmt; };
    });
});
