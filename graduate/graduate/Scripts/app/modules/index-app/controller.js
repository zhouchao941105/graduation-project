define([
    "angular"
], function(angular) {
    return angular.module("IndexApp.controller", [ "service.currentUser"])
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
            var url = '/api/scheduleService/GetHomePageScheduleList';
            $scope.loadList = function (page) {
                $scope.home.func(1);
            }
            $scope.home = {
                pageIndex: 1,
                pageSize: 10,
                id: '',
                func: function (page) {
                    this.pageIndex = page ? page : 1;
                    $scope.queryData(this.pageIndex).then(function (data) {
                        $scope.data = data.data.data;
                        $scope.home.total = data.data.data.totalCount;
                    })
                }
            };
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

            $scope.queryData = function (page) {
                var param = {
                    filter: {
                        type: $scope.state,
                    },
                    order:$scope.order,
                    page:{
                        pageIndex: page,
                        pageSize:10
                    }
                }
                return $http.post(url, param);
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