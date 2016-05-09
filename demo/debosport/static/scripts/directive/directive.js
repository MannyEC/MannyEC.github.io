app.directive('testStart',function(){
    return function (scope,elm,attr){
        elm.bind('click',function(){
            //隐藏"开始"按钮,并呈现第一个问题
            elm.removeClass("on").addClass("close");
            scope.curShow = angular.element(document.getElementById("questions"))
                .find("section")[0];

            scope.$apply();

        });
    }
});

app.directive('nextQues',function(){
    return {
        scope:false,
        link:function (scope,elm,attr){
            elm.bind('click',function(){
                scope.$parent.$parent.curShow = angular.element(scope.curShow).next();
                scope.$apply();
            });
        }
    }
});

app.directive('seeResult',function(){
    return {
        scope:false,
        link:function (scope,elm,attr){
            elm.bind('click',function(){
                //计算得分
                var score = calculateScore(scope.selectValue);

                //关闭旧panel
                //angular.element(scope.$parent.$parent.curShow).removeClass("on").addClass("close");
                scope.curShow.removeClass("on").addClass("close");

                //呈现panel
                var judgementDom = document.getElementById("judgement");
                angular.element(judgementDom).removeClass("close").addClass("on");

                //写入模板中judgement数据
                var judgements = scope.questions.judgement;
                for(var i=0;i<judgements.length;i++){
                    var scoreRange = judgements[i].score;
                    if (scoreRange[0]<=score && scoreRange[1]>=score){
                        scope.$parent.$parent.judgement = judgements[i].text;

                    }
                }
                //向后台存储数据
            });
        }
    }
});

function calculateScore(selectValue){
    var score = 0;
    angular.forEach(selectValue,function(value){
        score += parseInt(value);
    });
    return score
}