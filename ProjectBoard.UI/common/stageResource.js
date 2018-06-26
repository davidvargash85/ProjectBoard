(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("stageResource",
            ["$resource",
            "appSettings",
            stageResource]);

    function stageResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/projects/:stageId/stages/:stageId", null,
            {
                'update': { method: 'PUT' }
            });
    }
}());
