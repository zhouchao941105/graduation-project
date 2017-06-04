"use strict"
define([
    'angular',
    "services/dialogService"
], function (angular) {
    return angular.module('sche-controller', ["Dialog.services"])
        .controller('sche-ctrller', ['$scope', '$http', "gintDialog", function ($scope, $http, gintDialog) {
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
                            formatter: '{value} '
                        }
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
                                { type:'min',name:'最小值'}
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
            $scope.calcount = 10;
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
                    console.log($scope.calcount + ' finished')
                })
            }
            $scope.fitAvg=[];
            $scope.xA=[];
            //记录遗传了多少代
                var time=0;
            //计算适应度
            $scope.calcul = function () {
                $scope.fitArr = [];
                //记录适应度总和
                var sum = 0;
                //记录有多少张课表   其实可以写死
                var count=0;
                
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
                $scope.fitAvg.push(sum/count);
                $scope.xA.push(++time)
                $scope.lineOption.series[0].data=$scope.fitAvg
                $scope.lineOption.xAxis[0].data=$scope.xA
                // $scope.fitArr.map(function(v){
                //     sum+=v;
                // })

                console.log("总和:" + sum);
            }
            //检测是否冲突并解决
            $scope.errtest = function () {
                scheArr.map(function (p) {
                    p.map(function (v) {
                        p.map(function (i) {
                            if (v.scheduleId != i.scheduleId && v.time == i.time) {
                                if (v.teacherId == i.teacherId || v.classroomId == i.classroomId) {
                                    i.time = (i.time + Math.ceil(Math.random() * 5)) % 25;
                                    $scope.errtest();
                                }
                            }
                        })
                    })
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
                    if (tempcount + equalcount <= 8) {
                        rangeArr.push(scheArr[idx])
                    }
                    if (tempcount < 8 && tempcount + equalcount > 8) {
                        rangeArr.push(scheArr[idx])
                    }
                })
                rangeArr.slice(0, 7);
                var len = scheArr[0].length;
                var temp = 0;
                for (var ti = 0; ti < 7; ti += 2) {
                    for (var i = 0; i < len; i++) {
                        var r0 = Math.random()
                        var r1 = Math.random();
                        if (r0 > 0.3) {
                            temp = rangeArr[ti][i].time;
                            rangeArr[ti][i].time = rangeArr[ti + 1][i].time;
                            rangeArr[ti + 1][i].time = temp;
                        }
                        if (r1 > 0.9) {
                            rangeArr[ti][i].time += rangeArr[ti][i].time + Math.ceil(Math.random() * 5);
                            rangeArr[ti + 1][i].time += rangeArr[ti + 1][i].time + Math.ceil(Math.random() * 5);
                            rangeArr[ti][i].time = rangeArr[ti][i].time % 25;
                            rangeArr[ti + 1][i].time = rangeArr[ti + 1][i].time % 25;
                        }
                    }
                }
                $scope.errtest()
                $scope.calcul();
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