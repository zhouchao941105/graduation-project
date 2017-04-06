define([
    "angular",
    "services/commonService",
    "modules/class-management-app/services",
    "services/dialogService",
    "commonDirective",
    "services/current-user-service",
], function (angular) {
    return angular.module("ClassManagementApp.controller", [ "Common.services", "ClassManagementApp.services",   "Dialog.services", "service.currentUser"])
        .controller("ClassManagementAppController", ["$scope", "classManagementServices", "gintDialog", "messages", "currentUserService", "rolesService", function ($scope, classManagementServices, gintDialog, messages, currentUserService, rolesService) {
            $scope.pageSize = 10;
            $scope.classListTotal = 0;
            $scope.type = '';
            $scope.searchKey = '';
            $scope.chooseIndex = 0;
            $scope.isEmpty = true;
            $scope.openTime = "";
            $scope.closeTime = "";
            $scope.showClassPopup = false;//新增或者编辑班级弹框
            $scope.addEditInfo = {};//新增编辑数据
            $scope.showUpload = false;
            $scope.isConflict = false;  //是否日程冲突
            $scope.excelUrl = "/api/DataProcessing/DataImportClass";
            $scope.uploadType = 0;
            $scope.relate = false;
            var students = '';
            $scope.order = null;
            $scope.permission = {
                add: currentUserService.hasPermission([rolesService.EasClassAdd], false),
                uploadImport: currentUserService.hasPermission([rolesService.EasClassBatchImport], false),
                edit: currentUserService.hasPermission([rolesService.EasClassEdit], false),
                closeClass: currentUserService.hasPermission([rolesService.EasClassState], false),  //结班
                classStudent:currentUserService.hasPermission([rolesService.EasClassStudent], false) //班级学员管理
            }

            $scope.listPage = {
                pageIndex: 1,
                pageSize: 10
            }
            $scope.$on('refreshlist', function () {
                init();
            })
            

            $scope.callback = function () {
                init();
            }

            $scope.onSearchKeyPress = function ($event) {
                if ($event.keyCode == 13) {
                    $scope.searchClassList();
                }
            };

            var orderLists = [
                {
                    filed: 'startDate',
                    Asc: false,
                },
                {
                    filed: 'endDate',
                    Asc: false,
                },
            ];
            function getClassList() {
                var classDate = {
                    key: $scope.searchKey,  //string 关键词  无关键词自动搜索全部
                    filter: { classState: $scope.chooseIndex },  // int 0 全部班级  1 结班班级  2  运行中班级
                    order: $scope.order,
                    page:
                    {
                        pageIndex: $scope.listPage.pageIndex,  // 当前请求页码,
                        pageSize: $scope.listPage.pageSize  // 每页显示条数
                    }
                };
                classManagementServices.getClassList(classDate).success(function (data) {
                    if (data.status == 1) {
                        $scope.classList = data.data;
                        //$scope.classList = data.data;
                        var length = $scope.classList.list.length;
                        $scope.classListTotal = data.data.totalCount;
                        length == 0 ? $scope.isEmpty = true : $scope.isEmpty = false;
                    }
                    if (data.status == 0) {
                        if (data.message) {
                            gintDialog.error(data.message);
                        }
                        else if (data.type) {
                            gintDialog.error(data.messages[type]);
                        }
                    }
                });
            }
            getClassList();


            //切换tab页
            $scope.chooseClass = function (index) {
                if (index == $scope.chooseIndex) return;
                $scope.chooseIndex = index;
                //发送参数为1请求
                init();
            };


            //更改排序
            $scope.changeOrder = function (index) {
                orderLists[index].Asc = !orderLists[index].Asc;
                orderLists[(index + 1) % 2].Asc = false;
                $('.icon-sort-js').removeClass('icon-sort-up');
                $('.icon-sort-js').removeClass('icon-sort-down');
                if (orderLists[index].Asc) {
                    $($('.icon-sort-js')[index]).addClass('icon-sort-up')
                }
                else {
                    $($('.icon-sort-js')[index]).addClass('icon-sort-down')
                }
                $scope.order = orderLists[index];
                getClassList();
            }

            //新增班级
            $scope.addClass = function () {
                getSchoolList(1);
                $scope.showClassPopup = true;
                $scope.addEditInfo = {};
                $scope.type = 1;
                $scope.relate = false;
            }

            function getSchoolList(page) {
                classManagementServices.getSchoolList(page).then(function (data) {
                    $scope.campus = data;
                });       
            }


            //编辑班级
            $scope.editClass = function (id) {
                $scope.relate = false;
                var e = window.event;
                event.stopPropagation();
                classManagementServices.getClassIsRelation({ ClassId: id }).success(function (data) {
                    if (data.status == 1) {
                        $scope.relate = data.data;
                    }
                });
                $scope.type = 2;
                $scope.showClassPopup = true;
                getSchoolList(1);
                classManagementServices.editClass(id).then(function (data) {
                    $scope.addEditInfo = data;
                });
            }

            $scope.searchClassList = function () {   //搜索班级
                getClassList();
            };

            //查看班级
            $scope.getClassDetails = function (id,hasCloseClass) {
                var msg = {
                    id: id,
                    classStudent: $scope.permission.classStudent,
                    hasCloseClass: hasCloseClass
                }
                $scope.$broadcast('classDetail', msg);
            }

            //结班
            $scope.closeClass = function (id) {
                var e = window.event;
                event.stopPropagation();
                gintDialog.confirm('提示', '结班班级不出现在排课选择班级中，确认结班吗？').then(function (data) {
                    classManagementServices.updateClassOverClass({ ClassId: id }).success(function (data) {
                        if (data.status == 1) {
                            init();
                        }
                    })
                })
                
            }

            

            //分页回调
            $scope.listPageAction = function (page) {
                $scope.listPage.pageIndex = page;
                getClassList();
            };

            //添加或者修改班级
            $scope.addEditClass = function () {
                var info = $scope.addEditInfo;
                var params = {
                    classSerial: info.classSerial,  // string 班级编号
                    className: info.className, // string 班级名称
                    soldedSchoolId: info.soldedSchoolId,  //  long 校区id
                    openTime: info.openTime, //string 开班时间
                    closeTime: info.closeTime,  //string 结班时间
                    courseId: info.courseId, // long 课程id
                }
                if ($scope.type == 1) {  //新增
                    classManagementServices.createClass(params).success(function (data) {
                        if (data.status == 1) {
                            $scope.showClassPopup = false;
                            gintDialog.success();
                            $scope.addEditInfo = {};
                            init();
                        }
                        if (data.status == 0) {
                            if (data.message) {
                                gintDialog.error(data.message,1);
                            }
                            else if (data.type) {
                                gintDialog.error(messages[data.type],1);
                            }
                        }
                    })
                }
                if ($scope.type == 2) {  //编辑
                    params.id = info.id;
                    classManagementServices.updateClass(params).success(function (data) {
                        if (data.status == 1) {
                            $scope.showClassPopup = false;
                            gintDialog.success();
                            $scope.addEditInfo = {};
                            init();
                        }
                        if (data.status == 0) {
                            if (data.message) {
                                gintDialog.error(data.message,1);
                            }
                            else {
                                gintDialog.error(messages[data.type],1);
                            }
                        }
                    })
                }
            }


            function init() {
                $scope.listPage.pageIndex = 1;
                $scope.searchKey = '';
                $('.icon-sort-js').removeClass('icon-sort-up');  //筛选条件
                $('.icon-sort-js').removeClass('icon-sort-down'); //筛选条件
                $scope.order = null;
                getClassList();
            }
        }
        ]);
});