// Load the custom app ES6 modules
'use strict';

import angular from 'angular';

// Define the AngularJS 'about' module

export default angular
        .module("about", ['ngMaterial'])
        .component('about', {
            template: '<h3>About us</h3>',
            controller: function ($scope) {
                console.log('About controller');
            }
        });
