"use strict"
define([
    'angular',
    'uiRouter',
    'components/echarts/app',
    "modules/sche-app/controller"
], function(angular) {
    return angular.module('sche-app',['ui.router','sche-controller','components.echarts'])
    .config(["$stateProvider", function ($stateProvider) {
            $stateProvider.state("sche", {
                url: "/sche",
                templateUrl: "modules/sche-app/template.html",
                controller: "sche-ctrller",
                title: '自动排课'
            });
        }]);
});