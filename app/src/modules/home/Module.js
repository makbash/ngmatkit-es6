// Load the custom app ES6 modules
'use strict';

import angular from 'angular';

// Define the AngularJS 'home' module

export default angular
        .module("home", ['ngMaterial'])
        .component('home', {
            templateUrl: './src/modules/home/home.html',
            controller: function ($scope) {
                console.log('Home controller');
            }
        });
