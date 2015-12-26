/**
 * Created by Administrator on 2015/12/14 0014.
 */
    var num = 0;

    onmessage = function(e){
        num = e.data;
        count();
    }
    function count(){
        postMessage(num);
        num++;
        setTimeout(count,1000);
    }

