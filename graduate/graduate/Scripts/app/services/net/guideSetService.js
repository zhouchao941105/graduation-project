"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.guideSetService", [])
        .service("guideSetService", [
            "$http", "$q", function ($http, $q) {
                /// 创建引导
                function createGuideSet() {
                    return $http.post("/api/guideSetService/createGuideSet");
                }
                /// 引导是否存在
                function isSeted() {
                    return $http.post("/api/guideSetService/isSeted");
                }
                return {
                    createGuideSet: createGuideSet,
                    isSeted: isSeted
                };
            }
        ]);
});
