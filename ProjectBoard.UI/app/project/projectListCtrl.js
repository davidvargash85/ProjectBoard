(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller("projectListCtrl",
        [
            "projectResource",
            "$uibModal",
            "$log",
            ProjectListCtrl
        ]);

    function ProjectListCtrl(projectResource, $uibModal, $log, $filter) {
        var vm = this;
        vm.selectedProject = {};

        projectResource.query(function (data) {
            vm.projects = data;
        });

        vm.showForm = function (projectId) {

            if (projectId) {
                //TODO: Need validation?
                vm.selectedProject = vm.projects.filter(p => p.id === projectId)[0];
            }
            else {
                vm.selectedProject = {
                    id: 0,
                    name: '',
                    description: ''
                };
            }

            var modalInstance = $uibModal.open({
                templateUrl: '/app/project/projectAddEditView.html',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                controller: 'projectAddEditCtrl',
                controllerAs: 'vm',
                size: 'lg',
                resolve:
                    {
                        project: function () { return vm.selectedProject; }
                    }
            });

            modalInstance.result.then(function (project) {
                $log.info('modal-Ok at: ' + new Date());

                if (project.id) {
                    //edit
                    project.$update({ id: project.id },
                        function (data) {
                            vm.message = "... Save Complete";
                        });
                }
                else {
                    //save
                    //project.$save(
                    //    function (data) {
                    //        vm.message = "... Save Complete";
                    //    });

                    projectResource.save(project).$promise.then(function (data) {
                        vm.message = "... Save Complete";
                        projectResource.query(function (data) {
                            vm.projects = data;
                        });
                    });
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        vm.deleteProject = function (projectId) {
            var project = vm.projects.filter(p => p.id === projectId)[0];
            project.$remove({ id: project.id },
                function (data) {
                    vm.message = "... Deleted element with id:" + projectId;
                    projectResource.query(function (data) {
                        vm.projects = data;
                    });
                });
        };
    }

}());
