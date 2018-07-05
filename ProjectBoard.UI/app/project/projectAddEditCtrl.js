(function () {
    'use strict';
    angular
        .module('projectBoard')
        .controller('projectAddEditCtrl',
        [
            'project',
            '$state',
            'stageResource',
            'projectResource',
            '$uibModal',
            ProjectAddEditCtrl
        ]);

    function ProjectAddEditCtrl(project, $state, stageResource, projectResource, $uibModal) {
        var vm = this;

        vm.project = project;

        vm.list = project.stages;
        vm.stageSelected = vm.list[0];

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

        vm.deleteStage = function (stageId) {

            var modalInstance = $uibModal.open({
                templateUrl: '/common/ModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function () {
                reallyDelete(stageId)
            }, function () {
                //TODO: Modal dismissed
            });
        };

        var reallyDelete = function (stageId) {
            stageResource.get({ id: stageId }).$promise.then(function (data) {
                var stage = data;
                
                stage.$remove({ id: stage.id },
                    function (data) {
                        vm.message = "... Deleted element with id:" + stageId;
                        projectResource.get({ id: vm.project.id }).$promise.then(function (data) {
                            vm.list = data.stages;
                        });
                    });
            });
        };

    };

    //project.$remove({ id: project.id },
    //    function (data) {
    //        vm.message = "... Deleted element with id:" + projectId;
    //        projectResource.query(function (data) {
    //            vm.projects = data;
    //        });
    //    });

}());
