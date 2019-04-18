// Load the custom app ES6 modules

import FruitsDataService from './components/service';

import FruitList from './components/list';
import FruitDetails from './components/detail';

// Define the AngularJS 'fruits' module

export default angular
        .module("fruits", [])

        .component(FruitList.name, FruitList.config)
        .component(FruitDetails.name, FruitDetails.config)

        .service("FruitsDataService", FruitsDataService);
