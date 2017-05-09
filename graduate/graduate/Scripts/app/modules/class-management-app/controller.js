define([
    "angular",
    "services/commonService",
    "services/dialogService",
    "commonDirective",
], function (angular) {
    return angular.module("ClassManagementApp.controller", ["Dialog.services"])
        .controller("ClassManagementAppController", ["$scope", "$http", "gintDialog", function ($scope, $http, gintDialog) {

            //新增班级
            $scope.addClass = function () {
                $scope.showClassPopup = true;
            }
            $scope.editClass = function (id) {
                $scope.showClassPopup = true;
                $scope.$broadcast('editclass', { id: id })
            }
            $scope.closeClass = function (id) {
                $http.post('delclass', { id: id }).success(function () {
                    gintDialog.success('删除成功')
                    $scope.init();
                })
            }
            $scope.init = function () {
                $scope.showClassPopup = false;
                $scope.list = [];
                $http.post('classlist').success(function (data) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        $scope.list.push(data[i])
                    }
                })
            }
            $scope.initschedule = function () {
                $http.post('init').success(function (data) {
                    $scope.datalist = data;
                    // data.map(function(v){
                    //     // if(v.courseId.length)
                    //     $scope.datalist=data
                    // })
                    gintDialog.success("success")
                })
            }
            $scope.fitnessFn=function(param){
               $http.post('outputfit').success(function(data){
                   $scope.fitness=data
                   console.log($scope.fitness)
                   gintDialog.success('!!!')
               })
            }
            var changeNum=function(num,n){
                return (Array(n).join(0)+num).slice(-n);
            }
            $scope.getlist = function () {
                $http.post('getlist').success(function (data) {
                    $scope.data = data;
                })
            }
            $scope.calcul=function(){
                var listmap=[]
                var fitcount=0;
                $scope.data.map(function (v) {
                    $scope.fitness.map(function(r){
                        if(r.teacherId==v.teacherId){
                            
                        }
                    })
                    listmap.push(changeNum(v.courseId,3)+changeNum(v.teacherId,3)+changeNum(v.classId,3)+changeNum(v.classroomId,2)+changeNum(v.time,2))
                })
                
            }
            $scope.demo = function () {
                // console.log(changeNum(17,3))
                var listmap=[]
                $scope.data.map(function (v) {
                    listmap.push(changeNum(v.courseId,3)+changeNum(v.teacherId,3)+changeNum(v.classId,3)+changeNum(v.classroomId,2)+changeNum(v.time,2))
                })
                console.log(listmap)
            }
            $scope.init();

        }
        ]);
});