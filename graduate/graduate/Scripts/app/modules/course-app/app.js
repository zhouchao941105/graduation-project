"use strict"
define([
    'angular',
    'uiRouter',
    'modules/course-app/controller',
    'modules/course-app/directive/directive',
    "components/selectBox/directive"
    ],
function(angular){
    return angular.module('course.app',['ui.router','course.ctrl','course.dire','Components.selectBox'])
    .config(["$stateProvider",function($stateProvider){
        $stateProvider.state('course',{
            url:"/course",
            templateUrl: "modules/course-app/template.html",
            controller: "course-ctrl",
            title:"课程管理"
        })
    }]

    )
    
    
})