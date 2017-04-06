define([
    "angular",
    "services/commonService",
    "services/dialogService",
    "services/grid",
    "modules/teacher-list-app/services",
    "components/multiple-popup/directive",
], function (angular) {
    return angular.module("TeacherListApp.controller", ["Common.services", "Dialog.services", "GridService",            "TeacherListApp.services",
            "Components.multiplePopup"])
        .controller("TeacherListAppController", ["$scope", "selectedKeyService", "gintDialog", "gridHelper", "teacherListServices", "multiplePopupConfig", 'userService', 'messages', 'currentUserService', 'rolesService', function ($scope, selectedKeyService, gintDialog, gridHelper, teacherListServices, multiplePopupConfig, userService, messages, currentUserService, rolesService) {
            $scope.excelUrl = "/api/DataProcessing/DataImportEmployee"  //导入
            $scope.uploadType = 4;

            //上传文件成功/部分成功回调
            $scope.callback = function () {
                $scope.init()
            };

            $scope.searchPlaceHolder = "员工姓名／用户名／联系方式";
            $scope.empStatus = [
                        { key: 1, value: "在职" }, { key: 0, value: "离职" }
            ];
            var tempIds = [];
            //离职复职切换对象
            var stateBtn = [{ type: 1, text: "复职", des: "复职后的员工可以在员工选择列表中看到，确定要复职吗？", icon: "btn-iconReinstate" }, { type: 0, text: "离职", des: "已离职的员工不出现在员工选择列表中，确定离职吗？", icon: "btn-iconLeave" }];
            $scope.statusSelect = function (data) {
                $scope.filterPre.state = data.key;
            }
            //获取列表
            $scope.loadList = function (page) {
                $scope.queryData(page||1)
                    .then(function (data) {
                        $scope.list = data.list;
                        $scope.total = data.totalCount;
                        angular.extend($scope.btns[2], stateBtn[$scope.filterPreNow.state]);
                    });
                //刷新界面重置筛选ID
                tempIds = [];
            };
            //显示详情
            $scope.showDetail = function (id) {
                $scope.$broadcast('showEmpDetail', id);
            }
            //显示编辑
            $scope.edit = function(id) {
                $scope.empEditId = id;
                $scope.showEdit = true;
                $scope.$broadcast('showEmpEdit',id);
                event.stopPropagation();
            }
            $scope.MultiplePopup = {
                department: new multiplePopupConfig(teacherListServices.popupConfig().departmentPop),
                schoolArea: new multiplePopupConfig(teacherListServices.popupConfig().schoolAreaPop)
            }
            $scope.MultiplePopup.department.confirmAction = function (data) {
                $scope.filterPre.departmentIds = data.list.map(function (v) { return v.id });
                if (!data.list.length) {
                    $scope.filterPre.departmentIds = null;
                    return;
                }
                console.log(data.list);
                $scope.MultiplePopup.department.departmentName = data.list[0].name;
            };
            $scope.MultiplePopup.schoolArea.confirmAction = function (data) {
                $scope.filterPre.schoolIds = data.list.map(function (v) { return v.id });
                if (!data.list.length) {
                    $scope.filterPre.schoolIds = null;
                    return;
                }
                $scope.MultiplePopup.schoolArea.name = data.list[0].name;
            };
            //列表复选框事件
            $scope.selectItem = function (id) {
                $scope.select(id);
                tempIds = selectedKeyService.all($scope.selectedKeys);
                // 停止执行后面的函数
                event.stopPropagation();
            };
            $scope.selectAllByLive = function () {
                $scope.isAllSelected = !$scope.isAllSelected;
                for (var key in $scope.selectedKeys) {
                    $scope.selectedKeys[key] = $scope.isAllSelected;
                }
                tempIds = selectedKeyService.all($scope.selectedKeys);
            };
            //重置筛选事件
            $scope.resetSearch = function () {
                //清空filterPre
                $scope.initFilter();
                $scope.clearFilter($scope.filterPre);
                angular.extend($scope.btns[2], stateBtn[$scope.filterPreNow.state]);
                $scope.loadList();
            }
            $scope.init = function () {
                //列表请求config
                $scope.config = {
                    defaultQueryUrl: '/api/UserService/GetEmployeeList'
                }
                //grid服务，有关列表更新，筛选
                gridHelper.extendGridScope($scope,
                    $scope.config.defaultQueryUrl,
                    null);
                $scope.initFilter();
                //拷贝一个初始化筛选器对象，用于下面的重置函数
                $scope.filterPreTemp = angular.copy($scope.filterPre);
                $scope.filterPreNow = angular.copy($scope.filterPre);
                $scope.loadList();
            }
            //分页点击事件
            $scope.changePage = function (page) {
                console.log();
                $scope.loadList(page);
            };
            //高级搜索
            $scope.searchList = function () {
                $scope.filterPreNow = angular.copy($scope.filterPre);
                console.log($scope.filterPre);
                $scope.loadList();
            }
            //初始化高级搜索
            $scope.initFilter = function () {
                $scope.selectBox = {
                    Status: $scope.empStatus[0]
                }
                $scope.filterPre = {
                    departmentIds: null,
                    schoolIds: null,
                    state:1
                };
            }
            //员工编辑权限
            $scope.isShowEidt = currentUserService.hasPermission([rolesService.EasEmployeeEdit], false);
            $scope.btns = [{
                text: "新增员工",
                disable: currentUserService.hasPermission([rolesService.EasEmployeeAdd], false),
                func: function () {
                    $scope.showEdit = true;
                }
            },
            {
                text: "批量导入",
                disable: currentUserService.hasPermission([rolesService.EasEmployeeBatchImport], false),
                func: function () {
                    $scope.showUpload = true;
                }
            },
            {
                text: "离职",
                disable: currentUserService.hasPermission([rolesService.EasEmployeeState], false),
                type: 0,
                des: "已离职的员工不出现在员工选择列表中，确定离职吗？",
                func: function () {
                    var id = selectedKeyService.all($scope.selectedKeys).map(function (v) {
                        return parseInt(v);
                    });
                    if (id.length) {
                        var postObj = id;
                        var type = this.type;
                        gintDialog.confirm('提醒', this.des).then(function () {
                            if (!type) {
                                userService.disableEmployees(postObj).success(function (result) {
                                    if (result.type == 0) {
                                        gintDialog.success('操作成功！');
                                        $scope.loadList();
                                    } else {
                                        gintDialog.error(messages[result.type]);
                                    }
                                });
                            } else {
                                userService.enableEmployees(postObj).success(function (result) {
                                    if (result.type == 0) {
                                        gintDialog.success('操作成功！');
                                        $scope.loadList();
                                    } else {
                                        gintDialog.error(messages[result.type]);
                                    }
                                });
                            }
                           
                        });
                    } else {
                        gintDialog.error("请至少勾选一个员工！");
                    }
                }
            },
            {
                text: "同步员工",
                disable: currentUserService.hasPermission([rolesService.EasCourseEmployeeSync], false) || currentUserService.hasPermission([rolesService.EasCrmEmployeeSync], false),
                func: function () {
                    $scope.$broadcast('showEmpAsyn');
                }
            }
            ];
        }
        ]);
});