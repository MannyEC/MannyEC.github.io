    var numDiv;
    var curNum;
    var work = null;
    /**
     * Created by Administrator on 2015/12/14 0014.
     */
    window.onload = function() {
        document.getElementById("start").onclick = startCount;
        document.getElementById("stop").onclick = function() {
            if(work){
                work.terminate();
            }
        }
        document.getElementById("continue").onclick = continueCount;
    }

    function startCount() {
        work = new Worker("count.js");
        showCount(0);
    }

    function continueCount(){
        work = new Worker("count.js");
        showCount(curNum);
    }

    function showCount(num){
        var numDiv = document.getElementById("number");
        work.postMessage(num);
        work.onmessage = function(e) {
            numDiv.innerHTML = e.data;
            curNum = e.data;
        }
    }



