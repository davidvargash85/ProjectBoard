(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("stageResource",
        ["$stage",
        "appSettings",
        stageResource]);

    function stageResource($stage, appSettings) {
        return $resource(appSettings.serverPath + "/api/projects/:idProject/stages/:idStage", null,
            {
                'update': { method: 'PUT' }
            });
    }
}());
