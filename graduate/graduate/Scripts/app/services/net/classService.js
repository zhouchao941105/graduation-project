"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.classService", [])
        .service("classService", [
            "$http", "$q", function ($http, $q) {
                /// 创建班级
                ///  sci  
                function createClass(sci) {
                    return $http.post("/api/classService/createClass", sci);
                }
                /// 编辑班级
                ///  sci  
                function updateClass(sci) {
                    return $http.post("/api/classService/updateClass", sci);
                }
                /// 更新班级为结课状态
                ///  uco  
                function updateClassOverClass(uco) {
                    return $http.post("/api/classService/updateClassOverClass", uco);
                }
                /// 获取班级列表
                ///  request  
                function getClassList(request) {
                    return $http.post("/api/classService/getClassList", request);
                }
                /// 获取班级详情
                ///  request  
                function getClassDetails(request) {
                    return $http.post("/api/classService/getClassDetails", request);
                }
                /// 班级学员报名课程
                ///  request  
                function createClassStudentSign(request) {
                    return $http.post("/api/classService/createClassStudentSign", request);
                }
                /// 更新班级课程学员退课
                ///  sccsi  
                function updateClassCourseStudentIsOut(sccsi) {
                    return $http.post("/api/classService/updateClassCourseStudentIsOut", sccsi);
                }
                /// 更新课程学员退课
                ///  sccsi  
                function updateCourseStudentIsOut(sccsi) {
                    return $http.post("/api/classService/updateCourseStudentIsOut", sccsi);
                }
                /// 获取班级报名学员列表
                ///  request  
                function getClassSignStudentList(request) {
                    return $http.post("/api/classService/getClassSignStudentList", request);
                }
                /// 获取班级学员列表
                ///  request  
                function getClassStundetList(request) {
                    return $http.post("/api/classService/getClassStundetList", request);
                }
                /// 获取学员未发生日程
                ///  sccsi  
                function getStudentSchedule(sccsi) {
                    return $http.post("/api/classService/getStudentSchedule", sccsi);
                }
                /// 获取班级是否关联日程或学员
                ///  request  
                function getClassIsRelation(request) {
                    return $http.post("/api/classService/getClassIsRelation", request);
                }
                return {
                    createClass: createClass,
                    updateClass: updateClass,
                    updateClassOverClass: updateClassOverClass,
                    getClassList: getClassList,
                    getClassDetails: getClassDetails,
                    createClassStudentSign: createClassStudentSign,
                    updateClassCourseStudentIsOut: updateClassCourseStudentIsOut,
                    updateCourseStudentIsOut: updateCourseStudentIsOut,
                    getClassSignStudentList: getClassSignStudentList,
                    getClassStundetList: getClassStundetList,
                    getStudentSchedule: getStudentSchedule,
                    getClassIsRelation: getClassIsRelation
                };
            }
        ]);
});
