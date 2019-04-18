// Load libraries
import angular from 'angular';

import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import Routes from 'src/config/routes';
import AppController from 'src/AppController';

import Home from './modules/home/Module';
import Example from './modules/example/Module';
import About from './modules/about/Module';
import Users from './modules/users/Module';

export default angular
        .module('starter-app', ['ngMaterial', 'ui.router',
            Home.name,
            Example.name,
            About.name,
            Users.name
        ])
        .config(($mdThemingProvider, $mdIconProvider, $locationProvider, $stateProvider) => {
//            console.log('About.name', About.name);

            // Loop over the state definitions and register them
            Routes.forEach(function (state) {
                $stateProvider.state(state);
            });


            // Register the user `avatar` icons
            $mdIconProvider
                    .defaultIconSet("./assets/svg/avatars.svg", 128)
                    .icon("menu", "./assets/svg/menu.svg", 24)
                    .icon("share", "./assets/svg/share.svg", 24)
                    .icon("google_plus", "./assets/svg/google_plus.svg", 24)
                    .icon("hangouts", "./assets/svg/hangouts.svg", 24)
                    .icon("twitter", "./assets/svg/twitter.svg", 24)
                    .icon("phone", "./assets/svg/phone.svg", 24);

            $mdThemingProvider.theme('default')
                    .primaryPalette('blue')
                    .accentPalette('red');

//            $locationProvider.html5Mode(true);
            $locationProvider.html5Mode({
                enabled: false,
                requireBase: true
            });

        })
        .run(['$log', ($log) => {
                $log.info("app started");
            }
        ])
        .controller('AppController', AppController);
