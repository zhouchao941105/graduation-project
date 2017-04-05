"use strict";

define(["angular"], function (angular) {
    return angular.module("CommonApp.service", [])
        .factory("commonService", [
            function() {
                var commonService = {};

                return commonService;
            }
        ]);
});