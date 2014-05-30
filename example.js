var flatloop = require('./flatloop');

/**
* Example 1 : Simple Multiple Nested Loop
*/

//Multiple Nested Loop (old style)
for(var x=0; x<5; x+= 1) {
    for(var y=0; y<12; y+=2) {
        for(var z=5; z<11; z+=2) {
            console.log('x=' + x + ' y=' + y + ' z=' + z);
        }
    }
}

//Now you can flatten it like this
var a = [0, 5, 1]; //start, limit, step
var b = [0, 12, 2];
var c = [5, 11, 2];

flatloop.loop([a,b,c], function(x, y, z) {
    console.log('x=' + x.value + ' y=' + y.value + ' z='+ z.value);
});

/**
* Example 2 : Dynamic Nested Loop
* You can make nested loop the depth of which is dynamically created
*/

var loopDepth = 5;  //simulate dynamic depth to 5
var loopConds = []; //conditions for each loop
for(var depth = 0; depth < loopDepth; depth++ ) {
    loopConds.push([0, 5, 1]); //start, limit, step
}

flatloop.loop(loopConds, function() {
    //You can access to the produced objects with arguments[index]
    var output = '';
    for(var idx = 0; idx < arguments.length; idx ++) {
        output += arguments[idx].value + ' ';
    }
    console.log(output);
});

/**
* Example 3 : Omit step
* If you omit the step value, then it would be 1
*/

flatloop.loop([[0,5],[0,6],[0,7]], function(x,y,z) {
    console.log('x=' + x.value + ' y=' + y.value + ' z='+ z.value);
});

/**
* Example 4 : Break a loop
* If you want to break a loop in some condition, do it as follow.
*/

flatloop.loop([[0,5],[0,6],[0,7]], function(x,y,z) {
    if(y.value == z.value) return z.break = true; //when x.value is equal to y.value, then break the third loop
    console.log('x=' + x.value + ' y=' + y.value + ' z='+ z.value);
});

/**
* Example 5 : Break whole loop
*/

flatloop.loop([[0,5],[0,6],[0,7]], function(x,y,z) {
    if(y.value == 2) return false; //break whole loop and stop immediately
    console.log('x=' + x.value + ' y=' + y.value + ' z='+ z.value);
});
