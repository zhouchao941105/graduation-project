"use strict"
define(['angular'],function(angular){
    return angular.module('TeacherListApp.controller',[])
    .controller('TeacherListAppController',['$scope','$http',function($scope,$http){
        
        $scope.addteacher=function(){
            $scope.showteacher=true;
        }
        $scope.init=function(){
            $scope.showteacher=false;
            $scope.list=[];
            $http.post('Default/teacherlist').success(function(data){
                for( var i=0,l = data.length;i<l;i++){
                    $scope.list.push(data[i])
                }
            })
        }
        $scope.init();
    }])
})