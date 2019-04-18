class PersonDetailController {

    /**
     * Constructor
     * @param $log
     */
    constructor($log) {
        this.$log = $log;
    }

    testFunc() {
        this.$log.debug('clicked!');
    }

}
export default PersonDetailController;

