"use strict"
define(['angular',"services/dialogService"], function (angular) {
    return angular.module('TeacherListApp.controller', ["Dialog.services"])
        .controller('TeacherListAppController', ['$scope', '$http','gintDialog', function ($scope, $http,gintDialog) {

            $scope.addteacher = function () {
                $scope.showteacher = true;
            }
            $scope.editteacher = function (id) {
                $scope.showteacher = true;
                $scope.$broadcast('editteacher', { id: id })
            }
            $scope.closeteacher = function (id) {
                $http.post('Default/delteacher', { id: id }).success(function () {
                    gintDialog.success('删除成功')
                    $scope.init();
                })
            }
            $scope.init = function () {
                $scope.showteacher = false;
                $scope.list = [];
                $http.post('Default/teacherlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                })
            }
            $scope.init();
        }])
})