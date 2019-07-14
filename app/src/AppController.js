/**
 * Main App Controller for the AngularJS Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */

import Routes from 'src/config/routes';

function AppController($scope, $mdSidenav, $mdMedia, $log) {
    const self = this;

    self.routes = Routes;
    self.lockedLeft = localStorage.getItem('lockedLeft') === 'false' ? false : true;

    self.mdScreen = $mdMedia('min-width: 960px');
    $scope.$watch(() => {
        return $mdMedia('min-width: 960px');
    }, (res) => {
        self.mdScreen = res;
    });

    // *********************************
    // Internal methods
    // *********************************

    self.closeSideNav = () => {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(() => {
                $log.debug("close left is done");
            });

    };

    /**  Hide or Show the 'left' sideNav area */
    self.toggleLeft = () => {
        if (self.mdScreen) {
            self.lockedLeft = !self.lockedLeft;
            localStorage.setItem('lockedLeft', self.lockedLeft);
        } else {
            $mdSidenav('left')
                .toggle()
                .then(() => {
                    $log.debug("toggle left is done");
                });
        }
    };
}

export default ['$scope', '$mdSidenav', '$mdMedia', '$log', AppController];
