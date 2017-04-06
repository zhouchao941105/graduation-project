"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
    return angular.module("services.net.classRoomService", [])
        .service("classRoomService", [
            "$http", "$q", function ($http, $q) {
                /// 创建教室
                ///  scr  
                function createClassRoom(scr) {
                    return $http.post("/api/classRoomService/createClassRoom", scr);
                }
                /// 修改教室
                ///  scr  
                function updateClassRoom(scr) {
                    return $http.post("/api/classRoomService/updateClassRoom", scr);
                }
                /// 删除班级
                ///  dcr  
                function deletedClassRoom(dcr) {
                    return $http.post("/api/classRoomService/deletedClassRoom", dcr);
                }
                /// 获取教室列表
                ///  request  
                function getClassRoomList(request) {
                    return $http.post("/api/classRoomService/getClassRoomList", request);
                }
                /// 获取教室详情
                ///  request  
                function getClassRoomDetails(request) {
                    return $http.post("/api/classRoomService/getClassRoomDetails", request);
                }
                /// 校验教室是否关联日程
                ///  request  
                function ckeckClassRoomIsBindSchedule(request) {
                    return $http.post("/api/classRoomService/ckeckClassRoomIsBindSchedule", request);
                }
                return {
                    createClassRoom: createClassRoom,
                    updateClassRoom: updateClassRoom,
                    deletedClassRoom: deletedClassRoom,
                    getClassRoomList: getClassRoomList,
                    getClassRoomDetails: getClassRoomDetails,
                    ckeckClassRoomIsBindSchedule: ckeckClassRoomIsBindSchedule
                };
            }
        ]);
});
