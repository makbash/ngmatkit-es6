// Load the custom app ES6 modules
'use strict';

import angular from 'angular';

// Define the AngularJS 'home' module

export default angular
    .module("signup", ['ngMaterial'])
    .component('signup', {
        templateUrl: './src/modules/signup/signup.html',
        controller: function ($scope, $rootScope, $sce, $location, AuthenticationService) {
            console.log('signup controller');
            const vm = this;

            vm.signup = signup;

            // reset signin status
            AuthenticationService.Logout();

            function signup() {
                vm.loading = true;
                AuthenticationService.Signup(vm.fields, function (res) {
                    vm.response = { type: null, text: null };

                    if (res === true) {
                        vm.response.type = 'success';
                        vm.response.text = $sce.trustAsHtml('Hesabınız başaryla oluşturuldu. Giriş ekraranına yönlendiriliyorsunuz.');
                        setTimeout(() => {
                            $scope.$apply(() => {
                                $location.path('/login');
                            })
                            vm.loading = false;
                        }, 3000);
                    } else {
                        vm.response.type = 'danger';
                        vm.loading = false;
                        vm.response.text = 'unknown error';

                        if (res.status === false) {
                            if (res.data.name == 'MongoError') {
                                let errText = res.data.name + ' : ' + res.data.errmsg;
                                vm.response.text = $sce.trustAsHtml(errText);
                            } else if (res.data.name == 'ValidationError') {
                                let errText = '';
                                vm.response.type = 'warning';
                                $rootScope.loop(res.data.errors, function (item, key) {
                                    errText += item.name + ' : ' + item.message + '<br>';
                                });

                                vm.response.text = $sce.trustAsHtml(errText);
                            }
                            else {
                                $rootScope.loop(res.data, function (item, key) {
                                    if (typeof (item) === 'string') {
                                        let errText = key + ' : ' + item;
                                        vm.response.text = $sce.trustAsHtml(errText);
                                    } else {
                                        let errText = '';
                                        $rootScope.loop(item, function (citem, ckey) {
                                            errText += ckey + ' : ' + citem + '<br>';
                                        });

                                        vm.response.text = $sce.trustAsHtml(errText);
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    });