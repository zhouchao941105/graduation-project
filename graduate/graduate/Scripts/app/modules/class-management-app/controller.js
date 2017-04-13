define([
    "angular",
    "services/commonService",
    "services/dialogService",
    "commonDirective",
], function (angular) {
    return angular.module("ClassManagementApp.controller", ["Dialog.services"])
        .controller("ClassManagementAppController", ["$scope","$http", "gintDialog", function ($scope, $http, gintDialog) {

            //新增班级
            $scope.addClass = function () {
                $scope.showClassPopup = true;
            }
            $scope.editClass=function(id){
                $scope.showClassPopup=true;
                $scope.$broadcast('editclass',{id:id})
            }
            $scope.init = function () {
                $scope.showClassPopup = false;
                $scope.list = [];
                $http.post('Default/classlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                })
            }
            $scope.init();

        }
        ]);
});