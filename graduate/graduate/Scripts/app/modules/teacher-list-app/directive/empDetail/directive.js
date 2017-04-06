/**
 Ա����������
 by binhao
 2017��3��14��14:48:25
 */
define(['angular', 'services/net/userService', 'services/net/scheduleService'], function (angular) {
    angular.module('TeacherListApp.empDetail', ['services.net.userService'])
        .directive('empDetail', ['userService', 'scheduleService', function (userService, scheduleService) {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'modules/teacher-list-app/directive/empDetail/empDetail.html',
                link: function ($scope, element, attrs) {
                    $scope.showContrl = false;
                    
                    $scope.$on('showEmpDetail', function (event, msg) {
                        $scope.id = [msg];
                        $scope.showContrl = true;
                        $scope.getSchedule = scheduleService.queryTeacherSchedules;
                        userService.getEmployeeDetails(msg).success(function (data) {
                            if (data.type != 0) {
                                return;
                            }
                            $scope.empInfo = data.data;
                            $scope.empInfo.departmentIds = $scope.empInfo.departmentIds.map(function (v) { return v.name }).join(',');
                        });
                        $scope.hideDetail = function () {
                            $scope.showContrl = false;
                        }
                        //add by zhouchao
                        $scope.excel=false;
                        $scope.excelemp= "/ExcelExport/ExportEmployeeSchedule";
                        $scope.type="teacherId";
                        
                    });
                }
            };
        }]);
});
