/**
 * Main App Controller for the AngularJS Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */

import Routes from 'src/config/routes';

function AppController($mdSidenav) {
    const self = this;

    self.lockedLeft = localStorage.getItem('lockedLeft') === 'false' ? false : true;

    // *********************************
    // Internal methods
    // *********************************

    /**  Hide or Show the 'left' sideNav area */
    self.toggleLeft = function () {
        self.lockedLeft = !self.lockedLeft;
        localStorage.setItem('lockedLeft', self.lockedLeft);
    };

    self.sidenav = Routes;
}

export default ['$mdSidenav', AppController];
