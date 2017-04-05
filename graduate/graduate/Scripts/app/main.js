


requirejs.config({
    paths: {
        'jquery': "libs/jquery/dist/jquery.min",
        'sortable': "libs/jquery/dist/jquery-ui-sortable-1.11.2.min",
        'angular': "libs/angular/angular",
        "angularResource": "libs/angular-resource/angular-resource.min",
        "uiRouter": "libs/angular-ui-router/release/angular-ui-router.min",
        "underscore": "libs/underscore/underscore",
        'ngDialog': "libs/ngDialog/js/ngDialog",
        'app': "modules/common-app/app",
        'fullCalendar': "libs/fullcalendar/fullcalendar.min",
        'moment': "libs/fullcalendar/lib/moment.min.old",
        'newMoment': "libs/fullcalendar/lib/moment.min",
        'datePicker': "libs/My97DatePicker/WdatePicker",
        'commonDirective': "directives/common",
        'jqueryUI': "libs/fullcalendar/lib/jquery-ui-1.11.2.min",

    },
    shim: {
        angular: {
            'deps': ["jquery"],
            'exports': "angular"
        },
        angularMock: {
            'deps': ['angular'],
            'exports': 'angularMock'
        },
        angularResource: {
            'deps': ["angular"],
            'exports': "angularResource"
        },
        uiRouter: ["angular"],
        highcharts: ["jquery"],
        cropper: ["jquery"],
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
        fullCalendarLang: ["fullCalendarCustom"],
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
        var currentUser;
        var _hmt = _hmt || [];
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?c555cf20d924035b4d329df9e6bacd78";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);

        $.post('/api/LoginService/GetCurrentUser', function (result) {
            currentUser = result.data;
            var temp = angular.module("CommonApp");
            //var isDev = $("#isDev").val();
            temp.run(['$rootScope', '$state', '$stateParams', 'currentUserService',
                function ($rootScope, $state, $stateParams, currentUserService) {
                    //$rootScope.isDev = isDev;
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    //  $rootScope.currentUser = currentUser;
                    currentUserService.setCurrentUser(currentUser);
                }
            ])
            //判断是否是开发环境
            //temp.constant("isDev", isDev);
            temp.constant("currentUser", currentUser);
            angular.bootstrap(document, ["CommonApp"]);
        });

    });
});
