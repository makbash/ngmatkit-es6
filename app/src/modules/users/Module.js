// Load the custom app ES6 modules
'use strict';
import angular from 'angular';

import UserList from './components/UserList'
import PersonDetail from './components/PersonDetail'
import UserDataService from './services/UserDataService';

// Define the AngularJS 'users' module
export default angular
        .module("users", ['ngMaterial'])

        .component(UserList.name, UserList.config)
        .component(PersonDetail.name, PersonDetail.config)

        .service("UserService", UserDataService);
