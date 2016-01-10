/**
 * Created by Administrator on 2016/1/10 0010.
 */
$(document).ready(function () {
    $.ajax({
        url: 'xml/list.xml',
        type: 'GET',
        dataType: 'xml',
        cache: false,
        async: false,
        error: function (xml) {
            alert('XML文档加载出错');
        },
        success: function (xml) {
            setList(xml);
        }
    });
});


function setList(xml) {
    var $adultList = $(xml).find('adultList');
        var Class = $adultList.find('class');

        Class.each(function () {
            var curTitle = $(this).find('title');
            var frag = $("<table>");

            curTitle.each(function(){
                var title = $(this);
                var url = 'test.html?id=' + title.attr('docname')+"&type=adult";
                var text = title.text();
                console.log(title.attr("docname"));
                console.log(curTitle.length);
                frag.append("<tr><td><div class=\"dtl-box\"><p><a href=" + url + ">" + text + "</a></p></div></td></tr>");
            })
            frag.appendTo("#detail-cont-hide-adult");

    })
}
