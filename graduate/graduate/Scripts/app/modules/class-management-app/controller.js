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
                    gintDialog.success("success")
                })
            }
            $scope.fitnessFn = function (param) {
                $http.post('outputfit').success(function (data) {
                    $scope.fitness = data
                    console.log($scope.fitness)
                    gintDialog.success('!!!')
                })
            }
            var changeNum = function (num, n) {
                return (Array(n).join(0) + num).slice(-n);
            }
            var fitArr=[];
            var scheArr=[];

            $scope.getlist = function () {
                $http.post('getlist').success(function (data) {
                    $scope.data = data;
                    // scheArr.push(data);
                    console.log(data)
                })
            }
            
            $scope.calcul = function () {
                var listmap = []
                var fitcount = 0;
                $scope.data.map(function (v) {
                    $scope.fitness.map(function (r) {
                        if (r.teacherId == v.teacherId) {
                            fitcount += Math.abs(r.prefertime - v.time % 5) * r.priority
                        }
                    })
                    listmap.push(changeNum(v.courseId, 3) +','+ changeNum(v.classId, 3) +','+ changeNum(v.teacherId, 3) +','+ changeNum(v.classroomId, 2) +','+ changeNum(v.time, 2))
                })
                console.log(fitcount)
                fitArr.push(fitcount);
                scheArr.push(listmap);
            }
            $scope.demo = function () {
                var d1=scheArr[0];
                // var d2=scheArr[1];
                console.log(d1)
                var t=[];
                var k=[];
                d1.map(function(v){
                    temp=v.split(',')
                    t.push(temp[2]+','+temp[3]+','+temp[4])
                })
                console.log(k)
                //冲突检测
                t.map(function(item1){
                    var p=item1.split(',');
                    k.push(p);
                })
            }
            $scope.init();

        }
        ]);
});