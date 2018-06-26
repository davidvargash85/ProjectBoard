(function () {
    "use strict";

    var app = angular.module("projectBoard",
        ["common.services", "ui.router", "dndLists"]);

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
                })
                .state("stageEdit", {
                    url: "/projects/edit/:projectId/stages/:stageId",
                    templateUrl: "app/stage/stageAddEditView.html",
                    controller: "stageAddEditCtrl",
                    controllerAs: "vm",
                    resolve: {
                        stageResource: "stageResource",
                        stage: function (stageResource, $stateParams) {
                            var projectId = $stateParams.projectId;
                            var stageId = $stateParams.stageId;
                            return stageResource.get({ projectId: projectId, stageId: stageId }).$promise;
                        }
                    }
                });
    }]);

}());   