
// An array of state definitions
const states = [
    {name: 'login', title: 'Login', icon: 'widgets', url: '/login', component: 'login'},
    {name: 'home', title: 'Homepage', icon: 'home', url: '/home', component: 'home'},
    {name: 'example', title: 'Examples', icon: 'widgets', url: '/example', component: 'example'},
    {name: 'fruits', url: '/fruits', component: 'fruits'},
    {name: 'about', title: 'About', icon: 'widgets', url: '/about', component: 'about'},
    {
        name: 'users', title: 'Users', icon: 'widgets',
        url: '/users',
        component: 'userList',
        resolve: {
            users: function (UserService) {
                return UserService.getAllUser();
            }
        }
    },
    {
        name: 'users.person',
        url: '/{personId}',
        component: 'personDetail',
        resolve: {
            person: function (users, $stateParams) {
                return users.find(function (person) {
                    return person.id === $stateParams.personId;
                });
            }
        }
    }
];

export default states;