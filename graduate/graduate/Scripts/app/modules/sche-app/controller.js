"use strict"
define([
    'angular',
    "services/dialogService"
], function (angular) {
    return angular.module('sche-controller', ["Dialog.services"])
        .controller('sche-ctrller', ['$scope', '$http', "gintDialog", "$timeout", "$q", function ($scope, $http, gintDialog, $timeout, $q) {
            function onClick(params) {
                console.log(params);
            };
            $scope.lineConfig = {
                theme: 'default',
                event: [{ click: onClick }],
                dataLoaded: true
            };
            $scope.lineOption = {
                title: {
                    text: '每一代种群的适应度变化'
                },
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     data: ['最高气温', '最低气温']
                // },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: $scope.xA
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            // formatter: '{value} '
                            // formatter: function (v) {
                            //     // debugger
                            //     if (v > 2000) {
                            //         return v;
                            //     }
                            //     else {
                            //         return 0
                            //     }
                            // }
                        },
                        min: 7500,
                        max: 7900
                    }
                ],
                series: [
                    {
                        name: '适应度',
                        type: 'line',
                        // data: [11, 11, 15, 13, 12, 13, 10],
                        data: $scope.fitAvg,
                        markPoint: {
                            data: [
                                // { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    }
                    // {
                    //     name: '最低气温',
                    //     type: 'line',
                    //     data: [1, -2, 2, 5, 3, 2, 0],
                    //     markPoint: {
                    //         data: [
                    //             { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                    //         ]
                    //     },
                    //     markLine: {
                    //         data: [
                    //             { type: 'average', name: '平均值' }
                    //         ]
                    //     }
                    // }
                ]
            };
            $scope.calcount = 8;
            $scope.initschedule = function () {
                $http.post('init').success(function (data) {
                    // $scope.datalist = data;
                    if ($scope.calcount > 0) {
                        $scope.getlist()
                    }
                    $scope.calcount--;
                })
            }

            var changeNum = function (num, n) {
                return (Array(n).join(0) + num).slice(-n);
            }
            var scheArr = [];
            //获取影响适应度的因素
            $scope.fitnessFn = function (param) {
                $http.post('outputfit').success(function (data) {
                    $scope.fitness = data
                    // gintDialog.success('!!!')
                })
            }
            //获取schedule表的数据
            $scope.getlist = function () {
                $http.post('getlist').success(function (data) {
                    $scope.data = data;
                    scheArr.push(data);
                    if ($scope.calcount > 0) {
                        $scope.initschedule()

                    }
                    if ($scope.calcount == 0) {
                        $scope.calcul()
                    }
                    console.log($scope.calcount + ' finished')
                })
            }
            $scope.fitAvg = [];
            $scope.xA = [];
            //记录遗传了多少代
            var time = 0;
            //计算适应度
            $scope.calcul = function () {
                $scope.fitArr = [];
                //记录适应度总和
                var sum = 0;
                //记录有多少张课表   其实可以写死
                var count = 0;

                scheArr.map(function (item) {
                    $scope.fitcount = 0;
                    item.map(function (v) {
                        $scope.fitness.map(function (r) {
                            if (r.teacherId == v.teacherId) {
                                $scope.fitcount += Math.abs(r.prefertime - v.time % 5) * r.priority
                            }
                        })
                        item.map(function (t) {
                            if (t.courseId == v.courseId) {
                                if (10 < Math.abs(t.time - v.time) < 16) {
                                    $scope.fitcount += 1
                                } else {
                                    $scope.fitcount += 40
                                }
                            }
                        })
                        // listmap.push(changeNum(v.courseId, 3) + ',' + changeNum(v.classId, 3) + ',' + changeNum(v.teacherId, 3) + ',' + changeNum(v.classroomId, 2) + ',' + changeNum(v.time, 2))
                    })
                    console.log($scope.fitcount)
                    sum += $scope.fitcount;
                    count++
                    $scope.fitArr.push($scope.fitcount);
                })
                console.log($scope.fitArr)
                $scope.fitAvg.push(sum / count);
                $scope.xA.push(++time)
                $scope.lineOption.series[0].data = $scope.fitAvg
                $scope.lineOption.xAxis[0].data = $scope.xA
                // $scope.fitArr.map(function(v){
                //     sum+=v;
                // })

                console.log("均值:" + sum / count);
            }
            //检测是否冲突并解决
            $scope.errtest = function (testArr, idx) {
                var defer = $q.defer();
                var promise = defer.promise;
                // var flg = false;
                promise.then(function () {
                    for (var v = 0; v < testArr.length; v++) {
                        for (var k = 0; k < testArr.length; k++) {
                            if (testArr[v].scheduleId != testArr[k].scheduleId && testArr[v].time == testArr[k].time) {
                                if (testArr[v].teacherId == testArr[k].teacherId || testArr[v].classroomId == testArr[k].classroomId) {
                                    testArr[k].time = testArr[k].time + Math.ceil(Math.random() * 5);
                                    if (testArr[k].time > 25) {
                                        testArr[k].time = testArr[k].time - 25
                                    }
                                    $scope.errtest(testArr, idx);
                                    
                                    // flg = true;
                                }
                            }
                        }
                    }
                    // if (flg) {
                        // $scope.tii++;                        
                    // } else 
                    if (idx == scheArr.length - 1) {
                        $scope.calcul();
                        // $scope.mixCount--;
                        // if ($scope.mixCount > 0) {
                        //     $scope.mix();
                        // }
                    }
                })

                defer.resolve();
            }
            $scope.testfun = function () {
                $scope.tii = 0
                scheArr.map(function (item, idx) {
                    // $timeout($scope.errtest(item), 10000)
                    $scope.errtest(item, idx)
                })
            }

            //交叉&变异操作   
            $scope.mix = function () {
                var rangeArr = [];
                $scope.fitArr.map(function (v, idx) {
                    var tempcount = 0;
                    var equalcount = 0;
                    $scope.fitArr.map(function (k) {
                        if (k > v) {
                            tempcount += 1;
                        }
                        if (k == v) {
                            equalcount += 1;
                        }
                    })
                    if (tempcount + equalcount <= 4) {
                        rangeArr.push(scheArr[idx])
                    }
                    if (tempcount < 4 && tempcount + equalcount > 4) {
                        rangeArr.push(scheArr[idx])
                    }
                })
                rangeArr.slice(0, 3);
                var len = scheArr[0].length;
                var temp = 0;
                for (var ti = 0; ti < 3; ti += 2) {
                    for (var i = 0; i < len; i++) {
                        var r0 = Math.random()
                        var r1 = Math.random();
                        if (r0 > 0.5) {
                            temp = rangeArr[ti][i].time;
                            rangeArr[ti][i].time = rangeArr[ti + 1][i].time;
                            rangeArr[ti + 1][i].time = temp;
                        }
                        if (r1 > 0.9) {
                            rangeArr[ti][i].time = rangeArr[ti][i].time + Math.ceil(Math.random() * 5);
                            rangeArr[ti + 1][i].time = rangeArr[ti + 1][i].time + Math.ceil(Math.random() * 5);
                            if (rangeArr[ti][i].time > 25) {
                                rangeArr[ti][i].time = rangeArr[ti][i].time - 25
                            }
                            if (rangeArr[ti + 1][i].time > 25) {
                                rangeArr[ti + 1][i].time = rangeArr[ti + 1][i].time - 25
                            }
                            // rangeArr[ti][i].time = rangeArr[ti][i].time % 25;
                            // rangeArr[ti + 1][i].time = rangeArr[ti + 1][i].time % 25;
                        }
                    }
                }
                $scope.testfun()
            }
            $scope.mix2 = function () {
                $scope.mixCount = 500;
                $scope.mix();
            }
            // 得到最优解，将课表输出
            $scope.set = function () {
                $scope.fitArr.map(function (v, idx) {
                    var flag = false;
                    $scope.fitArr.map(function (r) {
                        if (r > v) {
                            flag = true;
                        }
                    })
                    if (!flag) {
                        $scope.outputsche = scheArr[idx];
                    }
                })
                console.log($scope.outputsche)
                $http.post('setsche', $scope.outputsche).success(function (data) {
                    gintDialog.success('success')
                })
            }
            $scope.fitnessFn()
        }])

});