"use strict";

define([
    "angular",
    "uiRouter",
    "modules/teacher-list-app/controller",
    "components/selectBox/directive",
    "modules/teacher-list-app/directive/empEdit/directive",
    "modules/teacher-list-app/directive/empDetail/directive",
    "components/export/directive",
    "modules/teacher-list-app/directive/empAsyn/directive"
], function (angular) {
    return angular.module("TeacherListApp", [
            "ui.router",
            "TeacherListApp.controller",
            "Components.selectBox",
            "TeacherListApp.empEdit",
            "TeacherListApp.empDetail",
            "components.export.directive",
            "TeacherListApp.empAsyn"
    ])
        .config(["$stateProvider", function ($stateProvider) {
            $stateProvider.state("teacher.list", {
                url: "",
                templateUrl: "modules/teacher-list-app/template.html",
                controller: "TeacherListAppController",
                title: '教师列表',
                resolve: {
                    permission: ["currentUserService", "rolesService", function (currentUserService, rolesService) {
                        return currentUserService.hasPermission([rolesService.EasEmployeeManage,true]);
                    }]
                }
            });
        }]);
});