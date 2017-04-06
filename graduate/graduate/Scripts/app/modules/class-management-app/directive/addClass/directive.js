/**
 新增/编辑班级
 by xcq
 */
define(['angular',
    "modules/class-management-app/services",
    "services/dialogService",
    "components/common/directive"
], function (angular) {
    angular.module('ClassManagementApp.addClass', ["ClassManagementApp.services", "Dialog.services", "Components.common"])
        .directive('addClass', ['classManagementServices', 'gintDialog', 'gintFormCheck', function (classManagementServices, gintDialog, gintFormCheck) {
            return {
                restrict: 'E',
                scope: {
                    showClassPopup: '=',
                    type: '=',
                    relate: '=',
                    addEditInfo: '=',
                    showDropUl: '=',
                    campus: '=',
                    addEditClass: '&'
                },
                templateUrl: 'modules/class-management-app/directive/addClass/template.html',
                link: function ($scope, element, attrs) {
                    var page = 1;
                    //取消班级操作
                    $scope.cancelClass = function () {
                        $scope.addEditInfo = {};
                        $scope.showClassPopup = false;
                    }

                    $scope.$watch('showClassPopup', function (newValue) {
                        if (newValue) {
                            page = 1;
                            $scope.showDropUl = false;
                        }
                    })

                    $scope.csCampus = function () {
                        if ($scope.relate) return;
                        $scope.showDropUl = !$scope.showDropUl;
                    }

                    //校区下拉选择
                    $scope.chooseCampus = function (item) {
                        $scope.showDropUl = false;
                        if (item.id == $scope.addEditInfo.soldedSchoolId) return;
                        $scope.addEditInfo.soldedSchoolId = item.id;
                        $scope.addEditInfo.schoolNames = item.name;
                        $scope.addEditInfo.courseId = '';
                        $scope.addEditInfo.courseName = '';
                    }

                    $scope.chooseCourseParam = {
                        isShow: false,
                        singleOptions: classManagementServices.getClassSinglePopOption()
                    };
                    //选择课程
                    $scope.chooseCourse = function () {
                        if (!$scope.addEditInfo.soldedSchoolId) {
                            return gintDialog.error("请选择上课校区",1);
                        }
                        classManagementServices.soldedSchoolId = $scope.addEditInfo.soldedSchoolId;
                        $scope.chooseCourseParam.isShow = true;
                    }

                    $scope.chooseCourseParam.confirmCallback = function (data) {
                        if (!data) return;
                        $scope.addEditInfo.courseId = data.courseId;
                        $scope.addEditInfo.courseName = data.courseName;
                    }

                    //添加或者编辑班级
                    $scope.classValite = function () {
                        gintFormCheck.check($scope.classCheck, $scope.addEditInfo).then(function (data) {
                            if ($scope.addEditInfo.openTime && $scope.addEditInfo.closeTime) {
                                if ($scope.addEditInfo.openTime > $scope.addEditInfo.closeTime) {
                                    gintDialog.error('开班时间晚于结班时间，请重新选择！', 1);
                                    return;
                                }
                            }
                            $scope.addEditClass();
                        })
                    }
                    $scope.classCheck = {
                        classSerial: { lab: "班级编号", require: 1, limit: 100 },
                        className: { lab: "班级名称", require: 1, limit: 100 },
                        soldedSchoolId: { lab: "上课校区", require: 1,select: 1 },
                        courseId: { lab: "课程名称", require: 1,select: 1 },
                    }


                    //下拉刷新
                    $scope.$on("gintLoadPageScrollData", function () {
                        if ($scope.campus.currentIndex < Math.ceil($scope.campus.totalCount / 10)) {
                            page++;
                            classManagementServices.getSchoolList(page).then(function (data) {
                                if (data.list.length > 0) {
                                    $scope.campus.list = $scope.campus.list.concat(data.list)
                                }
                            });
                        }
                    });
                }
            };
        }])
});
