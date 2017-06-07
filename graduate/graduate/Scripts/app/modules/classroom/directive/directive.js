'use strict';
define([
    'angular',
    "services/dialogService",
], function (angular) {
    return angular.module('addclassroom', ["Dialog.services"])
        .directive('addRoom', ['$http', 'gintDialog',
            function ($http, gintDialog) {
                return {
                    restrict: "E",
                    scope: {
                        showP: "=",
                        callBack: '&',
                        allInfo:"=",
                        searchKey:'='
                    },
                    templateUrl: "modules/classroom/directive/directive.html",
                    link: function ($scope, element, attrs) {
                        $scope.$on('editclassroom', function (event, obj) {
                            for (var i = 0, l = $scope.allInfo.length; i < l; i++) {
                                if ($scope.allInfo[i].classroomId == obj.id) {
                                    $scope.info = $scope.allInfo[i];
                                }
                            }
                            $scope.currId = obj.id;
                        })
                        $scope.cancel = function () {
                            $scope.showP = false;
                            $scope.info={};
                            $scope.currId=0;
                                $scope.searchKey=''
                            
                            $scope.callBack();
                        }
                        $scope.confirm = function () {
                            var data = {
                                name: $scope.info.classroomName,
                                count: $scope.info.capacity,
                                type: $scope.info.type,
                                currid: $scope.currId||0
                            }
                            $http.post('addclassroom', data).then(function () {
                                gintDialog.success('success');
                                $scope.showP = false;
                                $scope.info={};
                                $scope.currId=0;
                                $scope.searchKey=''
                                $scope.callBack();
                            })
                        }
                    }
                }
            }])

});