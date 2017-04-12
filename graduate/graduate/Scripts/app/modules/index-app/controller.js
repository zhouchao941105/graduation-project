define([
    "angular"
], function(angular) {
    return angular.module("IndexApp.controller", [ "CommonFilter","service.currentUser"])
        .controller("IndexAppController", ["$scope", "gridHelper", "$http", "currentUserService", "rolesService", "$location", function ($scope, gridHelper, $http, currentUserService, rolesService, $location) {
            $scope.schedule = currentUserService.hasPermission([rolesService.EasScheduling], false);
            $scope.student = currentUserService.hasPermission([rolesService.EasStudentManage], false);
            $scope.class = currentUserService.hasPermission([rolesService.EasClassManage], false);
            $scope.course = currentUserService.hasPermission([rolesService.EasCourseManage], false);
            $scope.teacher = currentUserService.hasPermission([rolesService.EasEmployeeManage], false);
            $scope.classRoom = currentUserService.hasPermission([rolesService.EasClassroom], false);
            $scope.classTime = currentUserService.hasPermission([rolesService.EasClassTime], false);
            $scope.data = {};
            $scope.state = 0;
            
           
            
            $scope.order = {
                filed: 'beginTime',
                asc: true
            };

            $scope.changeOrderIndex = function (filedName) {
                if ($scope.order.filed != filedName) {
                    $scope.order = {
                        filed: filedName,
                        asc: true
                    };
                } else {
                    $scope.order.asc = !$scope.order.asc;
                }
                $scope.home.func($scope.home.pageIndex);
            }

            

            $scope.changeFilter = function (num) {
                $scope.state = num;
                $scope.order = {
                    filed: 'beginTime',
                    asc: true
                };
                $scope.home.pageIndex = 1;
                $scope.home.func($scope.home.pageIndex);
            }

            $scope.locate = function(item) {
                $scope.$state.go("schedule",{ id: item.scheduleId });
            }
            
        }
    ]);
});