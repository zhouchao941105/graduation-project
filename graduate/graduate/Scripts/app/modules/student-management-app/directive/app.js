"use strict";

define([
    "angular",
    "uiRouter",
    "modules/student-management-app/controller",
    "modules/student-management-app/directive/stuDetail/directive",
    "components/classSchedule/directive",
], function (angular) {
    return angular.module("StudentManagementApp", [
            "ui.router",
            "StudentManagementApp.controller",
            "StudentManagementApp.stuDetail",
            "Components.classSchedule"
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