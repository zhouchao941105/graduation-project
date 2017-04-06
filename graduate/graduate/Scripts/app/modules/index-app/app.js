"use strict";

define([
    "angular",
    "uiRouter",
    "modules/index-app/controller"
], function(angular) {
    return angular.module("IndexApp", [
            "ui.router",
            "IndexApp.controller"
        ])
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider.state("index", {
                url: "/index",
                templateUrl: "modules/index-app/template.html",
                controller: "IndexAppController",
                title: '首页',
                resolve: {
                    permission: ["currentUserService", "rolesService", function(currentUserService, rolesService) {
                        return true;
                    }]
                }
            });
        }]);
});