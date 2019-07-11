// Load the custom app ES6 modules
'use strict';

import angular from 'angular';

// Define the AngularJS 'home' module

export default angular
        .module("login", ['ngMaterial'])
        .component('login', {
            templateUrl: './src/modules/login/login.html',
            controller: function ($scope) {
                console.log('login controller');
            }
        });
