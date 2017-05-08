"use strict";

define([
    'angular',
    'services/bounced',
    'services/current-user-service',
    'services/dialogService',
    'components/nav/service',
    'services/net/userService'
], function (angular) {
    angular.module("components.nav.directive.directive", ['service.currentUser', 'Dialog.services', 'Bounced.services', 'components.nav.services', 'services.net.userService'])
        .directive("setDialog", [
            "$q", "$timeout", 'gintDialog', 'currentUserService', 'navNetService', 'navValidator','userService',
    function ($q, $timeout, gintDialog, currentUserService, navNetService, navValidator, userService) {

        function saveHeadImg(scope) {
            var deferred = $q.defer();

            navNetService.uploadUserHead(scope.jsonImageData).then(function (data) {
                scope.headImgUrl = data;
                // currentUserService.getCurrentUser().userHeadImg = data;
                scope.changeImgAction({
                    url: data
                });
                deferred.resolve();
            }, function (reason) {
                deferred.reject(reason);
            });

            return deferred.promise;
        }

        function reset(scope) {
            scope.tabNum = 1;
            scope.oldPwd = '';
            scope.newPwd = '';
            scope.comparePwd = '';
            // scope.headImgUrl = currentUserService.getCurrentUser().userHeadImg;
        }

        return {
            restrict: 'EA',
            scope: {
                isShow: '=',
                changeImgAction:"&"
            },
            templateUrl: 'components/nav/directive/template.html',
            link: function (scope, iElement, iAttr) {
                // scope.headImgUrl = currentUserService.getCurrentUser().userHeadImg;
                scope.jsonImageData = {};
                reset(scope);

                scope.switchTab = function (type) {
                    scope.tabNum = type;
                };

                scope.cancle = function () {
                    scope.isShow = false;
                    reset(scope);
                };

                scope.confirm = function () {
                    if (scope.tabNum === 1) {
                        $.post('/Default/modpassword',{"oldpassword":scope.oldPwd,"newpassword": scope.newPwd})
                            .then(function (data) {
                                gintDialog.success("success")
                            })
                            .then(function () {
                                scope.isShow = false;
                                location.href="/Default/login";
                            })
                            .catch(function (reason) {
                                gintDialog.error(reason, 1);
                            });
                    } 
                };
            }
        }
    }
        ]);
});
