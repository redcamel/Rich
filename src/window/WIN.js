"use strict"
import dispatcher from "../core/dispatcher";
import throwError from "../core/throwError";

let W, DOC;
let DOC_EL, BODY;
let WIN;
let map = {}, list = [];
WIN = {
    w: 0,
    h: 0,
    orientation: null,

    mouseX: 0,
    mouseY: 0,
    pageX: 0,
    pageY: 0,
    getByPoint: function (x, y) {
        return DOC.elementFromPoint(x, y);
    },
    scroll: (function () {
        let root;
        return function (...args) {
            W = window;
            DOC = document;
            DOC_EL = DOC.documentElement;
            BODY = document.body;
            if (!root) root = BODY.scrollHeight ? BODY : DOC;
            switch (args[0]) {
                case 'w':
                    return Math.max(root.scrollWidth, root.clientWidth);
                case 'h':
                    return Math.max(root.scrollHeight, root.clientHeight);
                case 'x':
                    return DOC_EL.scrollLeft || W.pageXOffset || 0;
                case 'y':
                    return DOC_EL.scrollTop || W.pageYOffset || 0;
            }
            W.scrollTo(args[0], args[1]);
            return WIN
        }
    })(),
    add: (function () {
        let t0;
        return (k, v) => {
            if (typeof k != 'string') throw new Error("WIN key names can only be defined as strings! : " + k)
            if (typeof v != 'function') throw new Error("WIN callback function can only be defined as function! : " + v)
            if (map[k]) {
                return throwError(`WIN : ${k} - 이미 존재하는 키값입니다.`)
                // t0 = list.indexOf(map[k])
                // if (t0 > -1) list.splice(t0, 1)
            }
            map[k] = v, list.push(v)
        }
    })(),
    get: k => map[k],
    del: (function () {
        let t0;
        return k => {
            t0 = list.indexOf(map[k])
            if (t0 > -1) list.splice(t0, 1)
            delete map[k]
        }
    })(),

    has: k => map[k] ? true : false,
    clear: (function () {
        let k;
        return v => {
            for (k in map) delete map[k]
            list.length = 0
        }
    })()
}
window.addEventListener('mousemove', function (e) {
    // TODO 정리
    WIN['mouseX'] = e.clientX;
    WIN['mouseY'] = e.clientY;
    WIN['pageX'] = e.pageX;
    WIN['pageY'] = e.pageY;
    WIN['orientation'] = WIN['w'] > WIN['h'] ? 'landscape' : 'portrait';
    // console.log(WIN.x, WIN.y)
});
window.addEventListener('resize', (function () {
    let len, i = null;
    W = window, DOC = document;
    DOC_EL = DOC.documentElement, BODY = document.body
    return function (e) {

        WIN['w'] = DOC_EL ? DOC_EL.clientWidth : BODY.clientWidth
        WIN['h'] = DOC_EL ? DOC_EL.clientHeight : BODY.clientHeight
        WIN['orientation'] = WIN['w'] > WIN['h'] ? 'landscape' : 'portrait'
        console.log('┎─resize이벤트 시작');
        len = list.length;
        for (i = 0; i < len; i++) {
            list[i](e);
        }
        console.log('┖────────────────────resize이벤트 끝끝끝~~~');
    }
})(), true)
export default WIN;

