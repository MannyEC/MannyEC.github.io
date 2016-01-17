/**
 * Created by Administrator on 2016/1/4 0004.
 */

$(document).ready(function() {

    var curShow = 0;
    var dtlMenuList = document.getElementById('dtl-menu-adult').getElementsByTagName('li');
    var dtlMenuCont = document.getElementById('detail-cont-hide-adult').getElementsByTagName('table');

    for(var i = 1;i<dtlMenuCont.length;i++){
        dtlMenuCont[i].style.display = 'none';
    }

    var showMenu = function(i) {
        dtlMenuList[i].onmouseover = function () {
            dtlMenuCont[curShow].style.display = 'none';
            dtlMenuList[curShow].removeAttribute("id","dtl-menu-selected");
            curShow = i;
            dtlMenuCont[curShow].style.display = 'table';
            dtlMenuList[curShow].setAttribute("id","dtl-menu-selected")

        }
    };
    for(var i=0;i<dtlMenuList.length;i++){
        showMenu(i);
    }

});