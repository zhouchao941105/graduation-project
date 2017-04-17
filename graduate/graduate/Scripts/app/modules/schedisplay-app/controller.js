"use strict"
define(['angular', 'components/selectBox/directive','services/dialogService'], function (angular) {
    return angular.module('sche.ctrl', ['Components.selectBox','Dialog.services'])
        .controller('sche-ctrl', ['$http', '$scope','gintDialog', function ($http, $scope,gintDialog) {
            $scope.choosesche = function (type) {
                if ($scope.schetype == type) return;
                $scope.schetype = type;
                $scope.update();
            }
            $scope.update = function () {
                if ($scope.schetype == 0) {
                    $scope.getclass();
                }
                else if ($scope.schetype == 1) {
                    $scope.getclassroom();
                } else {
                    $scope.getteacher();
                }
            }
            $scope.init = function () {
                $scope.schetype = 0;
                $scope.update();
                $scope.classlist = new Array();
                $scope.classroomlist = new Array();
                $scope.teacherlist = new Array();
                $scope.info={}
            }
            $scope.getclass = function () {
                $http.post('Default/classlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.classlist.push(data[i])
                    }
                    $scope.classdata = $scope.classlist[0];
                })
            }
            $scope.getclassroom = function () {
                $http.post('Default/classroomlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.classroomlist.push(data[i])
                    }
                    $scope.classroomdata = $scope.classroomlist[0];
                })
            }
            $scope.getteacher = function () {
                $http.post('Default/teacherlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.teacherlist.push(data[i])
                    }
                    $scope.teacherdata = $scope.teacherlist[0];
                })
            }
            $scope.selectdCourse0 = function (data) {
                $scope.info.classId = data.classId;
                $scope.info.type='class';
            }
            $scope.selectdCourse1 = function (data) {
                $scope.info.classroomId = data.classroomId;
                $scope.info.type='classroom';
            }
            $scope.selectdCourse2 = function (data) {
                $scope.info.teacherId = data.teacherId;
                $scope.info.type='teacher';
            }
            $scope.export=function(){
                if($scope.info.type=='class'){
                    $http.post('Default/scheClass',{classId:$scope.info.classId}).success(function(){
                        gintDialog.success('Success')
                    })
                }else if($scope.info.type=='classroom'){
                    $http.post('Default/scheClassroom',{classroomId:$scope.info.classroomId}).success(function(){
                        gintDialog.success('Success');
                    })
                }else{
                    $http.post('Default/scheteacher',{teacherId:$scope.info.teacherId}).success(function(){
                        gintDialog.success('Success');
                    })
                }
            }
            $scope.init();
        }])
})