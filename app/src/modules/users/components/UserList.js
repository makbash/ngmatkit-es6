// Notice that we do not have a controller since this component does not
// have any specialized logic.

export default {
    name: 'userList',
    config: {
        bindings: {users: '<'},
        templateUrl: 'src/modules/users/components/UserList.html',
        controller: function (UserService) {
            UserService.asyncTest().then((res) => {
                console.log('async res', res);
            });
        }
    }
};
