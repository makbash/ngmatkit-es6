/**
 * User DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */

function DataService($q, $http) {

    // Promise-based API
    return {
        getAllUser: function () {
            return $http.get('data/users.json', {cache: true}).then(function (resp) {
                return resp.data;
            });
        },
        getPerson: function (id) {
            function personMatchesParam(person) {
                return person.id === id;
            }

            return this.getAllUser().then(function (user) {
                return user.find(personMatchesParam);
            });
        },
        asyncTest: function () {
            // Simulate async nature of real remote calls
            return $q.when(this.getPerson);
        }
    };
}

export default ['$q', '$http', DataService];

