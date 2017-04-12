"use strict"
define([
    'angular'
], function (angular) {
    return angular.module('classroom-controller', [])
        .controller('classroom-ctrl', ['$scope','$http',function($scope,$http){
            $scope.showClassroom=false;
            $scope.addroom=function(){
                $scope.showClassroom=true;
            }
        }])

});