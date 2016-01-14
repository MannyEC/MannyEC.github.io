/**
 * Created by Administrator on 2016/1/10 0010.
 */

$(document).ready(function () {
    var Request = undefined;
    Request = GetRequest();
    var id = Request["id"];
    var type =Request["type"];

    var url = 'xml/' +type+'/'+ id + '.xml';
    console.log(url)
    $.ajax({
            url: url,
            type: 'GET',
            dataType: 'xml',
            cache: false,
            async: false,
            error: function (xml) {
                alert('XML文档加载出错');
            },
            success: function (xml) {
                setTest(xml);


            }
        });


});
function setTest(xml){
    var title = $(xml).find('quartine').attr('name');
    var intro = $(xml).find('question[category=text]').attr('text');
    var questionList = $(xml).find('question[category!=text]');

    $('.test-title h1').html(title);
    $('.test-intro p').html(intro);


    questionList.each(function(){
        var quesfrag = $("<div>");
        var answfrag = $("<div>");
        var answfragUL = $("<ul>");
        var curQuestion = $(this);

        quesfrag.addClass('question');
        answfrag.addClass('answer');
        //每一问
        var ques = curQuestion.attr('text');
        quesfrag.append("<p>"+ques+"</p>");

        curQuestion.find('answer').each(function(){
            var frag = $("<li>");
            var select = $(this).attr('text');
            var value = $(this).attr('value');
            frag.append('<a href=\"javascript:;\">'+select+'</a>');
            frag.append('<input type=\"hidden\" value='+ value +' name=\"answer\">');
            answfragUL.append(frag);
        })
        answfrag.append(answfragUL);
        quesfrag.append(answfrag);
        quesfrag.appendTo('.test-cont');
    });
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
