"use strict"
define([
    'angular',
    'uiRouter',
    'modules/schedisplay-app/controller',
    'modules/schedisplay-app/directive/directive'
],function(angular){
    return angular.module('sche.app',['ui.router','sche.ctrl','sche'])
    .config(['$stateProvider',function($stateProvider){
        $stateProvider.state('display',{
            url:"/display",
            controller:'sche-ctrl',
            templateUrl:"modules/schedisplay-app/template.html",
            title:"课表查看"
        })
    }])
})