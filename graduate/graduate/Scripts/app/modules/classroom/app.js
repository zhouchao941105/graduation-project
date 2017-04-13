"use strict"
define([
    'angular',
    'uiRouter',
    "modules/classroom/controller",
    "modules/classroom/directive/directive"
], function(angular) {
    return angular.module('classroom-app',['ui.router','classroom-controller',"addclassroom"])
    .config(["$stateProvider", function ($stateProvider) {
            $stateProvider.state("classroom", {
                url: "/classroom",
                templateUrl: "modules/classroom/template.html",
                controller: "classroom-ctrl",
                title: '教室管理'
            });
        }]);
});