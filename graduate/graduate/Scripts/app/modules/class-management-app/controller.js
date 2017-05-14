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
                    gintDialog.success('!!!')
                })
            }
            var changeNum = function (num, n) {
                return (Array(n).join(0) + num).slice(-n);
            }
            var fitArr = [];
            var scheArr = [];
            //获取schedule表的数据
            $scope.getlist = function () {
                $http.post('getlist').success(function (data) {
                    $scope.data = data;
                    scheArr.push(data);
                    console.log(data)
                })
            }
            //计算适应度并进行编码
            $scope.calcul = function () {
                // var listmap = []
                scheArr.map(function (item) {
                    $scope.fitcount = 0;
                    item.map(function (v) {
                        $scope.fitness.map(function (r) {
                            if (r.teacherId == v.teacherId) {
                                $scope.fitcount += Math.abs(r.prefertime - v.time % 5) * r.priority
                            }
                        })
                        // listmap.push(changeNum(v.courseId, 3) + ',' + changeNum(v.classId, 3) + ',' + changeNum(v.teacherId, 3) + ',' + changeNum(v.classroomId, 2) + ',' + changeNum(v.time, 2))
                    })

                    console.log($scope.fitcount)
                })

                fitArr.push($scope.fitcount);
            }
            //检测是否冲突
            $scope.errtest = function () {
                scheArr.map(function (p) {
                    p.map(function (v) {
                        p.map(function (i) {
                            if (v.courseId != i.courseId && v.time == i.time) {
                                if (v.teacherId == i.teacherId || v.classroomId == i.classroomId) {
                                    i.time = (i.time + 5) % 25;
                                    $scope.errtest();
                                }
                            }
                        })
                    })
                })
            }
            //交叉操作   todo:变异
            $scope.mix = function () {
                var len = scheArr[0].length;
                var temp = 0;
                for (var i = 0; i < len; i++) {
                    var r0 = Math.random()
                    var r1 = Math.random();
                    if (r0 > 0.3) {
                        temp = scheArr[0][i].time;
                        scheArr[0][i].time = scheArr[1][i].time;
                        scheArr[1][i].time = temp;
                    }
                    if (r1 > 0.9) {
                        scheArr[0][i].time += (scheArr[0][i].time + 1) % 25;
                        scheArr[1][i].time += (scheArr[1][i].time + 1) % 25;
                    }

                }
                $scope.errtest()
                $scope.calcul();
            }
            $scope.init();

        }
        ]);
});