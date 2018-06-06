(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller("projectListCtrl",
        [
            "projectResource",
            "$log",
            ProjectListCtrl
        ]);

    function ProjectListCtrl(projectResource, $log, $filter) {
        var vm = this;
        vm.selectedProject = {};

        projectResource.query(function (data) {
            vm.projects = data;
        });

        vm.showForm = function (projectId) {

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
