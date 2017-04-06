'use strict';


define([
    'angular',
    'jquery',
    'moment',
    'services/current-user-service',
    'uiRouter'
], function (angular, $, moment) {
    angular.module('components.export.directive', ['service.currentUser', 'ui.router', "Dialog.services"])
    .directive('exportExcel', ['currentUserService', '$state', '$rootScope', '$timeout', '$http', 'gintDialog',
            function (currentUserService, $state, $rootScope, $timeout, $http, gintDialog) {
                return {
                    restrict: 'EA',
                    scope: {
                        outPut: "=",
                        scheId: "=",
                        url: "=",
                        type: "="
                    },
                    templateUrl: "components/export/export.html",
                    link: function (scope) {
                        scope.cancel = function () {
                            scope.startDate = "";
                            scope.endDate = "";
                            scope.outPut = false;
                        }
                        scope.tempDate=new Date();
                        scope.confirm = function () {
                            var param = {
                                beginTime: moment(scope.startDate).format("YYYY/MM/DD") || moment(scope.tempDate).format("YYYY/MM/DD"),
                                endTime: moment(scope.endDate).add(1,'d').format("YYYY/MM/DD") || moment(scope.tempDate).add(1,'d').format("YYYY/MM/DD")
                            }
                            param[scope.type] = scope.scheId;
                            if(scope.startDate&&!scope.endDate){
                                gintDialog.error("请选择结束时间")
                                return false;
                            }
                            if(!scope.startDate&&scope.endDate){
                                gintDialog.error("请选择开始时间")
                                return false;
                            }
                            if (Date.parse(scope.startDate) > Date.parse(scope.endDate)) {
                                gintDialog.error("开始日期必须小于结束日期");
                            }
                            else {
                                window.open(scope.url +'?'+ $.param(param, false));
                            }

                        }
                    }
                }
            }
    ]);
})