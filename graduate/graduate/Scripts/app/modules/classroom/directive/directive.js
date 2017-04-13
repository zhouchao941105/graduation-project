'use strict';
define([
    'angular',
    "services/dialogService",
], function (angular) {
    return angular.module('addclassroom', ["Dialog.services"])
        .directive('addRoom', ['$http', 'gintDialog',
            function ($http, gintDialog) {
                return {
                    restrict: "E",
                    scope: {
                        showP: "=",
                        callBack:'&'
                    },
                    templateUrl: "modules/classroom/directive/directive.html",
                    link: function ($scope, element, attrs) {

                        $scope.cancel = function () {
                            $scope.showP = false;
                            $scope.info.name = '';
                            $scope.info.count = '';
                            $scope.info.type = '';
                        }
                        $scope.confirm = function () {
                            var data = {
                                name: $scope.info.name,
                                count: $scope.info.count,
                                type: $scope.info.type
                            }
                            $http.post('Default/addclassroom', data).then(function () {
                                gintDialog.success('success');
                                $scope.showP = false;
                                $scope.callBack();
                            })
                        }
                    }
                }
            }])

});