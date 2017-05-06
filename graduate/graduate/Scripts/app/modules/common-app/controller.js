"use strict";

define([
    "angular",
    'modules/common-app/service',
    'services/current-user-service'], function (angular) {
        return angular.module("CommonApp.controller", ["CommonApp.service", 'service.currentUser'])
            .controller("CommonController", ["$scope", "$rootScope", "commonService", 'currentUserService', 'rolesService',
                function ($scope, $rootScope, commonService, currentUserService, rolesService) {
                    $scope.currentUserService = currentUserService;

                    // $scope.saLimit = false;
                }
            ]);
    });