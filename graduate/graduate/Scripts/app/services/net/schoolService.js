"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.schoolService", [])
        .service("schoolService", [
            "$http", "$q", function ($http, $q) {
                /// 获取用户权限校区列表
                ///  request  
                function getSaleSchoolList(request) {
                    return $http.post("/api/schoolService/getSaleSchoolList", request);
                }
                /// 获取用户权限校区
                function getEmployeeSchool() {
                    return $http.post("/api/schoolService/getEmployeeSchool");
                }
                return {
                    getSaleSchoolList: getSaleSchoolList,
                    getEmployeeSchool: getEmployeeSchool
                };
            }
        ]);
});
