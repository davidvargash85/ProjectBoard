(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("stageResource",
        ["$resource",
        "appSettings",
        stageResource]);

    function stageResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/stages/:projectId/", null,
            {
                'update': { method: 'PUT' }
            });
    }
}());
