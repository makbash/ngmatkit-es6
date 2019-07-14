// Load the custom app ES6 modules
'use strict';

import angular from 'angular';

// Define the AngularJS 'home' module

export default angular
        .module("login", ['ngMaterial'])
        .component('login', {
            templateUrl: './src/modules/login/login.html',
            controller: function ($scope, $location, AuthenticationService) {
                console.log('login controller');
                const vm = this;

                vm.login = login;

                // reset login status
                AuthenticationService.Logout();

                function login() {
                    vm.loading = true;
                    AuthenticationService.Login(vm.username, vm.password, function (res) {
                        if (res === true) {
                            $location.path('/home');
                        } else {
                            vm.error = res.message;
                            vm.loading = false;
                        }
                    });
                }
                ;
            }
        });