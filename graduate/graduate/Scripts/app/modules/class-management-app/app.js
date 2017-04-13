"use strict";

define([
    "angular",
    "uiRouter",
    "modules/class-management-app/directive/addClass/directive",
    "modules/class-management-app/controller",
    
], function (angular) {
    return angular.module("ClassManagementApp", [
            "ui.router",
            "ClassManagementApp.controller",
            "ClassManagementApp.addClass",
    ])
        .config(["$stateProvider", function ($stateProvider) {
            $stateProvider.state("class", {
                url: "/class",
                templateUrl: "modules/class-management-app/template.html",
                controller: "ClassManagementAppController",
                title: '班级管理'
            });
        }]);
});