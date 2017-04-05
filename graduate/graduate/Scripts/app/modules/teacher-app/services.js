"use strict";
/**
 * author :CBH
 * time: 2017年3月9日20:36:49
 * description: 员工列表服务集合
*/

define([
    "angular", "services/net/common",
], function (angular) {
    return angular.module("TeacherListApp.services", ['services.net.common'])
        .service("teacherListServices", [
            "$rootScope", "commonNetService",
            function ($rootScope, commonNetService) {
                var employeeListServices = {};
                var request = {};
                employeeListServices.popupConfig = function () {
                    var popupTypeConfig = {};
                    popupTypeConfig.departmentPop = {
                        tabs: commonNetService.getDepartment(request),
                        title: "选择部门",
                        placeholder: "部门名称",
                        list: [
                            {
                                title: "部门",
                                field: "name",
                                width:"250"
                            }
                        ],
                        selectedList: [
                            {
                                title: "已选部门",
                                field: "name"
                            }
                        ]
                    }
                    popupTypeConfig.schoolAreaPop = {
                        tabs: commonNetService.getSchoolArea(request),
                        title: "选择校区",
                        placeholder: "校区名称",
                        list: [
                            {
                                title: "校区",
                                field: "name",
                                width: "250"
                            }
                        ],
                        selectedList: [
                            {
                                title: "已选校区",
                                field: "name"
                            }
                        ]
                    }
                    popupTypeConfig.rolePop = {
                        tabs: commonNetService.getRoleList(request),
                        title: "选择角色",
                        placeholder: "角色名称",
                        list: [
                            {
                                title: "角色",
                                field: "name",
                                width: "250"
                            }
                        ],
                        selectedList: [
                            {
                                title: "已选角色",
                                field: "name"
                            }
                        ]
                    }
                    return popupTypeConfig;
                };
                return employeeListServices;
            }
        ]);
});
