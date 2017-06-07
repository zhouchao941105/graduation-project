"use strict"
define(['angular', 'services/dialogService'], function () {
    return angular.module('course.ctrl', ["Dialog.services"])
        .controller('course-ctrl', ['$http', '$scope','gintDialog', function ($http, $scope,gintDialog) {
            $scope.onSearchKeyPress = function (e) {
                if (e.keyCode == 13) {
                    $scope.searchClassList();
                }
            }
            $scope.searchClassList = function () {
                $scope.list = [];                
                $http.post('courselist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                    $scope.templist = angular.copy($scope.list);
                    $scope.list = $scope.templist.filter(function (v) {
                        return v.courseName.indexOf($scope.searchKey) !== -1
                    })
                })

            };
            $scope.addcourse = function () {
                $scope.showcourse = true;
                $scope.$broadcast('getclass');
            }
            $scope.editcourse = function (id) {
                $scope.showcourse = true;
                $scope.$broadcast('getclass');
                $scope.$broadcast('editcourse', { id: id })
            }
            $scope.closecourse = function (id) {
                $http.post('delcourse', { id: id }).success(function () {
                    gintDialog.success('删除成功')
                    $scope.init();
                })
            }
            $scope.init = function () {
                $scope.showcourse = false;
                $scope.list = [];
                $http.post('courselist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                })
            }
            $scope.init();

            
        }])
})