(function () {
    "use strict";
    angular
        .module("projectBoard")
        .controller("projectAddEditCtrl", ["projectResource", ProjectAddEditCtrl]);

    function ProjectAddEditCtrl(projectResource, $modal, $log) {
        var vm = this;

    }


}());
