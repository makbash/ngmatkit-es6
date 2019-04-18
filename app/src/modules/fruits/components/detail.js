import FruitDetailController from './DetailController'

export default {
  name : 'fruitDetail',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/modules/fruits/components/detail.html',
    controller       : [ '$mdBottomSheet', '$log', FruitDetailController ]
  }
};