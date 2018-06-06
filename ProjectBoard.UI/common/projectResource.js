(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("projectResource",
        ["$resource",
        "appSettings",
        projectResource]);

    function projectResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/projects/:id", null,
            {
                'update': { method: 'PUT' }
            });
    }
}());
