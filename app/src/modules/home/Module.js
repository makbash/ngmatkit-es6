// Load the custom app ES6 modules
'use strict';

import angular from 'angular';

// Define the AngularJS 'home' module

export default angular
    .module("home", ['ngMaterial', 'ngStorage'])
    .component('home', {
        templateUrl: './src/modules/home/home.html',
        controller: function ($scope, $log, $http, $localStorage) {
            $log.info('Home controller');

            const vm = this;

            vm.title = 'Home Page Title';

            vm.token = '';
            if ($localStorage.currentUser) {
                vm.token = $localStorage.currentUser.token;
            }

            vm.getUserInfo = () => {
                $http.defaults.headers.common.Authorization = 'Bearer ' + vm.token;
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/api/v1/user/profile'
                }).then((res) => {
                    $log.info(res.data);
                    vm.resData = res.data;
                }, (err) => {
                    $log.error(err);
                    vm.resData = err.data;
                });
            };
        }
    });
