﻿(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller(
        "projectAddEditCtrl",
        [
            "project",
            "$state",
            ProjectAddEditCtrl
        ]);

    function ProjectAddEditCtrl(project, $state, $log) {
        var vm = this;

        vm.project = project;

        vm.list = project.stages;
        vm.selected = vm.list[0];

        vm.title = vm.project.id ? "Edit Project: " + vm.project.name : "Add Project";

        vm.stageMoved = function ($index) {
            vm.list.splice($index, 1);
            for (var i = 0; i < vm.list.length; i++) {
                console.log(vm.list[i].name);
            }
        };

        vm.submit = function (isValid) {
            if (isValid) {
                //TODO: check on Error for both promises
                if (vm.project.id) {
                    vm.project.$update({ id: vm.project.id },
                        function (data) {
                            $state.go('projectList');
                            toastr.success('Saved Project ' + vm.project.name + " successfully");
                            console.log('save succesfull');
                        });
                }
                else {
                    vm.project.$save(function (data) {
                        $state.go('projectList');
                        toastr.success('Saved Project ' + vm.project.name + " successfully");
                        console.log('save succesfull');
                    });
                }
            } else {
                alert("Please correct the validation errors first.");
            }
        };

        vm.cancel = function () {
            $state.go('projectList');
        };

    }


}());
