define(['angular','jquery'],function(angular,$){
    return angular.module('sche',[])
    .directive('calendarDiy',[function(){
        return {
            restrict:'E',
            templateUrl:'modules/schedisplay-app/directive/template.html',
            scope:{
                datalist:'='
            },
            link:function($scope){
                console.log($('.sche-tr')[2].children)

                $scope.datalist.map(function(v){
                    var row=Math.ceil((v.time-1)/5);
                    var line=(v.time-1)%5;
                    var innertext=v.teacherId+'<br>'+v.classId;
                    $($('.sche-tr')[line].children).eq(row).html(innertext);

                })
            }
        }
    }])
})