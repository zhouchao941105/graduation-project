/**
 新增/编辑班级
 by xcq
 */
define(['angular',
    "modules/class-management-app/services",
    "services/dialogService",
    "components/common/directive"
], function (angular) {
    angular.module('ClassManagementApp.addClass', ["ClassManagementApp.services", "Dialog.services", "Components.common"])
        .directive('addClass', ['classManagementServices', 'gintDialog','$http', function (classManagementServices, gintDialog,$http ) {
            return {
                restrict: 'E',
                scope: {
                    showClassPopup: '=',
                    type: '=',
                    relate: '=',
                    addEditInfo: '=',
                    showDropUl: '=',
                    campus: '=',
                    addEditClass: '&'
                },
                templateUrl: 'modules/class-management-app/directive/addClass/template.html',
                link: function ($scope, element, attrs) {
                    //添加或者编辑班级
                    $scope.classValite = function () {
                        var data={
                            name:$scope.addEditInfo.className,
                            count:$scope.addEditInfo.classCount
                        }
                        $http.post('Default/addClass',data);
                    }
                    $scope.cancelClass=function(){
                        $scope.addEditInfo.className='';
                        $scope.addEditInfo.classCount='';
                        $scope.showClassPopup=false;
                    }
                }
            };
        }])
});
