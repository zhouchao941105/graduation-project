'use strict';
//课表导出
define([
    'angular',
    'components/export/directive'
], function (angular) {
    angular.module('components.export', [
            'components.export.directive'
        ])
        //建议自定义共用组件都增加版本号
        .value('version', '0.1');
});