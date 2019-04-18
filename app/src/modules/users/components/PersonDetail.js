// Notice that we do not have a controller since this component does not
// have any specialized logic.

import PersonDetailController from './PersonDetailController'

export default {
    name: 'personDetail',
    config: {
        bindings: {person: '<'},
        templateUrl: 'src/modules/users/components/PersonDetail.html',
        controller: ['$log', PersonDetailController]
    }
};
