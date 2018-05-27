(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller(
        "projectAddEditCtrl",
        [
            "$uibModalInstance",
            "project",
            ProjectAddEditCtrl
        ]);

    function ProjectAddEditCtrl($uibModalInstance, project) {

        var vm = this;

        vm.project = project;

        vm.title = project.id ? "Edit project: " + project.name : "New Project";

        vm.ok = function () {
            $uibModalInstance.close(vm.project);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss("cancel");
        };

    }


}());
