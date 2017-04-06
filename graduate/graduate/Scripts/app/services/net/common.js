/**
* Created by Han Xinwei on 2015/4/2.
*/

define(['angular'], function (angular) {
    return angular.module('services.net.common', []).
        factory('commonNetService', ['$http', '$q', function ($http, $q) {
            /*
            queryCondition object 列表查询参数
            search string default to null 查询字符串
            position object 位置信息
            start int default to 0 起始位置
            length int default to 20 长度
            sort 排序信息
            name string default to null 排序字段
            order string('asc'|'desc') default to 'asc' 升降序
            category 分类信息
            unLabel bool default to false 未分类
            labels array<array<int>> default to null 分类选择
            advanced object 高级筛选 与具体查询接口接口 须根据具体接口匹配
            */
            function getList(url, queryCondition) {
                queryCondition = queryCondition || {};
                var toBackendParams = {};
                if (queryCondition.searchType == null)
                    toBackendParams.key = queryCondition.search || null;
                else
                    toBackendParams.advancedSearch = {
                        search: queryCondition.search,
                        searchType: queryCondition.searchType
                    }
                toBackendParams.page = {};
                toBackendParams.page.pageIdx =
                    queryCondition.position && queryCondition.position.start && queryCondition.position.length ? queryCondition.position.start / queryCondition.position.length + 1 : 1;
                toBackendParams.page.pageSize = queryCondition.position && queryCondition.position.length ? queryCondition.position.length : 20;
                toBackendParams.order = {}
                toBackendParams.order.filed = queryCondition.sort && queryCondition.sort.name ? queryCondition.sort.name : null;
                toBackendParams.order.asc = queryCondition.sort && queryCondition.sort.order ? queryCondition.sort.order == "asc" ? true : false : true;
                toBackendParams.category = queryCondition.category || null;
                if (toBackendParams.category && toBackendParams.category.unLabel == null && toBackendParams.category.labels == null)
                    toBackendParams.category = null;
                /*                if (toBackendParams.category) {
                toBackendParams.category.unLabel = toBackendParams.category.unLabel || false;
                toBackendParams.category.labels = toBackendParams.category.labels || null;
                }*/
                toBackendParams.filter = queryCondition.advanced || null;
                if (toBackendParams.filter) {
                    if (queryCondition.otherListCondition) {
                        toBackendParams.filter.MyOrOtherExams = queryCondition.otherListCondition ? queryCondition.otherListCondition.myOrOtherExams : null; // NTODO 请求阶段传参
                    }
                }

                return $http.post(url, toBackendParams);
            }

            // 导航，获取是否有未批改项，判断显示红点

            function getTodoCorrectListCount() {
                return $http.post('/CorrectService/GetTodoCorrectListCount');
            }

            function getTodoListCount() {
                return $http.post('/UserService/GetTodoListCount');
            };

            //得到服务器当前时间
            var getCurrentDateTime = function () {
                return $http.post('/Common/GetCurrentDateTime')
            };
            //获取角色列表--cbh
            var getRoleList = function () {
                return function (params) {
                    params.key = params.search;
                    var url = "/api/UserService/GetRoleList";
                    return $http.post(url, params);
                }
            }
            //获取校区列表--cbh
            var getSchoolArea = function () {
                return function (params) {
                    params.key = params.search;
                    var url = "/api/UserService/GetSchoolList";
                    return $http.post(url, params);
                }
            }
            //获取部门列表--cbh
            var getDepartment = function () {
                return function (params) {
                    params.key = params.search;
                    var url = "/api/UserService/GetDepartmentList";
                    return $http.post(url,  params );
                }
            }
            return {
                getList: getList,
                getTodoCorrectListCount: getTodoCorrectListCount,
                getTodoListCount: getTodoListCount,
                getCurrentDateTime: getCurrentDateTime,
                getDepartment: getDepartment,
                getSchoolArea: getSchoolArea,
                getRoleList: getRoleList
            }

        } ]);
})