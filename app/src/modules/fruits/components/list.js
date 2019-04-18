// Notice that we do not have a controller since this component does not
// have any specialized logic.

export default {
    name: 'fruitList',
    config: {
        bindings: {fruits: '<', selected: '<', showDetails: '&onSelected'},
        templateUrl: 'src/modules/fruits/components/list.html',
        controller: function ($scope) { }
    }
};
