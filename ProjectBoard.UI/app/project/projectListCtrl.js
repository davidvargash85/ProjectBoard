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

    function ProjectListCtrl(projectResource, $uibModal, $log) {
        var vm = this;

        projectResource.query(function (data) {
            vm.projects = data;
        });

        vm.selectedProject = {
            id: 5,
            projectName: 'Water Sports',
            description: 'This is where we track our water sports'
        };

        vm.showForm = function () {

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
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }

}());
