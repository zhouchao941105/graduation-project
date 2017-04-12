'use strict';
define([
    'angular',
    "services/dialogService",
], function (angular) {
    return angular.module('addclassroom', ["Dialog.services"])
        .directive('addRoom', ['$http', '$scope','gintDialog',
            function ($http, $scope,gintDialog) {
                return {
                    restrict:"E",
                    scope:{
                        showP:"="
                    },
                    templateUrl:"modules/classroom/directive.html",
                    Link:function($scope){
                        var data={
                            name: $scope.info.name,
                            count: $scope.info.count,
                            type:$scope.info.type
                        }
                        $scope.confirm=function(){
                            $http.post('Default/addclassroom',data).then(function(){
                                gintDialog.success('success');
                            })
                        }
                    }
                }
            }])

});