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
                    $scope.$on('editclass',function(event,obj){
                        for(var i=0,l=$scope.allInfo.length;i<l;i++){
                            if($scope.allInfo[i].classId==obj.id){
                                $scope.info=$scope.allInfo[i];
                            }
                        }
                        $scope.currId=obj.id;
                    })
                    //添加或者编辑班级
                    $scope.classValite = function () {
                        var data = {
                            name: $scope.info.className,
                            count: $scope.info.stucount,
                            currid:$scope.currId||0
                        }
                        $http.post('Default/addClass', data).success(function () {
                            gintDialog.success('保存成功');
                            $scope.showClassPopup = false;
                            $scope.info={};
                            $scope.currId=0;
                            $scope.callBack();
                        });
                    }
                    $scope.cancelClass = function () {
                        $scope.info={};
                        $scope.showClassPopup = false;
                        $scope.currId=0;
                        $scope.callBack();
                    }
                }
            };
        }])
});
