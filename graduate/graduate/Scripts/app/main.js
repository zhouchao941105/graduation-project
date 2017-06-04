


requirejs.config({
    paths: {
        'jquery': "libs/jquery/dist/jquery.min",
        'sortable': "libs/jquery/dist/jquery-ui-sortable-1.11.2.min",
        'angular': "libs/angular/angular",
        "uiRouter": "libs/angular-ui-router/release/angular-ui-router.min",
        "underscore": "libs/underscore/underscore",
        'ngDialog': "libs/ngDialog/js/ngDialog",
        'app': "modules/common-app/app",
        'fullCalendar': "libs/fullcalendar-new/fullcalendar",
        'moment': "libs/fullcalendar/lib/moment.min",
        'datePicker': "libs/My97DatePicker/WdatePicker",
        'commonDirective': "directives/common",
        'jqueryUI': "libs/fullcalendar/lib/jquery-ui-1.11.2.min",
        'fullCalendarLocale': "libs/fullcalendar-new/locale-all",
        'fullCalendarCustom': "libs/fullcalendar/fullcalendar-custom",
        'echarts':'libs/echarts'
    },
    shim: {
        angular: {
            'deps': ["jquery"],
            'exports': "angular"
        },
        uiRouter: ["angular"],
        highcharts: ["jquery"],
        "highcharts-ng": ["angular", "highcharts"],
        "highcharts-more": ["highcharts"],
        ckeditor: ["jquery"],
        ngCkeditor: ["angular", "ckeditor"],
        underscore: {
            'exports': "_"
        },
        datePicker: {
            init: function () {
                //hack第一次点击无效果，因为第一次点击才去下载一些东西
                WdatePicker({});
                $dp.hide();
            }
        },
        commonDirective: ['angular', 'sortable', 'datePicker'],
        jqueryUI: ["jquery"],
        fullCalendar: ["jqueryUI", "moment"],
        fullCalendarCustom: ["fullCalendar"],
        fullCalendarLocale: ["fullCalendarCustom"],
        angularElastic: ["angular"],
        angularTranslate: ["angular"],
        angularTranslateLoaderPartial: ["angular", "angularTranslate"],
        angularTranslateLoaderStaticFiles: ["angular", "angularTranslate"]
    }
});

require([
    "app"
], function () {
    angular.element(document).ready(function () {
        // $.post('/api/LoginService/GetCurrentUser', function (result) {
            // currentUser = result.data;
            // var t=document.getElementById('hidbox')
            
            
            var temp = angular.module("CommonApp");
            temp.run(['$rootScope', '$state', '$stateParams', 'currentUserService',
                function ($rootScope, $state, $stateParams, currentUserService) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    $rootScope.permission=$('#hidbox').val()==1?true:false;
                    // console.log($rootScope.permission)
                    //  $rootScope.currentUser = currentUser;
                    //currentUserService.setCurrentUser(currentUser);
                }
            ])
            //判断是否是开发环境
            //temp.constant("isDev", isDev);
            //temp.constant("currentUser", currentUser);
            angular.bootstrap(document, ["CommonApp"]);
        });

    //});
});
