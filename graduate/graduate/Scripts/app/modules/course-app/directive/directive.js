"use strict"
define(['angular', 'services/dialogService'], function (angular) {
    return angular.module('course.dire', ['Dialog.services'])
        .directive('addCourse', ['$http', 'gintDialog', function ($http, gintDialog) {
            return {
                restrict: "E",
                scope: {
                    showCourse: "=",
                    callBack: '&',
                    allInfo:'=',
                    searchKey:'='
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
                            $scope.searchKey='';
                        $scope.currId=0;
                        $scope.callBack();
                    }
                    $scope.confirm = function () {
                        var data = {
                            name: $scope.info.courseName,
                            type: $scope.info.type || $scope.courseData.type,
                            timeperweek: $scope.info.timeperweek||$scope.timeData.time,
                            classid: $scope.info.classId||$scope.classdata.classId,
                            currid:$scope.currId||0,
                            roomrequest:$scope.info.request||$scope.roomdata.roomtype
                        }
                        $http.post('addcourse', data).success(function () {
                            gintDialog.success('Success!');
                            $scope.showCourse = false;
                            $scope.info = {};
                            $scope.currId=0;
                            $scope.searchKey='';
                            $scope.callBack();
                        })
                    }
                    $scope.selectdCourse = function (data) {
                        $scope.info.classId = data.classId;
                    }
                    $scope.selectdTime=function(data){
                        $scope.info.timeperweek=data.time;
                    }
                    $scope.selectdType=function(data){
                        $scope.info.type=data.type;
                    }
                    $scope.selectdRoom=function(data){
                        $scope.info.request=data.type
                    }
                    $scope.init = function () {
                        $scope.classlist = new Array();
                        $scope.timelist=[{time:2},{time:4}];
                        $scope.timeData=$scope.timelist[0];

                        $scope.typelist=[{type:'语文'},{type:'数学'},{type:'英语'},{type:'物理'},{type:'化学'},{type:'生物'},{type:'体育'},{type:'物理实验'}];
                        $scope.courseData=$scope.typelist[0];

                        $scope.roomtypelist=[{roomtype:'common'},{roomtype:'exce'},{roomtype:'basket'}]
                        $scope.roomdata=$scope.roomtypelist[0];
                    };
                    $scope.$on('getclass', function () {
                        $http.post('classlist').success(function (data) {
                            $scope.classlist=[];
                            for (var i = 0, l = data.length; i < l; i++) {
                                $scope.classlist.push(data[i])
                            }
                            $scope.classdata = $scope.classlist[0];
                            // $scope.info.classId=$scope.classdata.classId
                        })
                    });
                    
                    $scope.init()
                }
            }
        }])
})