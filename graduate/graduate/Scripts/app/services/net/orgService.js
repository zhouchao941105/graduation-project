"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.orgService", [])
		.service("orgService", [
			"$http", "$q", function ($http, $q) {
				/// 根据url获取org
				///  url  
				function getOrgByUrl(url) {
					return $http.get("/api/orgService/getOrgByUrl", { params: { url: url } });
				}
				/// 获取机构url
				///  id  
				function getOrgUrl(id) {
					return $http.get("/api/orgService/getOrgUrl", { params: { id: id } });
				}
				return {
					getOrgByUrl: getOrgByUrl,
					getOrgUrl: getOrgUrl
				};
			}
		]);
});
