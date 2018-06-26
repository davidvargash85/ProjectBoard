(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller(
        "stageAddEditCtrl",
        [
            "stage",
            "$state",
            StageAddEditCtrl
        ]);

    function StageAddEditCtrl(stage, $state, $log) {
        var vm = this;

        vm.stage = stage;

        vm.title = vm.stage.id ? "Edit Stage: " + vm.stage.name : "Add Stage";

        vm.submit = function (isValid) {
            //if (isValid) {
            //    //TODO: check on Error for both promises
            //    if (vm.stage.id) {
                    
            //    }
            //    else {
                    
            //    }
            //} else {
            //    alert("Please correct the validation errors first.");
            //}
        };

        vm.cancel = function () {
            
        };

    }


}());
