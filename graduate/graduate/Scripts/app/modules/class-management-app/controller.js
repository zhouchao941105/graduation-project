define([
    "angular",
    "services/commonService",
    "services/dialogService",
    "commonDirective",
], function (angular) {
    return angular.module("ClassManagementApp.controller", ["Dialog.services"])
        .controller("ClassManagementAppController", ["$scope", "$http", "gintDialog", function ($scope, $http, gintDialog) {




            $scope.onSearchKeyPress = function (e) {
                if (e.keyCode == 13) {
                    $scope.searchClassList();
                }
            }
            $scope.searchClassList = function () {
                $scope.list = [];
                $http.post('classlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                    $scope.templist = angular.copy($scope.list);
                    $scope.list = $scope.templist.filter(function (v) {
                        return v.className.indexOf($scope.searchKey) !== -1
                    })
                })

            };
            //新增班级
            $scope.addClass = function () {
                $scope.showClassPopup = true;
            }
            $scope.editClass = function (id) {
                $scope.showClassPopup = true;
                $scope.$broadcast('editclass', { id: id })
            }
            $scope.closeClass = function (id) {
                $http.post('delclass', { id: id }).success(function () {
                    gintDialog.success('删除成功')
                    $scope.init();
                })
            }
            $scope.init = function () {
                $scope.showClassPopup = false;
                $scope.$apply(function () {
                    $scope.searchKey = undefined
                })
                $scope.list = [];
                $http.post('classlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                })
            }
            $scope.init();

        }
        ]);
});