"use strict"
define(['angular', 'services/dialogService'], function (angular) {
    return angular.module('TeacherListApp.dire', ['Dialog.services'])
        .directive('addTeacher', ['$http', 'gintDialog', function ($http, gintDialog) {
            return {
                restrict: 'E',
                scope: {
                    showTeacher: '=',
                    callBack: '&'
                },
                templateUrl: 'modules/teacher-list-app/directive/directive.html',
                link: function ($scope) {
                    $scope.confirm = function () {
                        var data = {
                            name: $scope.info.name,
                            priority: $scope.info.priority,
                            prefertime: $scope.info.prefertime,
                            type: $scope.info.type
                        }
                        $http.post('Default/addteacher', data).success(function (data) {
                            gintDialog.success('Success!')
                            $scope.showTeacher = false;
                            $scope.info = {}
                            $scope.callBack();
                        })
                    }
                    $scope.cancel = function () {
                        $scope.showTeacher = false;
                        $scope.info = {}
                    }
                }
            }
        }])
})