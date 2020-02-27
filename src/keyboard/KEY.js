"use strict";

var KEY = {
    downList: {},
    upList: {},
    code2name: {},
    name2code: {}
}
var i, j, k, v;
var t1;
t1 = 'a,65,b,66,c,67,d,68,e,69,f,70,g,71,h,72,i,73,j,74,k,75,l,76,m,77,n,78,o,79,p,80,q,81,r,82,s,83,t,84,u,85,v,86,w,87,x,88,y,89,z,90,'
    + 'back,8,tab,9,enter,13,shift,16,control,17,alt,18,pause,19,caps,20,esc,27,space,32,'
    + 'pageUp,33,pageDown,34,end,35,home,36,left,37,up,38,right,39,down,40,insert,45,delete,46,numLock,144,scrollLock,145,'
    + '0,48,1,49,2,50,3,51,4,52,5,53,6,54,7,55,8,56,9,57,'
    + 'numPad0,96,numPad1,97,numPad2,98,numPad3,99,numPad4,100,numPad5,101,numPad6,102,numPad7,103,numPad8,104,numPad9,105,'
    + 'numPad*,106,numPad+,107,numPad-,109,numPad.,110,numPad/,111'
t1 = t1.split(',');
t1.push(';', 186)
t1.push('=', 187)
t1.push(',', 188)
t1.push('-', 189)
t1.push('.', 190)
t1.push('/', 191)
t1.push('`', 192)
t1.push('[', 219)
t1.push(']', 221)
t1.push("'", 222)
t1.push('\\', 220)
t1.push('altRight', 21)
t1.push('controlRight', 25)
t1.push('window', 91)
t1.push('windowRight', 92)
i = 0, j = t1.length;
while (i < j) k = t1[i++], v = parseInt(t1[i++]), KEY.name2code[k] = v, KEY.code2name[v] = k;
document.addEventListener('keydown',
    function (e) {
        KEY.code2name[e.keyCode] ? KEY.downList[KEY.code2name[e.keyCode]] = 1 : 0
    }
)
document.addEventListener('keyup',
    function (e) {
        if (KEY.code2name[e.keyCode]) delete KEY.downList[KEY.code2name[e.keyCode]], KEY.upList[KEY.code2name[e.keyCode]] = 1
    }
)
KEY.resolve = function () {
    for (var k in KEY.upList) delete KEY.upList[k]
}
export default KEY