define([
    "angular",
    "moment"
], function(angular, moment) {
    return angular.module("Service.Calendar", ["services.net.scheduleService"])
        .service("calendarService", ["scheduleService",
            function (scheduleService) {

                function getSchduleSource(classId, start, end) {

                    var item = {
                        id: 1,
                        className: "五年三班",
                        subject: "听力",
                        teacherName: "李天乐",
                        classroom: "科学教室1",
                        allDay: false,
                        start: new Date("2017-03-14 08:00"),
                        end: new Date("2017-03-14 10:00")
                    }

                    var eventSources = [{
                        id: item.id,
                        title: '',
                        allDay: item.allDay,
                        start: item.start,
                        end: item.end,
                        className: 'pink',
                        data: item
                    }, {
                        id: 2,
                        title: '',
                        allDay: item.allDay,
                        start: item.start,
                        end: item.end,
                        className: 'pink',
                        data: item
                    }];

                    return eventSources;
                }

                function getCalendarConfig() {
                    var config = {
                        header: {
                            left: 'agendaWeek,agendaWeekdays,agendaWeekends',
                            center: 'prev title next',
                            right: ''
                        },
                        views: {
                            agendaWeek: {
                                buttonText: '周',
                                type: 'agendaWeek',
                                weekends: true
                            },
                            agendaWeekdays: {
                                buttonText: '工作日',
                                type: 'agendaWeek',
                                weekends: false
                            },
                            agendaWeekends: {
                                buttonText: '周末',
                                type: 'agenda',
                                duration: {
                                    weeks: 3
                                },
                                hiddenDays: [1, 2, 3, 4, 5]
                            }
                        },

                        defaultView: 'agendaWeek',
                        locale: 'zh-cn',
                        allDaySlot: false,
                        timezone: "Asia/Shanghai",
                        buttonIcons: {
                            prev: 'circle-triangle-w',
                            next: 'circle-triangle-e'
                        },
                        buttonText: {
                            prev: '<',
                            next: '>'
                        },
                        selectable: false,
                        selectHelper: true,
                        editable: true,

                        //当天开始时间
                        //minTime: '08:00',
                        //maxTime: '20:00',

                        slotLabelFormat: 'HH:mm',
                        //每格的时长
                        slotDuration: '01:00:00',
                        //拖动的时长
                        snapDuration: '00:15:00',

                        columnFormat: 'MM-DD ddd',
                        titleFormat: '',

                        height: 610,
                        weekMode: 'liquid',
                        aspectRatio: 1.5,

                        displayEventTime: false,

                        unselectCancel: ".clickMenu",

                        scrollTime: "08:00:00"

                    }
                    return config;
                }

                function getClassSchduleSource(id, start, end) {
                    return scheduleService.queryClassSchedules({
                        classId: id,
                        beginTime: start,
                        endTime: end
                    });
                }

                function getStudentSchduleSource(id, start, end) {
                    return scheduleService.queryStudentSchedules({
                        studentId: id,
                        beginTime: start,
                        endTime: end
                    });
                }

                function getTeachersSchedule(ids, start, end) {
                    return scheduleService.queryTeacherSchedules({
                        teacherIds: ids,
                        beginTime: start,
                        endTime: end
                    });
                }

                function handleResponse(list, colorMap) {
                    var eventSources = [];
                    var today = moment().format("YYYY-MM-DD");
                    list.forEach(function (item) {
                        var event = {
                            id: item.id,
                            title: "",
                            allDay: false,
                            start: item.beginTime,
                            end: item.endTime,
                            className: item.extra ? colorMap[item.teacherId] : "color_1",
                            editable: (item.extra || moment(item.endTime).format("YYYY-MM-DD") < today) ?  false : true,
                            data: item
                        };
                        eventSources.push(event);
                    });
                    return eventSources;
                }

                function handleStudentReponse(list, classId, colorMap) {
                    var eventSources = [];
                    var today = moment().format("YYYY-MM-DD");
                    list.forEach(function (item) {
                        var event = {
                            id: item.id,
                            title: "",
                            allDay: false,
                            start: item.beginTime,
                            end: item.endTime,
                            className: item.extra ? colorMap[item.teacherId] : (item.classId != classId ? "color_7" : "color_1"),
                            editable: (item.classId != classId || moment(item.endTime).format("YYYY-MM-DD") < today) ? false : true,
                            data: item
                        };
                        eventSources.push(event);
                    });
                    return eventSources;
                }

                function mergeSchedule(data, teacherData, colorMap) {
                    for (var i = 0, len = teacherData.length; i < len; i++) {
                        var exsits = false;
                        for (var j = 0; j < data.length; j++) {
                            if (teacherData[i].id === data[j].id) {
                                exsits = true;
                                break;
                            }
                        }
                        if (!exsits) {
                            teacherData[i].extra = true;
                            data.push(teacherData[i]);
                        }
                    }
                    return handleResponse(data, colorMap);
                }

                function mergeStudentSchedule(data, teacherData, classId, colorMap) {
                    for (var i = 0, len = teacherData.length; i < len; i++) {
                        var exsits = false;
                        for (var j = 0; j < data.length; j++) {
                            if (teacherData[i].id === data[j].id) {
                                exsits = true;
                                break;
                            }
                        }
                        if (!exsits) {
                            teacherData[i].extra = true;
                            data.push(teacherData[i]);
                        }
                    }
                    return handleStudentReponse(data, classId, colorMap);
                }

                function queryOccupyAreaRelevant(params) {
                    return scheduleService.queryOccupyAreaRelevant(params);
                }

                function juageClick(start, end) {
                    return end - start > 900000;
                }

                function copySchedule(params) {
                    return scheduleService.copySchedule(params);
                }

                return {
                    getSchduleSource: getSchduleSource,
                    getCalendarConfig: getCalendarConfig,
                    getClassSchduleSource: getClassSchduleSource,
                    getStudentSchduleSource: getStudentSchduleSource,
                    getTeachersSchedule: getTeachersSchedule,
                    handleResponse: handleResponse,
                    handleStudentReponse: handleStudentReponse,
                    mergeSchedule: mergeSchedule,
                    mergeStudentSchedule: mergeStudentSchedule,
                    queryOccupyAreaRelevant: queryOccupyAreaRelevant,
                    juageClick: juageClick,
                    copySchedule: copySchedule
                }
            }
        ]);
});