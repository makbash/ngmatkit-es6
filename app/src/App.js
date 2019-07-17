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

import Signin from './modules/signin/Module';
import Signup from './modules/signup/Module';
import Home from './modules/home/Module';
import Example from './modules/example/Module';
import About from './modules/about/Module';
import Users from './modules/users/Module';

export default angular
    .module('starter-app', ['ngMaterial', 'ui.router', 'ngMessages', 'ngStorage',
        Signin.name,
        Signup.name,
        Home.name,
        Example.name,
        About.name,
        Users.name,
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
    .run(($rootScope, $log, $http, $location, $localStorage) => {
        $log.info("app started");
        $log.info("$location.path()", $location.path());
        $log.info("$localStorage", $localStorage);

        $rootScope.dump = function (data, lType) {
            var logType = lType || 'error';

            $log[logType](logType.toUpperCase() + ' : ', data);
        };


        $rootScope.loop = function (collection, callback, scope) {
            /**
             * A simple forEach() implementation for Arrays, Objects and NodeLists
             * @private
             * @param {Array|Object|NodeList} collection Collection of items to iterate
             * @param {Function} callback Callback function for each iteration
             * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
             */

            if (Object.prototype.toString.call(collection) === '[object Object]') {
                for (var prop in collection) {
                    if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                        callback.call(scope, collection[prop], prop, collection);
                    }
                }
            } else {
                for (var i = 0, len = collection.length; i < len; i++) {
                    callback.call(scope, collection[i], i, collection);
                }
            }
        };

        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            let publicPages = ['/signin', '/signup'];
            let restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/signin');
            }
        });
    })
    .factory('AuthenticationService', ($http, $localStorage, $log) => {
        const service = {};

        service.Signin = Signin;
        service.Signup = Signup;
        service.Logout = Logout;

        return service;

        function Signin(fields, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/user/authenticate',
                data: {
                    userName: fields.userName,
                    password: fields.password
                }
            }).then((res) => {
                // login successful if there's a token in the response
                if (res.data.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { userName: fields.userName, token: res.data.token };

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    $log.error('TokenError >> ', res);
                    // execute callback with false to indicate failed login
                    callback({
                        status: false,
                        message: 'TokenError >>',
                        data: res.data
                    });
                }
            }, (err) => {
                $log.error('DbError >> ', err);
                callback({
                    status: false,
                    message: 'DbError >>',
                    data: err.data
                });
            });
        }

        function Signup(fields, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/user/register',
                data: {
                    userName: fields.userName,
                    password: fields.password,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                }
            }).then((res) => {
                // login successful if there's a token in the response
                if (res.data.status) {
                    callback(true);
                } else {
                    $log.error('DbError >> ', res);
                    // execute callback with false to indicate failed login
                    callback({
                        status: false,
                        message: 'DbError', // res.data.message
                        data: res.data
                    });
                }
            }, (err) => {
                $log.error(err);
                callback({
                    status: false,
                    message: 'OtherError >> ', // err.data.data.error
                    data: err.data
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
