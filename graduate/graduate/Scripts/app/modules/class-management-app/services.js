"use strict";

define([
    "angular",
     "services/net/classService",
     "services/net/schoolService",
     "services/net/courseService",
     "services/net/scheduleService"
], function (angular) {
    return angular.module("ClassManagementApp.services", ["services.net.classService", "services.net.schoolService", "services.net.courseService", "services.net.scheduleService"])
        .service("classManagementServices", [
            "$rootScope", "$q", "$filter", "classService", "schoolService", "courseService", "scheduleService",
            function ($rootScope, $q, $filter,classService, schoolService, courseService, scheduleService) {
                var services = {};

                //获取班级列表
                services.getClassList = function (param) {
                    return classService.getClassList(param);
                }

                //获取校区列表
                services.getSaleSchoolList = function (param) {
                    return schoolService.getSaleSchoolList(param);
                }

                //新建班级
                services.createClass = function (param) {
                    return classService.createClass(param);
                }

                //获 
                services.getClassDetails = function (param) {
                    return classService.getClassDetails(param);
                }

                //编辑班级
                services.updateClass = function (param) {
                    return classService.updateClass(param);
                }

                // 更新班级为结课状态
                services.updateClassOverClass = function (param) {
                    return classService.updateClassOverClass(param);
                }

                // 班级学员报名课程
                services.createClassStudentSign = function (param) {
                    return classService.createClassStudentSign(param);
                }

                //更新班级课程学员退课
                services.updateClassCourseStudentIsOut = function (param) {
                    return classService.updateClassCourseStudentIsOut(param);
                }

                //获取课程列表
                services.getClassCourseList = function (param) {
                    return courseService.getClassCourseList(param);
                }

                /// 获取班级学员列表
                ///  request  
                services.getClassStundetList = function (param) {
                    return classService.getClassStundetList(param);
                }


                services.campusId = null;
                //获取可排课程
                function getAvailableClasses(data) {
                    var param = {
                        filter: {
                            selectedSchoolId: services.soldedSchoolId,
                        },
                        page: {
                            pageIndex: data.page,
                            pageSize: 10
                        },
                        key: data.search
                    }
                    return courseService.getClassCourseList(param);
                }

                //选择课程弹窗参数
                services.getClassSinglePopOption = function() {
                    var options = {
                        tabs: getAvailableClasses,
                        title: "选择课程",
                        placeholder: "课程名称或编号",
                        list: [
                        {
                            title: "课程编号",
                            field: "courseSerial",
                            width: 135
                        }, {
                            title: "课程名称",
                            field: "courseName",
                            width: 120
                        }]
                    }
                    return options;
                }

                //获取班级报名学员列表
                services.getClassSignStudentList = function (param) {
                    return function (param) {
                        var params = {
                            filter: {
                                choiceType: param.choiceType,
                                classId: services.classId,
                                courseId: services.courseId
                            },
                            page: {
                                pageIndex: param.page.pageIndex,
                                pageSize: 10,
                            },
                            key: param.search
                        }
                        return classService.getClassSignStudentList(params);
                    }
                }
                //多选学员
                services.popupConfig = function () {
                    var popupTypeConfig = {};
                    popupTypeConfig.studentPop = {
                        tabs: services.getClassSignStudentList(),
                        title: "选择学员",
                        placeholder: "学员用户名/姓名/手机号码",
                        tabTypes: [
                            {
                                title: "全部",
                                choiceType: 0
                            },
                            {
                                title: "已报课程学员",
                                choiceType: 1
                            }
                            
                        ],
                        list: [
                            {
                                title: "姓名",
                                field: "studentName"
                            },
                            {
                                title: "用户名",
                                field: "loginName"
                            },
                            {
                                title: "电话号码",
                                field: "phone"
                            }
                        ],
                        selectedList: [
                            {
                                title: "已选学员",
                                field: "studentName"
                            }
                        ]
                    }
                    return popupTypeConfig;
                };

                //检索班级已安排日程
                services.queryClassSchedules = function (params) {
                    return scheduleService.queryClassSchedules(params)
                }

                //学生报名，给学生添加到已有日程中
                services.createScheduleStudent = function (params) {
                    return scheduleService.createScheduleStudent(params)
                }

                //获取班级是否关联日程或学员
                services.getClassIsRelation = function (params) {
                    return classService.getClassIsRelation(params)
                }

                //获取班级是否关联日程或学员
                services.isStudentExistClassSchedule = function (params) {
                    return scheduleService.isStudentExistClassSchedule(params)
                }

                //获取校区列表
                services.getSchoolList = function (page) {
                    var def = $q.defer();
                    var param = {
                        key: '',
                        page: {
                            pageIndex: page,
                            pageSize: 10,
                        }
                    }
                    services.getSaleSchoolList(param).success(function (data) {
                        if (data.status == 1) {
                            def.resolve(data.data)
                        }
                        else {
                            def.reject();
                        }
                    })
                    return def.promise;
                }

                //编辑班级
                services.editClass = function (id) {
                    var def = $q.defer();
                    services.getClassDetails({ ClassId: id }).success(function (data) {
                        if (data.status == 1) {
                            var info = data.data;
                            var addEditInfo = {
                                id: info.id,
                                classSerial: info.classSerial,  // string 班级编号
                                className: info.className, // string 班级名称
                                courseName: info.courseName,  //课程名称
                                soldedSchoolId: info.schoolId,  //  long 校区id
                                openTime: $filter('formatJsonDate3')(info.openTime, 'yyyy/MM/dd'), //string 开班时间
                                closeTime: $filter('formatJsonDate3')(info.closeTime, 'yyyy/MM/dd'),  //string 结班时间
                                courseId: info.courseId, // long 课程id
                                schoolNames: info.schoolNames
                            }
                            def.resolve(addEditInfo)
                        }
                    });
                    return def.promise;
                }
                return services;
            }
        ]);
});
