/**
 新增/编辑班级
 by xcq
 */
define(['angular',
    "modules/class-management-app/services",
    "services/dialogService",
], function (angular) {
    angular.module('ClassManagementApp.addStudent', ["ClassManagementApp.services", "Dialog.services"])
        .directive('addStudent', ['classManagementServices', 'gintDialog', "$filter", function (classManagementServices, gintDialog, $filter) {
            return {
                restrict: 'E',
                scope: {
                    period: '=',
                    confirm: '&',
                    cancel: '&'
                },
                templateUrl: 'modules/class-management-app/directive/addStudents/template.html',
                link: function ($scope, element, attrs) {
                    //监听输入粘贴事件事件
                    $scope.pressNum = function (value) {
                        return $filter('filterNumber')(value);
                    }
                }
            };
        }])
});
