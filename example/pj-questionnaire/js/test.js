/**
 * Created by Administrator on 2016/1/5 0005.
 */
var score = 0;
var selected = new Array();

$(document).ready(function () {
    content = getElementsClass('content');
    testIntro = getElementsClass('test-intro');
    testContent = getElementsClass('test-cont');
    startBtn = document.getElementById('startTest');
    question = getElementsClass('question');



    content[0].appendChild(testIntro[0]);
    testContent[0].style.display = 'none';

    startBtn.onclick = function(){
        content[0].removeChild(testIntro[0]);
        testContent[0].style.display = 'block';
        showTest(0);
    }

})


function setProgress(i){
        var cur = i+1;
        var width = cur/question.length*100;
        document.getElementById('progress-bar').style.width = width+'%';
        document.getElementById('progress-value').innerHTML = cur+"/"+question.length;

}

function showTest(i){
    var selectList = question[i].getElementsByTagName('li');
    setProgress(i);
    question[i].style.display = 'block';

    var next = function(){
        question[i].style.display='none';
            showTest(i+1);
    }

    if(i<question.length-1) {
        for (var n = 0; n < selectList.length; n++) {
            selectList[n].onclick = function (e) {
                var ns = e.target.nextSibling;
                countScore(ns);
                next();
                console.log(selected);
                console.log(score);
            }
        }
    }
    else if(i==question.length-1){
        question[i].style.display = 'none';
        $('.result').html("你的最终得分为:"+score);

    }
}

function countScore(ns){
    score+=parseInt($(ns).val());
    selected.push($(ns).val());
}

function getElementsClass(classnames) {
    var classobj = new Array();
    var classint = 0;
    var tags = document.getElementsByTagName("*");
    for (var i in tags) {
        if (tags[i].nodeType == 1) {
            if (tags[i].getAttribute("class") == classnames)
            {
                classobj[classint] = tags[i];
                classint++;
            }
        }
    }
    return classobj;
}