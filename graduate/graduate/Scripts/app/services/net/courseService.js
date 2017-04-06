"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.courseService", [])
        .service("courseService", [
            "$http", "$q", function ($http, $q) {
                /// 课程新建
                ///  cci  
                function createCourse(cci) {
                    return $http.post("/api/courseService/createCourse", cci);
                }
                /// 课程修改
                ///  uci  
                function updateCourse(uci) {
                    return $http.post("/api/courseService/updateCourse", uci);
                }
                /// 删除课程
                ///  course  
                function deletedCourse(course) {
                    return $http.post("/api/courseService/deletedCourse", course);
                }
                /// 课程列表
                ///  request  
                function getCourseList(request) {
                    return $http.post("/api/courseService/getCourseList", request);
                }
                /// 课程详情
                ///  course  
                function courseDetails(course) {
                    return $http.post("/api/courseService/courseDetails", course);
                }
                /// 课程上架
                ///  ssti  
                function courseTheShelves(ssti) {
                    return $http.post("/api/courseService/courseTheShelves", ssti);
                }
                /// 课程下架
                ///  ssti  
                function courseOffTheShelves(ssti) {
                    return $http.post("/api/courseService/courseOffTheShelves", ssti);
                }
                /// 获取学员课程报名情况
                ///  request  
                function getStudentCourseSign(request) {
                    return $http.post("/api/courseService/getStudentCourseSign", request);
                }
                /// 获取课程是否关联班级/日程/学员
                ///  request  
                function getCourseIsBindProjet(request) {
                    return $http.post("/api/courseService/getCourseIsBindProjet", request);
                }
                /// 获取班级课程列表
                ///  request  
                function getClassCourseList(request) {
                    return $http.post("/api/courseService/getClassCourseList", request);
                }
                return {
                    createCourse: createCourse,
                    updateCourse: updateCourse,
                    deletedCourse: deletedCourse,
                    getCourseList: getCourseList,
                    courseDetails: courseDetails,
                    courseTheShelves: courseTheShelves,
                    courseOffTheShelves: courseOffTheShelves,
                    getStudentCourseSign: getStudentCourseSign,
                    getCourseIsBindProjet: getCourseIsBindProjet,
                    getClassCourseList: getClassCourseList
                };
            }
        ]);
});
