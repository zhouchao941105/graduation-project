/**
 新增/编辑员工组件
 by binhao
 2017年3月14日14:48:25
 */
define(['angular', 'services/formValidation'], function (angular) {
    angular.module('TeacherListApp.empEdit', ['formValidation'])
        .directive('empEdit', function() {

            return {
                restrict: 'E',
                scope: {
                    showContrl: '=',
                    empId:'='
                },
                templateUrl: 'modules/teacher-list-app/directive/empEdit/empEdit.html',
                link: function ($scope, element, attrs) {
                    $scope.showContrl = false;

                },
                controller: "TeacherListApp.empEdit.controller"
            };
        })
        .controller('TeacherListApp.empEdit.controller', [
            '$scope', 'multiplePopupConfig', 'teacherListServices', 'userService', 'gintDialog', 'gintFormCheck', 'messages', function ($scope, multiplePopupConfig, teacherListServices, userService, gintDialog, gintFormCheck, messages) {
                $scope.sex = [
                        { key: 0, value: "男" }, { key: 1, value: "女" }
                ];
                $scope.sexSelectAction = function (data) {
                    $scope.employee.gender = data.key;
                }
                $scope.init = function() {
                    $scope.employee = {
                        "name": "",
                        "loginName": "",
                        "gender": '',
                        "tel": "",
                        "departmentIds": [],
                        "classSchools": [],
                        "roles": []
                    };
                    $scope.sexSelect = { key: "", value: "请选择" };
                }
                $scope.init();
                //触发员工编辑
                $scope.$on('showEmpEdit', function (event, msg) {
                    userService.getEmployeeDetails(msg).success(function (data) {
                        if (data.type != 0) {
                            gintDialog.error(messages[data.type], 1);
                            return;
                        }
                        $scope.employee = data.data;
                        $scope.employee.loginName && ($scope.loginNameDisabled = true);
                        $scope.employee.gender = $scope.employee.gender == "男" ? 0 : 1;
                        $scope.sexSelect = $scope.sex[$scope.employee.gender];
                        userService.getEditableSchools($scope.employee.classSchools.map(function (v) { return v.id }))
                        .success(function (res) {
                                $scope.employee.classSchools.map(function(v) {
                                    res.data.map(function (datav) {
                                        if (datav == v.id) {
                                            v.canDelete = true;
                                        }
                                    });
                                });
                            });
                    });
                });
                //多选弹窗对象
                $scope.MultiplePopup = {
                    departmentIds: new multiplePopupConfig(teacherListServices.popupConfig().departmentPop),
                    classSchools: new multiplePopupConfig(teacherListServices.popupConfig().schoolAreaPop),
                    roles: new multiplePopupConfig(teacherListServices.popupConfig().rolePop)
                }
                //删除部门事件
                $scope.deleteDep = function (index) {
                    $scope.employee.departmentIds.splice(index, 1);
                    $scope.updateAuthoritySchools($scope.employee.departmentIds.map(function (v) { return v.id }));
                }
                //根据部门显示校区权限
                $scope.updateAuthoritySchools = function (arr) {
                    userService.getAuthoritySchools(arr)
                    .success(function (data) {
                        $scope.employee.authoritySchools = data.data;
                    });
                }
                //根据id向一个数组中添加对象 去除重复 （item加到con）
                function addItem(con, item, id) {
                    id = id || "id";
                    item.forEach(function (v) {
                        con.forEach(function (value) {
                            v.id == value[id] && !value.isDelete && (v["has"] = true, value.isDelete = false);
                        });
                        !v["has"] && con.push(v) ;
                    });
                }
                //循环添加确认事件
                for (var obj in $scope.MultiplePopup) {
                    if ($scope.MultiplePopup.hasOwnProperty(obj)) {
                        //将obj存于闭包中 确保调用方法时obj是正确的
                        var closure = function(obj) {
                            return function(data) {
                                if (obj == "classSchools") {
                                    data.list = data.list.map(function(v) {
                                        v.canDelete = true;
                                        return v;
                                    });
                                }
                                addItem($scope.employee[obj], data.list);
                                if (obj == "departmentIds") {
                                    $scope.updateAuthoritySchools($scope.employee[obj].map(function(v) { return v.id }));
                                }
                            }
                        }
                        $scope.MultiplePopup[obj].confirmAction = closure(obj);
                    }
                }
                //关闭弹窗
                $scope.cancel = function (unLoad) {
                    $scope.showContrl = false;
                    $scope.loginNameDisabled = false;
                    unLoad || $scope.$parent.loadList(1);
                    $scope.init();
                }

                //员工验证规则
                $scope.employeeCheck = {
                    loginName: { lab: "用户名", limit: 32 },
                    name: { lab: "姓名", require: 1, limit: 100 },
                    gender: { lab: "性别", select: 1, require: 1 },
                    tel: { lab: "联系方式", require: 1, req: /[^\d]/g, reqFalse: 1, tip: "请输入正确的联系方式" },
                    departmentIds: { lab: "部门", require: 1, select: 1 },
                    classSchools: { lab: "上课校区", select: 1 },
                    roles: { lab: "角色" }
                }
                //创建员工
                $scope.createEmp = function () {    
                    gintFormCheck.check($scope.employeeCheck, $scope.employee).then(function (type) {
                        var employee = angular.copy($scope.employee);
                        employee.departmentIds = $scope.employee.departmentIds.map(function (v) { return v.id });
                        employee.classSchools = $scope.employee.classSchools.map(function (v) { return v.id });
                        employee.roles = $scope.employee.roles.map(function (v) { return v.id });
                        userService.createEmployee(employee).success(function (data) {
                            if (data.type == 0) {
                                gintDialog.success("操作成功！");
                                $scope.cancel();    
                            } else {
                                gintDialog.error(messages[data.type], 1);
                            }
                        });
                    });
                }
            }
        ]);
});
