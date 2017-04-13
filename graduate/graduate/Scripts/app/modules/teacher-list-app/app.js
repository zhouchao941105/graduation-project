"use strict";

define([
    "angular",
    "uiRouter",
    "modules/teacher-list-app/controller",
    "components/selectBox/directive",
    "modules/teacher-list-app/directive/directive",
    "components/export/directive"
], function (angular) {
    return angular.module("TeacherListApp", [
            "ui.router",
            "TeacherListApp.controller",
            "Components.selectBox",
            "TeacherListApp.dire",
            "components.export.directive"
    ])
        .config(["$stateProvider", function ($stateProvider) {
            $stateProvider.state("teacher", {
                url: "/teacher",
                templateUrl: "modules/teacher-list-app/template.html",
                controller: "TeacherListAppController",
                title: '教师列表'
            });
        }]);
});