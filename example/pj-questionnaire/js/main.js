var isLogin = 0;
var userId = 12;
var username = 'zhang';

var popLogin = {
    regist: function () {
        $('.userControl').show();
        $('#regist').show();
        $('#login').hide();

    },
    login: function () {
        $('.userControl').show();
        $('#login').show();
        $('#regist').hide();
    }
};



(function () {
    setLoginArea();

    $('.close').click(function(){
        $('.userControl').hide();
    })


}());


function setLoginArea() {
    if (isLogin) {
        //已登录
        var $frag = '<a href=\"user.html?usrId=' + userId + '\">' + username + '</a>';
        $('#welcome').append($frag);
        $('#welcome').show();


        $('#loginbar').remove();
    }
    else {
        $('#loginbar').show();
        $('#welcome').remove();
    }
}

function close(){
}
