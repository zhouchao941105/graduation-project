"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.baseService", [])
		.service("baseService", [
			"$http", "$q", function ($http, $q) {
				/// 
				function get() {
					return $http.get("/api/baseService/get");
				}
				return {
					get: get
				};
			}
		]);
});
