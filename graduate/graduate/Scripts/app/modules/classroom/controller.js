"use strict"
define([
    'angular'
], function (angular) {
    return angular.module('classroom-controller', [])
        .controller('classroom-ctrl', ['$scope', '$http', function ($scope, $http) {
            $scope.addroom = function () {
                $scope.showClassroom = true;
            }
            $scope.init = function () {
                $scope.showClassroom = false;
                $scope.list = [];
                $http.post('Default/classroomlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                })
            }
            $scope.init();
        }])

});