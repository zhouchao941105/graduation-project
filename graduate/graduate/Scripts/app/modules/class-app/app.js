"use strict";

define([
    "angular",
    "uiRouter",
    "angularFileUpload",
    "components/classSchedule/directive",
    "modules/class-management-app/directive/addClass/directive",
    "modules/class-management-app/directive/classDetail/directive",
    "modules/class-management-app/directive/addStudents/directive",
    "modules/class-management-app/controller",
    
], function (angular) {
    return angular.module("ClassManagementApp", [
            "ui.router",
            "Components.uploadEas",
            "ClassManagementApp.controller",
            "ClassManagementApp.addStudent",
            "ClassManagementApp.addClass",
            "ClassManagementApp.classDetail",
            "Components.classSchedule",
    ])
        .config(["$stateProvider", function ($stateProvider) {
            $stateProvider.state("class", {
                url: "/class",
                templateUrl: "modules/class-management-app/template.html",
                controller: "ClassManagementAppController",
                title: '班级管理',
                resolve: {
                    permission: ["currentUserService", "rolesService", function (currentUserService, rolesService) {
                        return currentUserService.hasPermission([rolesService.EasClassManage,true]);
                    }]
                }
            });
        }]);
});