"use strict"
define(['angular', 'services/dialogService'], function (angular) {
    return angular.module('course.dire', ['Dialog.services'])
        .directive('addCourse', ['$http', 'gintDialog', function ($http, gintDialog) {
            return {
                restrict: "E",
                scope: {
                    showCourse: "=",
                    callBack: '&',
                    allInfo:'='
                },
                templateUrl: "modules/course-app/directive/directive.html",
                link: function ($scope) {

                    $scope.$on('editcourse',function(event,obj){
                        for(var i=0,l=$scope.allInfo.length;i<l;i++){
                            if($scope.allInfo[i].courseId==obj.id){
                                $scope.info=$scope.allInfo[i];
                            }
                        }
                        $scope.currId=obj.id;
                    })
                    $scope.cancel = function () {
                        $scope.showCourse = false;
                        $scope.info = {};
                        $scope.currId=0;
                        $scope.callBack();
                    }
                    $scope.confirm = function () {
                        var data = {
                            name: $scope.info.courseName,
                            type: $scope.info.type,
                            timeperweek: $scope.info.timeperweek,
                            classid: $scope.info.classId,
                            currid:$scope.currId||0
                        }
                        $http.post('Default/addcourse', data).success(function () {
                            gintDialog.success('Success!');
                            $scope.showCourse = false;
                            $scope.info = {};
                            $scope.currId=0
                            $scope.callBack();
                        })
                    }
                    $scope.selectdCourse = function (data) {
                        $scope.info.classId = data.classId;
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