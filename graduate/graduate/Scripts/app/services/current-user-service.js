/*******************************************************************/
/* 自动生成代码，请勿手动调整。
/*******************************************************************/
define([
    "angular",
    "underscore"
], function (angular, _) {
    return angular.module("service.currentUser", [])
        .factory("currentUserService", ["$http", "$timeout", "$q", "rolesService", function ($http, $timeout, $q, rolesService) {
            var currentUser;

            return {
                setCurrentUser: function (user) {
                    currentUser = user;
                },
                hasPermission: function (permissions, isRedirect) {
                    var flg = false;
                    for (var i = 0; i < permissions.length; i++) {
                        if (flg) {
                            break;
                        }
                        for (var j = 0; j < currentUser.userFunction.length; j++) {
                            if (permissions[i] == currentUser.userFunction[j]) {
                                flg = true;
                                break;
                            }
                        }
                    }
                    if (flg) {
                        return true;
                    }
                    else if (isRedirect) {
                        var school = document.cookie ? document.cookie.match(/\bschool=([^;]+)/)[1] : null;
                        location.href = school ? '/' + school + '/Login' : "/";
                    } else {
                        return flg;
                    }

                },
                getCurrentUser: function () {
                    return currentUser;
                }                
            };
        }])
        .constant('rolesService', {
            // 教师管理
            "EasEmployeeManage" : 60100,
            // 教师新增
            "EasEmployeeAdd" : 60101,
            // 教师编辑
            "EasEmployeeEdit" : 60102,
            // 教师冻结/解冻
            "EasEmployeeState" : 60103,
            // 教师批量导入
            "EasEmployeeBatchImport" : 60105,
            // course教师同步
            "EasCourseEmployeeSync" : 60106,
            // crm教师同步
            "EasCrmEmployeeSync" : 60107,
            // 学员管理
            "EasStudentManage" : 60200,
            // 学员新增
            "EasStudentAdd" : 60210,
            // 学员报名
            "EasStudentSignUp" : 60220,
            // 学员编辑
            "EasStudentEdit" : 60230,
            // 学员同步
            "EasStudentSync" : 60240,
            // 学员批量导入
            "EasStudentBatchImport" : 60250,
            // 学员退课
            "EasStudentSignOut" : 60260,
            // 班级管理
            "EasClassManage" : 60300,
            // 班级新增
            "EasClassAdd" : 60301,
            // 班级编辑
            "EasClassEdit" : 60302,
            // 班级结班
            "EasClassState" : 60303,
            // 班级学员管理
            "EasClassStudent" : 60304,
            // 班级批量导入
            "EasClassBatchImport" : 60305,
            // 排课
            "EasScheduling" : 60400,
            // 班级排课
            "EasClassScheduling" : 60401,
            // 学员排课
            "EasStudentScheduling" : 60402,
            // 排课设置
            "EasScheduleSetting" : 60500,
            // 教室设置
            "EasClassroom" : 60510,
            // 教室新增
            "EasClassroomAdd" : 60511,
            // 教室编辑
            "EasClassroomEdit" : 60512,
            // 教室删除
            "EasClassroomDel" : 60513,
            // 教室批量导入
            "EasClassroomBatchImport" : 60514,
            // 时间设置
            "EasClassTime" : 60520,
            // 时间新增
            "EasClassTimeAdd" : 60521,
            // 时间编辑
            "EasClassTimeEdit" : 60522,
            // 时间删除
            "EasClassTimeDel" : 60523,
            // 课程管理
            "EasCourseManage" : 60600,
            // 课程新增
            "EasCourseAdd" : 60601,
            // 课程编辑
            "EasCourseEdit" : 60602,
            // 课程删除
            "EasCourseDel" : 60603,
            // 课程状态
            "EasCourseState" : 60604,
            // 课程批量导入
            "EasCourseBatchImport" : 60605,
        })
        .constant('messages', {     
            0 : "",
            1 : function () { location.href = "/Home /Error"; },
            25001 : "用户名或密码不正确！",
            25002 : "用户被禁用！",
            25003 : "请输入用户名！",
            25004 : "请输入密码！",
            25005 : "账户重复！",
            25006 : "上课校区为空！",
            25007 : "部门为空！",
            25008 : "用户姓名或联系方式为空！",
            25009 : "存在无权限的部门！",
            25010 : "存在无权限的校区！",
            25011 : "角色不属于该机构！",
            25012 : "联系方式不合法！",
            25013 : "性别填写错误",
            25014 : "用户不存在",
            25015 : "用户已被复/离职",
            25016 : "两次密码不一致",
            25017 : "原始密码错误",
            25018 : "用户名超过32个字符！",
            25019 : "用户姓或名超过100个字符！",
            25020 : "用户权限未开通",
            25021 : "用户名已存在！",
            25022 : "姓名和对应的联系方式在机构内已存在！",
            26001 : "当前登录机构不存在！",
            42008 : "为选择可用校区",
            42009 : "名称超过100个字符",
            400001 : "时间区间错误！",
            400002 : "课时时长为空！",
            400003 : "时间太长错误！",
            400004 : "日程不存在！",
            400005 : "日程编号为空！",
            400006 : "班级冲突！",
            400007 : "教室冲突！",
            400008 : "教师冲突！",
            400009 : "学员冲突！",
            400010 : "报名课时时间异常！",
            400011 : "没有选择插入的日程！",
            400012 : "没有选择对应的学生！",
            400013 : "班级不存在或者已结班！",
            400014 : "报名信息有误！",
            400015 : "报名课时异常！",
            400016 : "没有科目编号！",
            410001 : "课程编号为空！",
            410002 : "课程编号重复！",
            410003 : "课程名称为空！",
            410004 : "课程已关联任务！",
            410005 : "课程不存在！",
            410006 : "报名学生列表为空",
            410007 : "报名课程列表为空",
            410008 : "报名课程课时为空",
            410009 : "报名课程课时范围错误",
            410010 : "课程重复报名",
            410011 : "分科目课时量不等于总课时量，请重新输入！",
            410012 : "课时非正整数",
            411001 : "班级编号为空！",
            411002 : "班级编号重复！",
            411003 : "班级名称为空！",
            411004 : "班级开班时间晚于结班时间！",
            411005 : "班级不存在！",
            411006 : "班级已结班！",
            411007 : "课程校区与用户校区无交集！",
            411008 : "填写课时超过班级总课时！",
            411009 : "学员重复报名！",
            411010 : "上课校区与用户校区无交集！",
            412001 : "教室名称为空！",
            412002 : "教室容量非正整数！",
            412003 : "教室所属校区为空！",
            412004 : "教室可用校区为空！",
            412005 : "教室id不存在！",
            412006 : "教室名称已存在！",
            413001 : "售卖校区为空！",
            413002 : "课程售卖校区于用户校区无交集！",
            413003 : "上课校区为空！",
            413004 : "用户已经无该教室对应的归属校区权限",
            413005 : "无对应校区操作权限",
            420001 : "时间冲突",
            420002 : "时间模板名称重复",
            420003 : "时间模板名称为空",
            420004 : "不存在可编辑的列表",
            420005 : "删除了无权限的校区",
            420006 : "时间格式错误",
            420007 : "时间超出限定范围8:00-20:00",
            430001 : "每次最多只支持1000条数据批量导入，请检查后重新上传！",
            430002 : "所选文件不是Excel，请检查后重新上传！",
            430003 : "所选文件表头与导入模板表头不一致，请检查后重新上传！",
            430004 : "数据导入部分成功！",
    });
});    

