"use strict"
define(['angular', 'services/dialogService'], function (angular) {
    return angular.module('TeacherListApp.dire', ['Dialog.services'])
        .directive('addTeacher', ['$http', 'gintDialog', function ($http, gintDialog) {
            return {
                restrict: 'E',
                scope: {
                    showTeacher: '=',
                    callBack: '&',
                    allInfo:'='
                },
                templateUrl: 'modules/teacher-list-app/directive/directive.html',
                link: function ($scope) {
                    $scope.$on('editteacher',function(event,obj){
                        for(var i=0,l=$scope.allInfo.length;i<l;i++){
                            if($scope.allInfo[i].teacherId==obj.id){
                                $scope.info=$scope.allInfo[i];
                            }
                        }
                        $scope.currId=obj.id;
                    })
                    $scope.confirm = function () {
                        var data = {
                            name: $scope.info.teacherName,
                            priority: $scope.info.priority,
                            prefertime: $scope.info.prefertime,
                            type: $scope.info.type,
                            currid:$scope.currId||0
                        }
                        $http.post('Default/addteacher', data).success(function (data) {
                            gintDialog.success('Success!')
                            $scope.showTeacher = false;
                            $scope.info = {}
                            $scope.currId=0;
                            $scope.callBack();
                        })
                    }
                    $scope.cancel = function () {
                        $scope.showTeacher = false;
                        $scope.info = {}
                        $scope.currId=0;
                        $scope.callBack();
                    }
                }
            }
        }])
})