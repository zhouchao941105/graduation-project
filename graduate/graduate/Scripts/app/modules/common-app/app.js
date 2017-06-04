"use strict";

define([
        "angular",
        "uiRouter",
        "ngDialog",
        "components/nav/app",
        "modules/common-app/controller",
        "modules/schedisplay-app/app",
        "modules/class-management-app/app",
        "modules/classroom/app",
        "modules/teacher-list-app/app",
        "modules/course-app/app",
        "modules/sche-app/app"
        
],
    function (angular) {
        return angular.module("CommonApp", [
                "ui.router",
                "ngDialog",
                "components.nav",
                "CommonApp.controller",
                "sche.app",
                "ClassManagementApp",
                "classroom-app",
                "TeacherListApp",
                "course.app",
                "sche-app"
                
            ])
            .config([
                '$urlRouterProvider', function($urlRouterProvider) {
                    $urlRouterProvider
                        .otherwise('/display');
                }
            ])
            .run([
                '$rootScope', '$state', '$stateParams',
                function($rootScope, $state, $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ])
            
            .value("version", "0.1")
            .constant("projectName", "1CourseEas")
            .config([
                "projectName", function(projectName) {
                }
            ])
            // 对请求中html文件 做非缓存处理
            // 全局HTTP处理
            .config([
                "$httpProvider", function($httpProvider) {
                    $httpProvider.interceptors.push([
                        '$q', '$rootScope', function ($q, $rootScope) {
                            //记录请求流
                            var loadingFlags = "";
                            return {
                                request: function(config) {
                                    //监控Angularjs get请求 如果请求地址含有html文件，则给其加版本戳，已防止缓存
                                    var urlArgs = "version=" + (new Date()).getTime();
                                    var baseUrl = "";
                                    if (typeof (requirejs) != "undefined") {
                                        urlArgs = requirejs.s.contexts._.config.urlArgs;
                                        baseUrl = requirejs.s.contexts._.config.baseUrl;

                                    }
                                    if (config.method == 'GET') {
                                        if (config.url.indexOf('.html') !== -1 || config.url.indexOf('.htm') !== -1) {
                                            baseUrl = '/Scripts/app/';
                                            var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                                            config.url = baseUrl + config.url + separator + urlArgs;
                                            //config.url = config.url + separator + urlArgs;
                                        }
                                    }
                                    if (config.url.indexOf('.html') == -1 || config.url.indexOf('.htm') == -1) {
                                        //给config携带一个loading计时标识
                                        config.loadingTimer = setTimeout(function () {
                                            if (!$('.is-show-loading').length){
                                                $('body').append('<div class="modal is-show-loading"><div class="loading-box"></div></div>');
                                            }
                                        }, 1000);
                                        loadingFlags += "," + config.loadingTimer;
                                    }
                                    return config;
                                },
                                response: function (response) {
                                    if (response.config.url.indexOf('.html') == -1 || response.config.url.indexOf('.htm') == -1) {
                                        //清理计时 并且删除loading效果
                                        clearTimeout(response.config.loadingTimer);
                                        loadingFlags = loadingFlags.replace(',' + response.config.loadingTimer, '');
                                        if (loadingFlags === "") {
                                            $('.is-show-loading').remove();
                                        }
                                    }
                                    return response;
                                }
                                // responseError: function (response) {
                                //     clearTimeout(response.config.loadingTimer);
                                //     $('.is-show-loading').remove();
                                //     var school = document.cookie.match(/\bschool=([^;]+)/)[1] || "";
                                //     var logoutUrl = document.cookie.replace(/(?:(?:^|.*;\s*)logoutUrl\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                                //     switch (response.status) {
                                //     case 497:
                                //         //alert($translate.instant(90087));
                                //         top.location.href = '/' + school + '/Login';
                                //         break;
                                //     case 498:
                                //         //alert($translate.instant(90088));
                                //         if (logoutUrl && logoutUrl != "") {
                                //             top.location.href = logoutUrl;
                                //         } else {
                                //             top.location.href = '/' + school + '/Login';
                                //         }
                                //         break;
                                //     case 499:
                                //     case 500:
                                //         //alert($translate.instant(90089));
                                //         break;
                                //     default:
                                //         break;
                                //     }
                                //     return $q.reject(response);
                                // }
                            };
                        }
                    ]);
                }
            ])
            .config([
                'ngDialogProvider', function(ngDialogProvider) {
                    ngDialogProvider.setDefaults({
                        //className: 'ngdialog-theme-default',
                        template: 'templates/dialogs/default.html',
                        overlay: true,
                        plain: false,
                        showClose: false
                    });
                }
            ])
            .config(['$stateProvider',
                function ($stateProvider) {
                    $stateProvider.state('base',
                    {
                        abstract: true,
                        url: '/display',
                        // Example of loading a template from a file. This is also a top level state,
                        // so this template file will be loaded and then inserted into the ui-view
                        // within index.html.
                        templateUrl: 'modules/common-app/template.html',
                        controller: 'commonController'
                    });
                }
            ])
            
    }
);
