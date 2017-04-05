'use strict';

define([
    'angular',
    'components/nav/directives',
    'components/nav/directive//directive'
], function (angular) {
    angular.module('components.nav', [
            'components.nav.directive',
            'components.nav.directive.directive',
        ])
        //建议自定义共用组件都增加版本号
        .value('version', '0.1');
});
