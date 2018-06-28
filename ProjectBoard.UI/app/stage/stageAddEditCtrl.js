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

    function StageAddEditCtrl(stage, $state, $log, $stateParams) {
        var vm = this;

        vm.stage = stage;

        vm.title = vm.stage.id ? "Edit Stage: " + vm.stage.name : "Add Stage";

        vm.submit = function (isValid) {
            if (isValid) {
                //TODO: check on Error for both promises
                if (vm.stage.id) {
                    vm.stage.$update({ id: vm.stage.id },
                        function (data) {
                            $state.go('projectEdit', { "id": $state.params.projectId });
                            toastr.success('Saved Stage ' + vm.stage.name + ' successfully');
                            console.log('Saved Stage ' + vm.stage.name + ' successfully');
                        });
                }
                else {
                    vm.stage.$save(function (data) {
                        $state.go('projectEdit', { "id": $state.params.projectId });
                        toastr.success('Saved Stage ' + vm.stage.name + ' successfully');
                        console.log('Saved Stage ' + vm.stage.name + ' successfully');
                    });
                }
            } else {
                alert('Please correct the validation errors first.');
            }
        };

        vm.cancel = function () {
            $state.go('projectEdit', { "id": $state.params.projectId });
        };

    }


}());
