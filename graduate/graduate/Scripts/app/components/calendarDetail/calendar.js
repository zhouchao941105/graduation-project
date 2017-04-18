define([
    "angular",
    "moment",
    "components/fullcalendar/calendar",
], function (angular, moment) {
    return angular.module("Components.calendarDetail", [
        "ui.calendar"
    ]).directive("calendarDetail", ["gintDialog", "$timeout", "$rootScope", function (gintDialog, $timeout, $rootScope) {

        function handleResponse(list) {
            var eventSources = [];
            var colorArr = Object.keys(Array.apply(null, { length: 8 })).map(function (v) { return "color_" + (+v + 1) }), i = 0, subject = [];
            list.forEach(function (item) {
                item.subjectName='111';
                var event = {
                    id: item.ID,
                    title: "",
                    allDay: false,
                    start: new Date(),
                    end: new Date(),
                    className: subject[item.subjectId] || (subject[item.subjectId] = colorArr[i++]),
                    data: item
                };
                eventSources.push(event);
                (i == colorArr.length - 1) && (i = 0);
            });
            return eventSources;
        }

        return {
            restrict: 'EA',
            scope: {
                api:"=",
                typeId: "=",
                type:"@"
            },
            templateUrl: "components/calendarDetail/calendar.html",
            controller: function ($scope) {
                $scope.eventSources = [];
            },
            link: function (scope, iElement, iAttr, controller) {
                console.log(scope.typeId);
                scope.config = {
                    header: {
                        left: '',
                        center: 'prev title next',
                        right: ''
                    },
                    defaultView: 'agendaWeek',
                    locale: 'zh-cn',
                    allDaySlot: false,
                    timezone: "Asia/Beijing",
                    buttonIcons: {
                        prev: 'circle-triangle-w',
                        next: 'circle-triangle-e'
                    },
                    buttonText: {
                        prev: '<',
                        next: '>'
                    },
                    selectable: false,
                    selectHelper: false,
                    editable: false,
                    //当天开始时间
                    minTime: '00:00',
                    maxTime: '24:00',
                    slotLabelFormat: 'HH:mm',
                    //每格的时长
                    slotDuration: '01:00:00',
                    columnFormat: 'MM-DD ddd',
                    titleFormat: '',
                    height: 520,
                    weekMode: 'liquid',
                    aspectRatio: 1.5,
                    displayEventTime: false
                }

                scope.refetchEventSources = function () {
                    controller.refetchEvents();
                }

                var calendarConfig = {};

                calendarConfig.calendar = scope.config;

                //事件源
                calendarConfig.calendar.events = function (start, end, timezone, callback) {
                    scope.queryEventList(start, end, callback);
                };

                //日程渲染
                calendarConfig.calendar.eventAfterAllRender = function (view) {
                    console.log("eventAfterAllRendering");
                };
                //渲染日程内容
                calendarConfig.calendar.eventRender = function (event, element, view) {
                    var source = event.data;
                    if (source) {
                        var html = "<span class='fc-text'>" + event.start.format("HH:mm") + "-" + event.end.format("HH:mm") + "</span>" +
                            "<span class='fc-text'>" + source.className + "</span>" +
                            "<span class='fc-text'>" + source.subjectName + "</span>" +
                            "<span class='fc-text'>" + source.teacherName + "</span>" +
                            "<span class='fc-text'>" + source.classRoomName + "</span>";
                        element.find('.fc-content').append(html).parent().attr('gint-label', html);
                    }
                };
                //查询事件源
                scope.queryEventList = function (start, end, callback) {
                    if (scope.id <= 0) {
                        return;
                    }
                    // var startTime = start.subtract(8,'h');
                    // var endTime = end.subtract(8, 'h');
                    // var param = {
                    //     beginTime: startTime,
                    //     endTime: endTime,
                    //     isExport: true
                    // }
                    // param[scope.type] = scope.typeId;
                    // console.log(param);
                    scope.api().success(function (data) {
                        callback(handleResponse(data));
                    }).error(function (data) {

                    });
                   
                };

                

            }
        }
    }]);
});