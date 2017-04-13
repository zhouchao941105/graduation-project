"use strict"
define(['angular', 'services/dialogService'], function (angular) {
    return angular.module('course.dire', ['Dialog.services'])
        .directive('addCourse', ['$http', 'gintDialog', function ($http, gintDialog) {
            return {
                restrict: "E",
                scope: {
                    showCourse: "=",
                    callBack: '&'
                },
                templateUrl: "modules/course-app/directive/directive.html",
                link: function ($scope) {


                    $scope.cancel = function () {
                        $scope.showCourse = false;
                        $scope.info = {};
                    }
                    $scope.confirm = function () {
                        var data = {
                            name: $scope.info.name,
                            type: $scope.info.type,
                            timeperweek: $scope.info.timeperweek,
                            classid: $scope.info.classid
                        }
                        $http.post('Default/addcourse', data).success(function () {
                            gintDialog.success('Success!');
                            $scope.showCourse = false;
                            $scope.info = {};
                            $scope.callBack();
                        })
                    }
                    $scope.selectdCourse = function (data) {
                        $scope.info.classid = data.classId;
                    }
                    $scope.init = function () {
                        $scope.classlist = new Array();


                    };
                    $scope.$on('getclass', function () {
                        $http.post('Default/classlist').success(function (data) {
                            for (var i = 0, l = data.length; i < l; i++) {
                                $scope.classlist.push(data[i])
                            }
                            $scope.classdata = $scope.classlist[0];
                        })
                    })
                    $scope.init()
                }
            }
        }])
})