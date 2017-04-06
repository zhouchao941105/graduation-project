'use strict';
define(["angular"], function (angular) {
    return angular.module('CommonFilter', [])
        .filter('elseValue', function() {
            //当值为null或者不存在时显示另一个值
            return function(value, elseValue) {
                if (value) return value;
                else return elseValue;
            };
        })
        .filter('limit', function() {
            var strReg = /[^\x21-\x7e]/g;
            //截取字符串
            //超过长度的情况，取小于指定长度的最多字符串，再加...
            return function(str, num) {
                if (!num)
                    return str;

                if (!angular.isString(str))
                    return str;

                var replacedStr = str.replace(strReg, "**");
                if (replacedStr.length > num) {
                    var strLen = str.length;
                    var tmpI = Math.floor(num / 2) - 1;
                    var tmpLength = str.substr(0, tmpI).replace(strReg, "**").length;
                    for (; tmpI < strLen; tmpI++) {
                        tmpLength += str.substr(tmpI, 1).replace(strReg, "**").length;
                        if (tmpLength >= num)
                            return str.substr(0, tmpI) + "...";
                    }
                } else {
                    return str;
                }
            };
        })
        //
        .filter('limitStr', function() {
            //超过指定长度用默认值替换--shaobo.wang
            //str原字符串，num截取长度，超过后替换的字符
            return function(str, num, replaceStr) {
                if (!num)
                    return str;

                if (!angular.isString(str))
                    return str;
                if (str.length > num) {
                    return str.substr(0, num) + replaceStr;
                } else {
                    return str;
                }
            }
        })
        .filter('parseJsonDate', function() {
            //解析服务端返回的json格式的日期到date类型的对象
            return function(dateStr) {
                var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
                var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
                var date;
                if (typeof dateStr === 'string') {
                    var a = reISO.exec(dateStr);
                    if (a)
                        date = new Date(dateStr);
                    a = reMsAjax.exec(dateStr);
                    if (a) {
                        var b = a[1].split(/[-+,.]/);
                        date = new Date(b[0] ? +b[0] : 0 - +b[1]);
                    }
                }
                return date;
            };
        })
        .filter('formatJsonDate', [
            '$filter', function($filter) {
                // 将服务端返回的json格式的日期格式化成日期字符串
                // formatStr使用ng的格式化字符串标准
                return function(dateStr, formatStr) {
                    var date = $filter('parseJsonDate')(dateStr);
                    return $filter('date')(date, formatStr);
                };
            }
        ])
        .filter('formatJsonDate2', [
            '$filter', function($filter) {
                // 将服务端返回的json格式的日期格式化成日期字符串
                // formatStr使用ng的格式化字符串标准
                return function(dateStr, formatStr) {
                    if (dateStr && dateStr.indexOf("Date") < 0) {
                        return dateStr;
                    }
                    if (dateStr == "" || dateStr == null) {
                        return dateStr;
                    }
                    var date = $filter('parseJsonDate')(dateStr);
                    return $filter('date')(date, formatStr);
                };
            }
        ])
        .filter('formatJsonDate3', [   //如果时间是"/Date(-62135596800000+0800)/"返回空，针对一些特殊需求
            '$filter', function ($filter) {
                // 将服务端返回的json格式的日期格式化成日期字符串
                // formatStr使用ng的格式化字符串标准
                return function (dateStr, formatStr) {
                    if (dateStr == "/Date(-62135596800000+0800)/") {
                        dateStr = '';
                    }
                    var date = $filter('parseJsonDate')(dateStr);
                    return $filter('date')(date, formatStr);
                };
            }
        ])
        .filter('ifTrue', function() {
            //当condition为true时返回值
            return function(value, condition) {
                if (condition) return value;
                else return "";
            };
        })
        .filter('secondToTime', function() {
            //当condition为true时返回值
            return function(input) {
                if (input == -1) {
                    return "";
                }
                var hh, mm, ss;
                //得到小时
                hh = input / 3600 | 0;
                input = parseInt(input) - hh * 3600;
                if (parseInt(hh) < 10) {
                    hh = "0" + hh;
                }
                //得到分
                mm = input / 60 | 0;
                //得到秒
                ss = parseInt(input) - mm * 60;
                if (parseInt(mm) < 10) {
                    mm = "0" + mm;
                }
                if (ss < 10) {
                    ss = "0" + ss;
                }
                return hh + ":" + mm + ":" + ss;
            };
        })
        .filter('secondToTimeForLive', [
            '$translate', function($translate) {
                //当condition为true时返回值
                return function(input) {
                    input = parseInt(input / 1000);
                    if (input == -1) {
                        return "";
                    }
                    var hh, mm, ss;
                    //得到小时
                    hh = input / 3600 | 0;
                    input = parseInt(input) - hh * 3600;
                    //得到分
                    mm = input / 60 | 0;
                    //得到秒
                    ss = parseInt(input) - mm * 60;


                    if (hh == 0 && mm == 0) {
                        return "<1" + $translate.instant(63037);
                    } else {
                        if (hh == 0) {
                            return mm + $translate.instant(63037);
                        } else {
                            return hh + $translate.instant(63060) + mm + $translate.instant(63037);
                        }
                    }
                };
            }
        ])
        .filter('secondToTime2', [
            '$translate', function($translate) {
                //当condition为true时返回值
                return function(input) {
                    if (input == -1) {
                        return "";
                    }
                    if (input <= 0) {
                        return $translate.instant(60497);

                    }
                    var hh, mm, ss;
                    //得到小时
                    hh = input / 3600 | 0;
                    input = parseInt(input) - hh * 3600;
                    if (parseInt(hh) < 10) {
                        hh = "0" + hh;
                    }
                    //得到分
                    mm = input / 60 | 0;
                    //得到秒
                    ss = parseInt(input) - mm * 60;
                    if (parseInt(mm) < 10) {
                        mm = "0" + mm;
                    }
                    if (ss < 10) {
                        ss = "0" + ss;
                    }
                    return hh + ":" + mm + ":" + ss;
                };
            }
        ])
        .filter('mapValue', function() {
            return function(key, dict) {
                if (!dict || !dict.hasOwnProperty(key))
                    return "";
                else
                    return dict[key];
            };
        })
        //类型
        .filter("targetType", function() {
            return function(type) {
                if (type == models.core.targetType.Exam) {
                    return "测试";
                }
                if (type == models.core.targetType.Assignment) {
                    return "作业";
                }
                if (type == models.core.targetType.Course) {
                    return "课程";
                }
            };
        })
        //node状态
        .filter("nodeState", function() {
            return function(state) {
                if (state == models.core.userState.NotStarted) {
                    return "未完成";
                }
                if (state == models.core.userState.Underway) {
                    return "进行中";
                }
                if (state == models.core.userState.WaitForChecked) {
                    return "未批改";
                }
                if (state == models.core.userState.Finished) {
                    return "已完成";
                }
            };
        })
        .filter('top', function() {
            return function(list, num) {
                var res = [];
                for (var i = 0, length = list.length; i < length && i < num; i++) {
                    res.push(list[i]);
                };
                return res;
            };
        })
        //验证数组是否包含某个元素，true包含，false不包含，不兼容低版本IE--shaobo.wang
        .filter('arrayContains', function() {
            return function(arr, str) {
                if (arr.indexOf(str) > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        })
        //根据paperType返回试卷类型名称--shaobo.wang
        .filter('enumExamType', function() {
            return function(paperType) {
                if (paperType == '101') {
                    return '自由组卷';
                }
                if (paperType == '501') {
                    return '雅思';
                }
                if (paperType == '601') {
                    return '雅思自由';
                }
                if (paperType == '1001') {
                    return '托福';
                }
                if (paperType == '1101') {
                    return '托福自由';
                }
                if (paperType == '1501') {
                    return 'SAT';
                }
                if (paperType == '1601') {
                    return '新SAT';
                }
                if (paperType == '1701') {
                    return '新智能口语';
                }
                if (paperType == '1801') {
                    return 'ACT'; //add By jinhui -2016.10.24
                }
            }
        })
        //根据值移除数组中的对应元素--shaobo.wang
        .filter('arrayRemoveVal', function() {
            return function(arr, val) {
                arr.splice(arr.indexOf(val), 1);
                return arr;
            }
        })
        //筛选正整数的正则-- by xcq
        .filter('filterNumber', function () {
            return function (val) {
                if (!val) {
                    return val;
                }
                if (val.length == 1) {
                    val = val.replace(/[^1-9]/g, '')
                } else {
                    val = val.replace(/\D/g, '')
                }
                return val;
            }
        })
        //判断正实数的正则，true是--shaobo.wang
        .filter('checkNumber', function() {
            return function(val) {
                var reg = /^\d+\.?\d*$/;
                return reg.exec(val);
            }
        })
        //判断正整数的正则，true是--shaobo.wang 
        .filter('checkNumber1', function() {
            return function(val) {
                var reg = /^\d+$/;
                return reg.exec(val);
            }
        })
        //将日期格式转换为指定格式--shaobo.wang
        .filter('formatDate', [
            '$filter', function($filter) {
                return function(val, formatStr) {
                    var date = new Date(val);
                    date = Date.parse(date);
                    return $filter('date')(date, formatStr);
                }
            }
        ])
        //将数字精确到小数点后两位--shaobo.wang
        .filter('floatNumber2', function() {
            return function(num) {
                return Math.round(num * 100) / 100;
            }
        })
        //字符串转为数字，失败返回原字符串--shaobo.wang
        .filter('strToNumber', function() {
            return function(str) {
                var num = Number(str);
                if (isNaN(num)) {
                    return str;
                } else {
                    return num;
                }
            }
        })
        //将时间当天时间合并为一个时间区间
        .filter('mergeDate', [
            '$filter',
            function($filter) {
                return function(filter, sTime, eTime) {
                    var sTimeStamp = +sTime.match(/(\d+)/g)[0], eTimeStamp = +eTime.match(/(\d+)/g)[0], s = new Date(sTimeStamp), e = new Date(eTimeStamp);
                    return $filter('date')(s, 'yyyy/MM/dd HH:mm') + '-' + $filter('date')(e, 'HH:mm');
                };
            }
        ]);
});
