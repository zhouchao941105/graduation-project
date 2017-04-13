"use strict"
define(['angular','ngDialog'],function(){
    return angular.module('course.ctrl',[])
    .controller('course-ctrl',['$http','$scope',function($http,$scope){
        
        $scope.addcourse=function(){
            $scope.showcourse=true;
            $scope.$broadcast('getclass');
        }
        $scope.init=function(){
            $scope.showcourse=false;
            $scope.list=[];
            $http.post('Default/courselist').success(function(data){
                for( var i=0,l = data.length;i<l;i++){
                    $scope.list.push(data[i])
                }
            })
        }
        $scope.init();
    }])
})