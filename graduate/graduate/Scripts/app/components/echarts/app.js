'use strict';

define([
    'angular',
    'components/echarts/directive'
], function (angular) {
    angular.module('components.echarts', ['ng-echarts'
        ])
        //建议自定义共用组件都增加版本号
        .value('version', '0.1');
});
