var bitcoinCalculator = angular.module('bitcoinCalculator', ['nvd3ChartDirectives']);
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

      $scope.xAxisTickFormatFunction = () => {
        return date => {
          return d3.time.format('%x')(new Date(date));
        };
      };

      $scope.bitcoinHistoricalData = [{
        'key': 'Prices',
        'values': values //use sample price data in prices.js
      }];
  });
});
