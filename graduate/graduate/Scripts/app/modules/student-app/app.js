"use strict";

define([
    "angular",
    "uiRouter",
    "modules/student-management-app/controller",
    "modules/student-management-app/directive/stuEdit/directive",
    "modules/student-management-app/directive/stuDetail/directive",
    "modules/student-management-app/directive/stuApply/directive",
    "modules/student-management-app/directive/stuAsyn/directive",
    "components/classSchedule/directive",
], function (angular) {
    return angular.module("StudentManagementApp", [
            "ui.router",
            "StudentManagementApp.controller",
            "StudentManagementApp.stuEdit",
            "StudentManagementApp.stuDetail",
            "StudentManagementApp.stuApply",
            "Components.classSchedule",
            'StudentManagementApp.stuAsyn'
    ])
        .config(["$stateProvider", function ($stateProvider) {
            $stateProvider.state("student", {
                url: "/student",
                templateUrl: "modules/student-management-app/template.html",
                controller: "StudentManagementAppController",
                title: '学员管理',
                resolve: {
                    permission: ["currentUserService", "rolesService", function (currentUserService, rolesService) {
                        return currentUserService.hasPermission([rolesService.EasStudentManage,true]);
                    }]
                }
            });
        }]);
});