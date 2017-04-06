"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.userService", [])
        .service("userService", [
            "$http", "$q", function ($http, $q) {
                /// 
                ///  input  
                function getUserList(input) {
                    return $http.get("/api/userService/getUserList", { params: input });
                }
                /// 员工列表
                ///  input  
                function getEmployeeList(input) {
                    return $http.post("/api/userService/getEmployeeList", input);
                }
                /// 创建/编辑员工
                ///  input  
                function createEmployee(input) {
                    return $http.post("/api/userService/createEmployee", input);
                }
                /// 获取部门下拉列表
                ///  input  
                function getDepartmentList(input) {
                    return $http.post("/api/userService/getDepartmentList", input);
                }
                /// 获取上课校区下拉列表
                ///  input  
                function getSchoolList(input) {
                    return $http.post("/api/userService/getSchoolList", input);
                }
                /// 获取角色列表
                ///  input  
                function getRoleList(input) {
                    return $http.post("/api/userService/getRoleList", input);
                }
                /// 获取员工详情
                ///  id  
                function getEmployeeDetails(id) {
                    return $http.get("/api/userService/getEmployeeDetails", { params: { id: id } });
                }
                /// 获取可编辑的校区列表
                ///  shools  
                function getEditableSchools(shools) {
                    return $http.post("/api/userService/getEditableSchools", shools);
                }
                /// 根据部门获取权限校区
                ///  departments  
                function getAuthoritySchools(departments) {
                    return $http.post("/api/userService/getAuthoritySchools", departments);
                }
                /// 离职
                ///  employeeIds  
                function disableEmployees(employeeIds) {
                    return $http.post("/api/userService/disableEmployees", employeeIds);
                }
                /// 复职
                ///  employeeIds  
                function enableEmployees(employeeIds) {
                    return $http.post("/api/userService/enableEmployees", employeeIds);
                }
                /// 获取lms同步员工列表
                ///  input  
                function getLmsSyncEmployeeList(input) {
                    return $http.post("/api/userService/getLmsSyncEmployeeList", input);
                }
                /// 同步lms员工
                ///  input  
                function syncLmsEmployee(input) {
                    return $http.post("/api/userService/syncLmsEmployee", input);
                }
                /// 获取 crm同步员工列表
                ///  input  
                function getCrmSyncEmployeeList(input) {
                    return $http.post("/api/userService/getCrmSyncEmployeeList", input);
                }
                /// 同步crm员工
                ///  input  
                function syncCrmEmployee(input) {
                    return $http.post("/api/userService/syncCrmEmployee", input);
                }
                /// 创建编辑学员请求
                ///  input  
                function createStudent(input) {
                    return $http.post("/api/userService/createStudent", input);
                }
                /// 获取学员列表
                ///  input  
                function getStudentList(input) {
                    return $http.post("/api/userService/getStudentList", input);
                }
                /// 校验报课程是否冲突
                function checkSignUpToCourses(data) {
                    return $http.post("/api/userService/checkSignUpToCourses", data);
                }
                /// 学员入口报名课程
                ///  input  
                function signUpStudentsToCourses(input) {
                    return $http.post("/api/userService/signUpStudentsToCourses", input);
                }
                /// 获取学员详情
                ///  id  
                function getStudentdetails(id) {
                    return $http.get("/api/userService/getStudentdetails", { params: { id: id } });
                }
                /// 获取学员的报名信息详情
                ///  input  
                function getSignUpInfoList(input) {
                    return $http.post("/api/userService/getSignUpInfoList", input);
                }
                /// 获取用户可同步的course站点
                function getLmsOrgList() {
                    return $http.get("/api/userService/getLmsOrgList");
                }
                /// 同步学员的列表获取
                ///  input  
                function getSyncStudentList(input) {
                    return $http.post("/api/userService/getSyncStudentList", input);
                }
                /// 同步学员
                ///  input  
                function syncStudents(input) {
                    return $http.post("/api/userService/syncStudents", input);
                }
                /// 检验学员报名班级是否存在异常
                function checkStudentEnrollClass(data) {
                    return $http.post("/api/userService/checkStudentEnrollClass", data);
                }
                /// 更新用户图片
                ///  cq  
                function updateUserHeadImgUrl(cq) {
                    return $http.post("/api/userService/updateUserHeadImgUrl", cq);
                }
                /// 修改用户密码
                ///  uup  
                function updateUserPwd(uup) {
                    return $http.post("/api/userService/updateUserPwd", uup);
                }
                return {
                    getUserList: getUserList,
                    getEmployeeList: getEmployeeList,
                    createEmployee: createEmployee,
                    getDepartmentList: getDepartmentList,
                    getSchoolList: getSchoolList,
                    getRoleList: getRoleList,
                    getEmployeeDetails: getEmployeeDetails,
                    getEditableSchools: getEditableSchools,
                    getAuthoritySchools: getAuthoritySchools,
                    disableEmployees: disableEmployees,
                    enableEmployees: enableEmployees,
                    getLmsSyncEmployeeList: getLmsSyncEmployeeList,
                    syncLmsEmployee: syncLmsEmployee,
                    getCrmSyncEmployeeList: getCrmSyncEmployeeList,
                    syncCrmEmployee: syncCrmEmployee,
                    createStudent: createStudent,
                    getStudentList: getStudentList,
                    checkSignUpToCourses: checkSignUpToCourses,
                    signUpStudentsToCourses: signUpStudentsToCourses,
                    getStudentdetails: getStudentdetails,
                    getSignUpInfoList: getSignUpInfoList,
                    getLmsOrgList: getLmsOrgList,
                    getSyncStudentList: getSyncStudentList,
                    syncStudents: syncStudents,
                    checkStudentEnrollClass: checkStudentEnrollClass,
                    updateUserHeadImgUrl: updateUserHeadImgUrl,
                    updateUserPwd: updateUserPwd
                };
            }
        ]);
});
