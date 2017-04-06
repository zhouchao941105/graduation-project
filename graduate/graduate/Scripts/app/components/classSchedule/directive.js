/**
 by xcq
 */
define(['angular',
    "modules/class-management-app/services",
    "services/dialogService",
], function (angular) {
    angular.module('Components.classSchedule', ["ClassManagementApp.services", "Dialog.services","GridService"])
        .directive('classSchedule', ['classManagementServices', 'gintDialog', function (classManagementServices, gintDialog) {
            return {
                restrict: 'E',
                scope: {
                    classSchedule: '=',
                    data: '=',
                    isConflict: '=',
                    confirmCallback:'&',
                    cancel: '&'
                },
                templateUrl: 'components/classSchedule/template.html',
                link: function (scope, element, attrs) {
                    scope.$on('classSchedulebroad', function () {
                        scope.classSchedule = true;
                        scope.checkAll = false;
                        scope.data.forEach(function (item) {
                            item.check = false;
                        })
                    })

                    scope.confirm = function () {
                        var ids = [];
                        scope.data.forEach(function (item) {
                            if(item.check){
                                ids.push(item.id)
                            }
                        })
                        var data = {
                            selectedKeys: ids
                        }
                        scope.confirmCallback({ data: data });
                    }
                    
                    scope.select = function (index) {
                        if (scope.data[index].check) {
                            scope.data[index].check = false;
                            //有一个没选中，全选直接取消
                            scope.checkAll = false;
                        } else {
                            scope.data[index].check = true;
                            //选中一个时需要遍历全部判断是否全选了
                            scope.checkAll = true;
                            scope.data.forEach(function (item) {
                                if (!item.check) {
                                    scope.checkAll = false;
                                }
                            })
                        }
                    };
                    //全选
                    scope.selectAll = function () {
                        scope.checkAll = !scope.checkAll;
                        scope.data.forEach(function (item) {
                            item.check = scope.checkAll;
                        })
                    };
                }
            };
        }])
});
