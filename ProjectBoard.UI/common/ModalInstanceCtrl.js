(function () {

    'use strict';
    angular.module('projectBoard').
        controller('ModalInstanceCtrl', function ($uibModalInstance) {
            var vm = this;

            vm.ok = function () {
                $uibModalInstance.close();
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });

}());