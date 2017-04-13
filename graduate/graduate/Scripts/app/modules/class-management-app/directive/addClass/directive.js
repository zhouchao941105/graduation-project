/**
 新增/编辑班级
 by xcq
 */
define(['angular',
    "services/dialogService",
    "components/common/directive"
], function (angular) {
    angular.module('ClassManagementApp.addClass', ["Dialog.services", "Components.common"])
        .directive('addClass', [ 'gintDialog', '$http', function ( gintDialog, $http) {
            return {
                restrict: 'E',
                scope: {
                    showClassPopup: '=',
                    callBack: '&',
                    allInfo:"="
                },
                templateUrl: 'modules/class-management-app/directive/addClass/template.html',
                link: function ($scope, element, attrs) {
                    $scope.$on('editclass',function(obj){
                        for(var item in $scope.allInfo){
                            if(item.classId==obj.id){
                                $scope.info=item;
                            }
                        }
                    })
                    //添加或者编辑班级
                    $scope.classValite = function () {
                        var data = {
                            name: $scope.info.className,
                            count: $scope.info.stucount
                        }
                        $http.post('Default/addClass', data).success(function () {
                            gintDialog.success('保存成功');
                            $scope.showClassPopup = false;
                            $scope.info={};
                            $scope.callBack();
                        });
                    }
                    $scope.cancelClass = function () {
                        $scope.info={};
                        $scope.showClassPopup = false;
                    }
                }
            };
        }])
});
