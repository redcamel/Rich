"use strict"
import DETECTOR from "../ditector/DETECTOR";
import KEY from "../keyboard/KEY";


let dispatcher
dispatcher = function (target, type, keyName, bubble, cancelAble) {
    let t0
    target = target === 'body' ? document.body : target
    target = target === document || target instanceof Element ? target : target.dom
    if (DETECTOR[type]) {
        // 마우스이벤트들
        t0 = document.createEvent('MouseEvents')
        t0.initMouseEvent(
            DETECTOR[type], // type
            bubble,
            cancelAble,
            target.ownerDocument.defaultView, // view
            1,// detail
            0,//screenX,
            0,//screenY,
            0,//clientX,
            0,//clientY,
            false, //ctrlKey,
            false, //altKey,
            false, //shiftKey,
            false, //.metaKey,
            0, //button 0 = left, 1 = middle, 2 = right
            null // relatedTarget
        )
    } else if (type === 'keydown' || type === 'keyup' || type === 'keypress') {
        keyName = keyName.toLowerCase()
        t0 = document.createEvent("Event")
        t0.initEvent(type, bubble, cancelAble)
        t0.keyCode = t0.which = KEY.name2code[keyName]
        t0.key = keyName
    } else {
        // 커스텀이벤트
        t0 = document.createEvent('Event');
        t0.initEvent(type, bubble, cancelAble);
    }
    target.dispatchEvent(t0);
}
export default dispatcher

