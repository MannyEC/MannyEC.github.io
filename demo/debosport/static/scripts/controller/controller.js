
app.controller('questionCtrl',function($scope){

    $scope.questions = {
        content:[
            {
                num:1,
                name:'ques1',
                description:'医生是否曾经告诉过你患有心脏病并且只能参加医生推荐的体力活动?',
                choice:[
                    {
                        text:'是',
                        value:1
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:2,
                name:'ques2',
                description:'当你参加体力活动时，是否感觉胸痛?',
                choice:[
                    {
                        text:'是',
                        value:1
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:3,
                name:'ques3',
                description:'自上个月以来，你是否在没有参加体力活动时发生过胸痛?',
                choice:[
                    {
                        text:'是',
                        value:1
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:4,
                name:'ques4',
                description:'你是否曾因头晕跌倒或曾失去知觉?',
                choice:[
                    {
                        text:'是',
                        value:1
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:5,
                name:'ques5',
                description:'你是否有因体力活动变化而加重的骨或关节疾病（如腰背部、膝关节或髋部）?',
                choice:[
                    {
                        text:'是',
                        value:1
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:6,
                name:'ques6',
                description:'最近医生是否因为你的血压或心脏问题给你开药（如水剂或片剂）?',
                choice:[
                    {
                        text:'是',
                        value:1
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:7,
                name:'ques7',
                description:'你是否知道一些你不能进行体力活动的其他原因?',
                choice:[
                    {
                        text:'是',
                        value:1
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:8,
                name:'ques8',
                description:'你是否有规律运动的习惯?',
                choice:[
                    {
                        text:'是',
                        value:0
                    },{
                        text:'否',
                        value:0
                    }
                ]
            }, {
                num:9,
                name:'ques9',
                description:'你每周锻炼的频率是多少?',
                choice:[
                    {
                        text:'<=2次',
                        value:0
                    },{
                        text:'3-5次',
                        value:0
                    },{
                        text:'>=6次',
                        value:0
                    }
                ]
            }, {
                num:10,
                name:'ques10',
                description:'你每天静坐的时间大约是多久?',
                choice:[
                    {
                        text:'<=2小时',
                        value:0
                    },{
                        text:'3-5小时',
                        value:0
                    },{
                        text:'<=6小时',
                        value:0
                    }
                ]
            }
        ],
        judgement:[{
            score:[1,10],
            text:'你进行任何体力活动（包括家务劳动、运动、休闲活动）前应咨询医生，根据医生的建议方可进行相关体力活动。'
        },{
            score:[0,0],
            text:'你可以参加体力活动（包括家务劳动、运动、休闲活动），但在进行体力活动前建议接受运动健康测评，从而更好的掌握自己的体适能水平，科学合理安排运动计划。'
        }]
    };

    $scope.selectValue = {};

    $scope.$watch('curShow',function(newShow,oldShow,scope){
        //newShow更新了当前需要呈现的问题节点,每次需要将新节点显示,旧节点关闭
        if(oldShow){
            angular.element(oldShow).removeClass("on").addClass("close");
        }
        angular.element(newShow).removeClass("close").addClass("on");
    });

});


