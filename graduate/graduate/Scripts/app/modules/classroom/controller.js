"use strict"
define([
    'angular',
    "services/dialogService"
], function (angular) {
    return angular.module('classroom-controller', ["Dialog.services"])
        .controller('classroom-ctrl', ['$scope', '$http',"gintDialog", function ($scope, $http,gintDialog) {
            $scope.onSearchKeyPress = function (e) {
                if (e.keyCode == 13) {
                    $scope.searchClassList();
                }
            }
            $scope.searchClassList = function () {
                $scope.list = [];                
                $http.post('classroomlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                    $scope.templist = angular.copy($scope.list);
                    $scope.list = $scope.templist.filter(function (v) {
                        return v.classroomName.indexOf($scope.searchKey) !== -1
                    })
                })

            };
            $scope.addroom = function () {
                $scope.showClassroom = true;
            }
            $scope.editClassroom = function (id) {
                $scope.showClassroom = true;
                $scope.$broadcast('editclassroom', { id: id })
            }
            $scope.closeClassroom = function (id) {
                $http.post('delclassroom', { id: id }).success(function () {
                    gintDialog.success('删除成功')
                    $scope.init();
                })
            }
            $scope.init = function () {
                $scope.showClassroom = false;
                $scope.list = [];
                $http.post('classroomlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                })
            }
            $scope.init();
        }])

});