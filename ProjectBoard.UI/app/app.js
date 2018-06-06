(function () {
    "use strict";

    var app = angular.module("projectBoard",
        ["common.services", "ui.router"]);

    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
                })
                .state("projectList", {
                    url: "/projects",
                    templateUrl: "app/project/projectListView.html",
                    controller: "projectListCtrl",
                    controllerAs: "vm"
                })
                .state("productEdit", {
                    url: "/projects/edit/:id",
                    templateUrl: "app/project/projectAddEditView.html",
                    controller: "projectAddEditCtrl",
                    controllerAs: "vm",
                    resolve: {
                        projectResource: "projectResource",
                        project: function (projectResource, $stateParams) {
                            var id = $stateParams.id;
                            return projectResource.get({ id: id }).$promise;
                        }
                    }
                });
    }]);

}());   