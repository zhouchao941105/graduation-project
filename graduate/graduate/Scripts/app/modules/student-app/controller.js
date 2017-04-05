define([
    "angular"
], function (angular) {
    return angular.module("StudentManagementApp.controller", [])
        .controller("StudentManagementAppController", ["$scope", 'userService', 'gridHelper', 'selectedKeyService', "gintDialog", 'rolesService', 'currentUserService', function ($scope, userService, gridHelper, selectedKeyService, gintDialog, rolesService, currentUserService) {

            $scope.excelUrl = "/api/DataProcessing/DataImportStudent"  //导入
            $scope.uploadType = 3;
            $scope.excelstu="/ExcelExport/ExportStudentSchedule"//导出课表
            $scope.type="studentId";

            //上传文件成功/部分成功回调
            $scope.callback = function () {
                $scope.init()
            };
            $scope.$on('loadmsgfromimport', function () {
                console.log('导入成功后刷新列表');
            });

            //获取列表
            $scope.loadList = function (page) {
                $scope.queryData(page || 1)
                    .then(function (data) {
                        $scope.list = data.list;
                        $scope.total = data.totalCount;
                    });
                //刷新界面重置筛选ID
                tempIds = [];
            };
            $scope.init = function () {
                //列表请求config
                $scope.config = {
                    defaultQueryUrl: '/api/UserService/getStudentList'
                }
                //grid服务，有关列表更新，筛选
                gridHelper.extendGridScope($scope,
                    $scope.config.defaultQueryUrl,
                    null);
                $scope.loadList();
            }
            //列表复选框事件
            $scope.selectItem = function (id) {
                $scope.select(id);
                // 停止执行后面的函数
                event.stopPropagation();
            };
            //显示编辑
            $scope.edit = function(id) {
                $scope.$broadcast('showStuEdit', id);
                event.stopPropagation();
            }
            //显示详情
            $scope.showDetail = function (id) {
                $scope.$broadcast('showStuDetail',id);
            }

            //学员编辑权限
            $scope.isShowEidt = currentUserService.hasPermission([rolesService.EasStudentEdit], false);
            //按钮对象集合
            $scope.btns = [{
                text: "新增学员",
                disable: currentUserService.hasPermission([rolesService.EasStudentAdd], false),
                func: function () {
                    $scope.showEdit = true;
                }
            },
            {
                text: "批量导入",
                disable: currentUserService.hasPermission([rolesService.EasStudentBatchImport], false),
                func: function () {
                    $scope.showUpload = true;
                    console.log('批量导入');
                }
            },
            {
                text: "报名",
                disable: currentUserService.hasPermission([rolesService.EasStudentSignUp], false),
                func: function () {
                    var id = selectedKeyService.all($scope.selectedKeys);
                    if (id.length) {
                        $scope.$broadcast('stuApply', id);
                    } else {
                        gintDialog.error("请至少选择一个学员！");
                    }
                }
            },
            {
                text: "导出课表",
                disable: true,
                func: function () {
                    var id = selectedKeyService.all($scope.selectedKeys);
                    if (id.length==0) {
                        gintDialog.error("请选择学员！");
                    } else if (id.length==1){
                        $scope.excel=true;
                        $scope.currid=id[0];
                    } else {
                        gintDialog.error("一次只能下载一个学员的日程表！");
                    }
                }
            },
            {
                text: "同步1Course学员",
                disable: currentUserService.hasPermission([rolesService.EasStudentSync], false),
                func: function () {
                    $scope.$broadcast("showStuAsyn");
                }
            }
            ];
        }
        ]);
});