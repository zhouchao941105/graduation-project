/**
 学员详情组件
 by binhao
 2017年3月14日14:48:25
 */
define(['angular', 'services/net/userService'], function (angular) {
    angular.module('StudentManagementApp.stuDetail', ['services.net.userService'])
        .directive('stuDetail', ['userService', 'classService', 'gintDialog', 'messages', 'scheduleService','rolesService','currentUserService', function (userService, classService, gintDialog, messages, scheduleService,rolesService,currentUserService) {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'modules/student-management-app/directive/stuDetail/stuDetail.html',
                link: function ($scope, element, attrs) {
                    $scope.showDetailPop = false;
                    $scope.outCourse = currentUserService.hasPermission([rolesService.EasStudentSignOut]);
                    $scope.$on('showStuDetail', function (event,msg) {
                        $scope.showDetailPop = true;
                        $scope.id = msg;
                        $scope.getSchedule = scheduleService.queryStudentSchedules;
                        //zhouchao
                        $scope.excelstu="/ExcelExport/ExportStudentSchedule";
                        $scope.type="studentId";
                        
                        $scope.loadSchedule = function() {
                            userService.getStudentdetails(msg).success(function (data) {
                                $scope.student = data.data;
                            });
                        }
                        $scope.loadSchedule();
                        $scope.config = {
                            "studentId": msg,
                            "page": {
                                "pageIndex": 1,
                                "pageSize": 5
                            }
                        }
                        $scope.loadList = function (index) {
                            $scope.config.page.pageIndex = index||1;
                            userService.getSignUpInfoList($scope.config).success(function (data) {
                                $scope.list = data.data.list;
                                $scope.total = data.data.totalCount;
                            });
                        }
                        //退课确认
                        $scope.dropCourse = function (paramObj) {
                            gintDialog.confirm("确认提示", "确认退课？").then(function () {
                                $scope.handelDropCourse(paramObj);
                            });
                        }
                        //退课操作请求
                        $scope.handelDropCourse = function (paramObj) {
                            classService.updateCourseStudentIsOut(paramObj).success(function (res) {
                                if (res.type == 0) {
                                    gintDialog.success('操作成功！');
                                    $scope.loadList();
                                    $scope.loadSchedule();
                                    $scope.$parent.loadList($scope.$parent.page.pageIndex);
                                } else {
                                    gintDialog.error(messages[res.type]);
                                }
                            });
                        }
                        //验证是否可以退课
                        $scope.checkDropCourse = function (item) {
                            var paramObj = {
                                courseId: item.courseId,
                                studentId: msg,
                                classId:item.classId
                            }
                            if (item.classId) {
                                classService.getStudentSchedule(paramObj).success(function (data) {
                                    if (!data.data) {
                                        $scope.dropCourse(paramObj);
                                    } else {
                                        gintDialog.confirm("确认提示", '学员已排课，退课后将从后续班级排课中移除该学员，确认退课？').then(function () {
                                            $scope.handelDropCourse(paramObj);
                                        });
                                    }
                                });
                            } else {
                                $scope.dropCourse(paramObj);
                            }
                        }
                        $scope.loadList();
                        $scope.hideDetail = function () {
                            $scope.showDetailPop = false;
                        }
                    });
                }
            };
        }]);
});
