(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller(
        "stageAddEditCtrl",
        [
            "stage",
            "$state",
            ProjectAddEditCtrl
        ]);

    function ProjectAddEditCtrl(stage, $state, $log) {
        var vm = this;

        vm.stage = stage;

        vm.title = vm.stage.id ? "Edit Stage: " + vm.stage.name : "Add Stage";

        vm.submit = function (isValid) {
            console.log('submit clicked');
        };

        vm.cancel = function () {
            console.log('cancel clicked');

            //$state.go('projectList');
        };
    }


}());
