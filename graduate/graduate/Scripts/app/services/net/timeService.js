"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.timeService", [])
        .service("timeService", [
            "$http", "$q", function ($http, $q) {
                /// 创建时间模板
                ///  input  
                function setTimeTemplate(input) {
                    return $http.post("/api/timeService/setTimeTemplate", input);
                }
                /// 获取时间模板列表时间设置用
                function getTimeTemplate() {
                    return $http.get("/api/timeService/getTimeTemplate");
                }
                /// 获取时间模板列表排课用
                function getTimeTemplateWithDetails() {
                    return $http.get("/api/timeService/getTimeTemplateWithDetails");
                }
                /// 获取时间模板详情信息
                ///  templateId  
                function getTimeTemplateDetails(templateId) {
                    return $http.get("/api/timeService/getTimeTemplateDetails", { params: { templateId: templateId } });
                }
                /// 删除时间模板
                ///  id  
                function deleteTemplate(id) {
                    return $http.post("/api/timeService/deleteTemplate", id);
                }
                return {
                    setTimeTemplate: setTimeTemplate,
                    getTimeTemplate: getTimeTemplate,
                    getTimeTemplateWithDetails: getTimeTemplateWithDetails,
                    getTimeTemplateDetails: getTimeTemplateDetails,
                    deleteTemplate: deleteTemplate
                };
            }
        ]);
});
