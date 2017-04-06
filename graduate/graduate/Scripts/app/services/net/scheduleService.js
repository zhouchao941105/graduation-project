"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.scheduleService", [])
        .service("scheduleService", [
            "$http", "$q", function ($http, $q) {
                /// 检索可排班级
                ///  input  
                function queryClasses(input) {
                    return $http.post("/api/scheduleService/queryClasses", input);
                }
                /// 检索可排1v1班级
                ///  input  
                function queryOneToOneClasses(input) {
                    return $http.post("/api/scheduleService/queryOneToOneClasses", input);
                }
                /// 检索单个班级的简单信息
                ///  input  
                function queryClass(input) {
                    return $http.post("/api/scheduleService/queryClass", input);
                }
                /// 显示教师日程-检索教师
                ///  input  
                function queryTeachers(input) {
                    return $http.post("/api/scheduleService/queryTeachers", input);
                }
                /// 检索指定教师在某段时间的日程
                ///  input  
                function queryTeacherSchedules(input) {
                    return $http.post("/api/scheduleService/queryTeacherSchedules", input);
                }
                /// 检索指定学生在某段时间的日程
                ///  input  
                function queryStudentSchedules(input) {
                    return $http.post("/api/scheduleService/queryStudentSchedules", input);
                }
                /// 检索指定班级在某段时间的日程
                ///  input  
                function queryClassSchedules(input) {
                    return $http.post("/api/scheduleService/queryClassSchedules", input);
                }
                /// 检索班级科目进度
                ///  input  
                function querySubjectSpeed(input) {
                    return $http.post("/api/scheduleService/querySubjectSpeed", input);
                }
                /// 检索班级单个科目进度
                ///  input  
                function querySignSubjectSpeed(input) {
                    return $http.post("/api/scheduleService/querySignSubjectSpeed", input);
                }
                /// 检索班级已排课日程
                ///  input  
                function queryClassSchedulesDetail(input) {
                    return $http.post("/api/scheduleService/queryClassSchedulesDetail", input);
                }
                /// 创建日程-选择学生
                ///  input  
                function queryStudents(input) {
                    return $http.post("/api/scheduleService/queryStudents", input);
                }
                /// 创建日程-选择教室
                ///  input  
                function queryClassRooms(input) {
                    return $http.post("/api/scheduleService/queryClassRooms", input);
                }
                /// 创建日程-选择教师
                ///  input  
                function queryTeachersForCreateSchedule(input) {
                    return $http.post("/api/scheduleService/queryTeachersForCreateSchedule", input);
                }
                /// 创建日程
                ///  input  
                function createSchedule(input) {
                    return $http.post("/api/scheduleService/createSchedule", input);
                }
                /// 微调班级日程-查询当前日程所关联的当前时间段内的已用时间
                ///  input  
                function queryOccupyAreaRelevant(input) {
                    return $http.post("/api/scheduleService/queryOccupyAreaRelevant", input);
                }
                /// 生效单个日程
                ///  input  
                function takeEffectSignSchedule(input) {
                    return $http.post("/api/scheduleService/takeEffectSignSchedule", input);
                }
                /// 生效全部日程
                ///  input  
                function takeEffectClassAllSchedule(input) {
                    return $http.post("/api/scheduleService/takeEffectClassAllSchedule", input);
                }
                /// 创建学生日程
                ///  input  
                function createScheduleStudent(input) {
                    return $http.post("/api/scheduleService/createScheduleStudent", input);
                }
                /// 获取日程详情
                ///  id  
                function queryScheduleDetail(id) {
                    return $http.post("/api/scheduleService/queryScheduleDetail", id);
                }
                /// 更新日程
                ///  input  更新日程输入参数
                function updateSchedule(input) {
                    return $http.post("/api/scheduleService/updateSchedule", input);
                }
                /// 获取首页日程列表
                ///  request  
                function getHomePageScheduleList(request) {
                    return $http.post("/api/scheduleService/getHomePageScheduleList", request);
                }
                /// 删除日程
                ///  input  
                function deleteSchedule(input) {
                    return $http.post("/api/scheduleService/deleteSchedule", input);
                }
                /// 学生是否存在某个班级的日程中
                function isStudentExistClassSchedule(data) {
                    return $http.post("/api/scheduleService/isStudentExistClassSchedule", data);
                }
                /// 复制日程
                function copySchedule(data) {
                    return $http.post("/api/scheduleService/copySchedule", data);
                }
                return {
                    queryClasses: queryClasses,
                    queryOneToOneClasses: queryOneToOneClasses,
                    queryClass: queryClass,
                    queryTeachers: queryTeachers,
                    queryTeacherSchedules: queryTeacherSchedules,
                    queryStudentSchedules: queryStudentSchedules,
                    queryClassSchedules: queryClassSchedules,
                    querySubjectSpeed: querySubjectSpeed,
                    querySignSubjectSpeed: querySignSubjectSpeed,
                    queryClassSchedulesDetail: queryClassSchedulesDetail,
                    queryStudents: queryStudents,
                    queryClassRooms: queryClassRooms,
                    queryTeachersForCreateSchedule: queryTeachersForCreateSchedule,
                    createSchedule: createSchedule,
                    queryOccupyAreaRelevant: queryOccupyAreaRelevant,
                    takeEffectSignSchedule: takeEffectSignSchedule,
                    takeEffectClassAllSchedule: takeEffectClassAllSchedule,
                    createScheduleStudent: createScheduleStudent,
                    queryScheduleDetail: queryScheduleDetail,
                    updateSchedule: updateSchedule,
                    getHomePageScheduleList: getHomePageScheduleList,
                    deleteSchedule: deleteSchedule,
                    isStudentExistClassSchedule: isStudentExistClassSchedule,
                    copySchedule: copySchedule
                };
            }
        ]);
});
