'use strict';


define([
    'angular',
    'jquery',
    'services/current-user-service',
    'components/nav/service',
    'uiRouter',
    'services/dialogService'
], function (angular, $) {
    angular.module('components.nav.directive', ['service.currentUser', 'ui.router',  'components.nav.services',"Dialog.services"])
        .directive('gintNav', ['currentUserService', 'rolesService', '$state', '$rootScope', '$timeout', '$http','navNetService','gintDialog',
            function (currentUserService, rolesService, $state, $rootScope, $timeout, $http,navNetService,gintDialog) {
                function moveToActive(left, width) {
                    $("li.navbar-current").stop(true, true).animate({
                        left: left,

                    }, 'fast');
                    $("li.navbar-current").width(width);
                }

                function mouseEnterAction() {
                    var left = $(this).position().left;
                    var width = $(this).width();
                    moveToActive(left, width);
                }

                function mouseLeaveAction() {
                    var navItems = $('ul.navbar-nav-left li.navbar-nav-item');
                    for (var i = 0, length = navItems.length; i < length; i++) {
                        if ($(navItems[i]).find('.active').length > 0) {
                            var position = $(navItems[i]).position();
                            var left = position ? position.left : 0;
                            var width = $(navItems[i]).width();
                            moveToActive(left, width);
                            return;
                        }
                    };
                    moveToActive(0, 0);
                }

                function navDownAction() {
                    var navItems = $('ul.navbar-nav-left li.navbar-nav-item');
                    for (var i = 0, length = navItems.length; i < length; i++) {
                        if ($(navItems[i]).find('.active').length > 0) {
                            $(navItems[i]).addClass('nav-current');
                        } else {
                            $(navItems[i]).removeClass('nav-current');
                        }
                    }
                }

                function init(scope) {
                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        //TOFIX
                        $timeout(mouseLeaveAction);
                        $timeout(navDownAction);
                    });
                    $('ul.navbar-nav-left li.navbar-nav-item').mouseenter(mouseEnterAction);
                    $("ul.navbar-nav-left").mouseleave(mouseLeaveAction);
                }



                return {
                    restrict: 'EA',
                    scope: {
                        ngModel: '=',
                        hasCorrect: "=",
                        countData: "="
                    },
                    templateUrl: 'components/nav/nav.html',
                    link: function (scope, iElement, iAttr) {
                        scope.isShow=false;
                        scope.openDialog = function () {
                            scope.isShow = true;
                        }
                        scope.logout = function () {
                            navNetService.logout().then(function () {
                                var school = document.cookie ? document.cookie.match(/\bschool=([^;]+)/)[1] : null;
                                location = school ? '/'+ school + '/Login' : "/";
                            })
                                .catch(function (reason) {
                                    gintDialog.error(reason);
                                });
                        };
                        // init(scope);
                        var data={
                            name:"zhouchao",
                            count:15
                        }
                        scope.add = function () {
                            $http.post('Default/addclass',data).then(function(){
                            })
                        }
                    }
                };
            }
        ]);
});
