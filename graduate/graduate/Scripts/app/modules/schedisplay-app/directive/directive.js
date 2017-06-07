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
                var colorarr=["#12e6ad","#1085ec","#baade0","#da68e6","#ec51ad","#d85757"]
                var n=0;
                $scope.datalist.map(function(v){
                    var row=Math.floor((v.time-1)/5)+1;
                    var line=(v.time-1)%5;
                    var innertext=v.courseName+'<br>'+v.className+'<br>'+v.teacherName+'<br>'+v.classroomName;
                    // var n=Math.floor(Math.random()*6)
                    $($('.sche-tr')[line].children).eq(row).css('background-color',colorarr[n]).html(innertext);
                    n++;
                    if(n>5){
                        n-=5;
                    }

                })
            }
        }
    }])
})