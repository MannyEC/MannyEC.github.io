/**
 * Created by Administrator on 2016/1/17 0017.
 */
$(function(){
    $("div.holder").jPages({
        containerID : "itemContainer",
        perPage:8,
        startPage:1,
        startRange:1,
        mindRange:1,
        endRange:1
    });
});