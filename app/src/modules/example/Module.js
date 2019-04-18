// Load the custom app ES6 modules
'use strict';

import angular from 'angular';

import FruitsModule from 'src/modules/fruits/Module';

// Define the AngularJS 'example' module

export default angular
        .module("example", [
            FruitsModule.name
        ])
        .component('example', {
            templateUrl: './src/modules/example/Example.html',
            controller: function ($scope, FruitsDataService) {

                $scope.selected = null;
                $scope.fruits = [];
                $scope.selectFruit = selectFruit;

                /**
                 * Select the current avatars
                 * @param menuId
                 */
                function selectFruit(fruit) {
                    $scope.selected = angular.isNumber(fruit) ? $scope.fruits[fruit] : fruit;
                }

                // Load all registered fruits
                FruitsDataService
                        .loadAllFruits()
                        .then(function (fruits) {
                            $scope.fruits = [].concat(fruits);
                            $scope.selected = fruits[0];
                        });

            }
        });
