/**
 * Created by Administrator on 2016/1/15 0015.
 */

var _cur = null;
var _chosen = initialize();
var _status = 0;

var correctAnswer ={
        0:'developing',
        1:'average',
        2:'dramatically',
        3:'results',
        4:'shared',
        5:'basis',
        6:'monitor',
        7:'including',
        8:'detection',
        9:'symptoms'
}

$(document).ready(function () {
    var $fillin = $('.fillin');
    var $li = $('.tab li');
    var $explainSec = $('.explain section');

    $fillin.click(function (e) {
        _cur = $fillin.index(this);
        var curblock = $fillin.eq(_cur);
        var curli = $li.eq(_cur);
        var curSec = $explainSec.eq(_cur);

        if (_chosen[_cur] == null && _status==0) {
            setContentSelect(curblock);
            setTabSelect(curli);
        }
        else if(_chosen[_cur]!=null && _status==0)  {
            setContentSelect(curblock);
            setTabSelect(curli);

        }
        else if(_status==1){
            addTabSpan(curli);
            setExplain(curSec);

        }
    })

    $li.click(function (e) {
        _cur = $li.index(this);
        var curblock = $fillin.eq(_cur);
        var curli = $li.eq(_cur);
        var curSec = $explainSec.eq(_cur);

        if (_chosen[_cur] == null&& _status==0) {
            setContentSelect(curblock);
            setTabSelect(curli);
        }
        else if(_chosen[_cur]!=null && _status==0) {
            setContentSelect(curblock);
            setTabSelect(curli);
        }

        else if(_status==1) {
            addTabSpan(curli);
            setExplain(curSec);

        }
    })


    $('.selection th').click(function (e) {
        var words = $(this).html();
        console.log(words);

        if (_cur != null&& _status==0) {
            var originWord = _chosen[_cur];
            $('span.fillin.selected').removeClass('selected');
            $('.fillin').eq(_cur).css('color','#3295FF');

            _chosen[_cur] = words;


            if(!isUsed(originWord))
            {
                removeDelete(originWord)
            }
            $(this).css('text-decoration', 'line-through');

            _cur = null;
        }

        else {
            console.log('kongclick')
        }
    })

    $('.selection th').hover(function (e) {
        var words = $(this).html();

        if (_cur != null&& _status==0) {
            updateBlock(words);
            $('.fillin').eq(_cur).css('color','#fff');
        }
        else {
            console.log('kongclick')
        }
    })

    $('#submit').click(function(){
        $(this).hide();
        $('.report').show();
        var accuracy = calculate();
        $('#accuracy').text(accuracy);
        displayResult();



    });


    $('.btn-set:first').click(function(){
        $('.report').hide();
        $('.selection').hide();
        $('section:first').show();
        _status=1;
        _cur=0;
    })




});

function initialize() {
    var chosen = {};
    $('.fillin').each(function (i) {
        chosen[i] = null;
    });
    return chosen
}


function setContentSelect(curblock) {
    $('span.fillin.selected').removeClass('selected');
    curblock.addClass('selected');
}

function setTabSelect(curli) {

    addTabSpan(curli);

    curli.addClass('tab select').siblings().removeClass('tab select');

}

function addTabSpan(curli){
    var $span = $('<span class=\"triangle\"></span>');
    $('.tab li').find('span').remove();
    curli.append($span);

}

function setExplain(curSec){
    curSec.show();
    curSec.siblings().hide();
}

function updateBlock(words) {
    $('.fillin').eq(_cur).text(words);

}

function isUsed(word) {
    var len = Object.keys(_chosen).length;

    for (var i = len- 1; i >= 0; i--) {
        if (_chosen[i] == word) {
            return 1;
        }
    }
    return 0;
}
function removeDelete(word) {
    $('.selection th').each(function () {
        if ($(this).html()== word) {
            $(this).css('text-decoration', 'none');
        }
    })
}

function calculate(){
    var accuracy = 0;
    var len = 10;
    var right = 0;

    $.each(_chosen,function(i){
        if(_chosen[i]==correctAnswer[i]){
            right+=1;
        }
    });
    accuracy = right/len*100;

    return accuracy+'%'
}


function displayResult(){
    $('span.fillin.selected').removeClass('selected');
    $('.tab .select').removeClass('select');
    $('.tab li').find('span').remove();



    $.each(_chosen,function(i){
        var $curFillin = $('.fillin').eq(i);
        var $curRepLi = $('.rep-detail li').eq(i);
        var $curli = $('.tab li').eq(i);

        if(_chosen[i]==correctAnswer[i]){
            $curRepLi.css('color','#47CE65');
            $curli.addClass('tab-correct');
            $curFillin.addClass('correct');


        }
        else if(_chosen[i]==null){
            var $span = $('<span class=\"show-right\">'+correctAnswer[i]+'</span>');
            $curRepLi.css('color','#dc143c');

            $curli.addClass('tab-wrong');


            $curFillin.text('———');
            $curFillin.addClass('vacant');
            $curFillin.after($span);
        }
        else {
            $curRepLi.css('color','#dc143c');

            $curli.addClass('tab-wrong');

            $curFillin.addClass('wrong');
            var $span = $('<span class=\"show-right\">'+correctAnswer[i]+'</span>');
            $curFillin.after($span);

        }



    });





}