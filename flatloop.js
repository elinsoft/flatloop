var flatloop = {};

flatloop.loop = function() {
    var argLen = arguments.length;
    var func = arguments[argLen-1];
    var funcArgLen = func.length;
    if(argLen == 2) funcArgLen = arguments[0].length;
    var it = [];
    for(var i = 0; i < funcArgLen; i++) {
        it[i] = {value:0, break:false};
    }

    // resetter 는 캐리 발생후 해당 자리를 어떤수로 초기화할 것인지를
    // 정하기 위해 it의 value 값을 복사해서 가진다.
    // 만약 인자가 주어진다면 그것을 우선으로 가진다.
    var resetter = [];
    if(argLen == 2) {
        resetter = arguments[0]; // reverse conditions order
        for(var i = 0; i < funcArgLen; i++) {
            it[i].value = (typeof(resetter[i])==='number')? resetter[i]:resetter[i][0];
        }
    }
    else {
        for(var i = 0; i < funcArgLen; i++) {
            resetter[i] = it[i].value;
        }
    }


    while(true) {
        var shouldBreak = false;
        var carryOccured = false;
        //console.log(resetter[0][1]);
        if(resetter[funcArgLen-1][1]==undefined || it[funcArgLen-1].value < resetter[funcArgLen-1][1]) {
            var result = func.apply(this, it);
            if(result == false) break;
        }
        for(var i = funcArgLen-1; i >= 0; i--) {
            if(it[i].break || (resetter[i][1] && it[i].value >= resetter[i][1])) {
                carryOccured = true;
                it[i].value = (typeof(resetter[i])==='number')? resetter[i]:resetter[i][0];
                it[i].break = false;
                // 마지막 캐리인가
                if(i > 0) it[i-1].value+=(resetter[i-1][2])?resetter[i-1][2]:1;
                else shouldBreak = true;
            }
        }
        if(shouldBreak) break;
        if(!carryOccured) it[funcArgLen-1].value +=(resetter[funcArgLen-1][2])?resetter[funcArgLen-1][2]:1;
    }
}

module.exports = flatloop;