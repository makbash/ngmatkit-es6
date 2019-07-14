// Load libraries
import angular from 'angular';

import '@uirouter/core';
import 'angular-ui-router';

import 'angular-messages';
import 'gsklee/ngStorage';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import Routes from 'src/config/routes';
import AppController from 'src/AppController';

import Login from './modules/login/Module';
import Home from './modules/home/Module';
import Example from './modules/example/Module';
import About from './modules/about/Module';
import Users from './modules/users/Module';

export default angular
        .module('starter-app', ['ngMaterial', 'ui.router', 'ngMessages', 'ngStorage',
            Home.name,
            Example.name,
            About.name,
            Users.name,
            Login.name
        ])
        .config(($mdThemingProvider, $mdIconProvider, $locationProvider, $stateProvider, $urlRouterProvider) => {
            // default route
            $urlRouterProvider.otherwise("/");

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

            //$locationProvider.html5Mode(true);
            $locationProvider.html5Mode({
                enabled: false,
                requireBase: true,
                rewriteLinks: true
            });

        })
        .run(($log, $rootScope, $http, $location, $localStorage) => {
            $log.info("app started");
            $log.info("$location.path()", $location.path());
            $log.info("$localStorage", $localStorage);

            // keep user logged in after page refresh
            if ($localStorage.currentUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            }

            // redirect to login page if not logged in and trying to access a restricted page
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                let publicPages = ['/login'];
                let restrictedPage = publicPages.indexOf($location.path()) === -1;
                if (restrictedPage && !$localStorage.currentUser) {
                    $location.path('/login');
                }
            });
        })
        .factory('AuthenticationService', ($http, $localStorage, $log) => {
            const service = {};

            service.Login = Login;
            service.Logout = Logout;

            return service;

            function Login(username, password, callback) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/api/v1/user/authenticate',
                    data: {
                        userName: username,
                        password: password
                    }
                }).then((res) => {
                    // login successful if there's a token in the response
                    if (res.data.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = {username: username, token: res.data.token};

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback({
                            status: res.data.status,
                            message: res.data.message
                        });
                    }
                }, (err) => {
                    $log.error(err);
                    callback({
                        status: err.data.status,
                        message: err.data.data.error
                    });
                });
            }

            function Logout() {
                // remove user from local storage and clear http auth header
                delete $localStorage.currentUser;
                $http.defaults.headers.common.Authorization = '';
            }
        })
        .controller('AppController', AppController);
