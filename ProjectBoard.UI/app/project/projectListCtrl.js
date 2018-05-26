(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller("projectListCtrl", ["projectResource", ProjectListCtrl]);

    function ProjectListCtrl(projectResource) {
        var vm = this;

        projectResource.query(function (data) {
            vm.projects = data;
        });

        vm.showForm = function () {

        };

    }

}());
