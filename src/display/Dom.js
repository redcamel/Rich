"use strict";
import DETECTOR from "../ditector/DETECTOR";
import ClassUUID from "../core/ClassUUID";
import query from "./query";
import queryAll from "./queryAll";

let UUID_TABLE;
let Dom, DomCls, fn;
UUID_TABLE = {},
    //////////////////////////////////
    // 실제 클래스
    DomCls = class extends ClassUUID {
        constructor(k) {
            super();
            (this.dom = k).__uuid = this._uuid;
            UUID_TABLE[this.dom.__uuid] = this;
            this.dom.dataset ? 0 : this.dom.dataset = {}
        }
    },
    //////////////////////////////////
    // 클래스 팩토리
    Dom = (function () {
        let result, t;
        return function (k) {
            if (k === 'body') k = document.body;
            if (k instanceof Element) result = UUID_TABLE[k.__uuid] ? UUID_TABLE[k.__uuid] : new DomCls(k);
            else if (k = k.trim(), k.charAt(0) === "<") {
                t = document.createElement("div"),
                    t.innerHTML = k,
                    result = new DomCls(t.childNodes[0]);
                t = null;
            } else if (k.charAt(0) === "#") {
                t = document.getElementById(k = k.substr(1, k.length - 1));
                if (t && UUID_TABLE[t.__uuid]) result = UUID_TABLE[t.__uuid];
                else if (t) result = new DomCls(t);
                else result = null
            } else result = new DomCls(document.createElement(k));
            return result;
        }
    })(),
    //////////////////////////////////
    // 프로토타입 정의
    fn = DomCls.prototype,
    // 외부 유출용 프로토타입 정의
    Dom.fn = fn,
    //////////////////////////////////
    // fn정의
    fn.S = (function () {
        let noPx = {'opacity': 1, 'z-index': 1, 'zIndex': 1};
        return function () {
            let arg = arguments;
            let max, i;
            let k, v, isAttr, tS, tD;
            k = DETECTOR[k] ? DETECTOR[k] : k, //모바일 터치이벤트 체크
                i = 0, max = arg.length,
                tD = this.dom,
                tS = tD.style;
            for (i; i < max; i++) {
                k = arg[i],
                    isAttr = false,
                    k.charAt(0) === "@" ? (isAttr = true, k = k.substr(1, k.length - 1)) : 0,
                    i++, v = arg[i];
                if (v === null) {
                    typeof this[k] === "function" ? this[k](v) :
                        isAttr ? tD.removeAttribute(k) : tS[k] = ""
                } else if (i < arg.length) {
                    typeof this[k] === "function" ? this[k](v) :
                        isAttr ? tD.setAttribute(k, v) : typeof v === "number" ? tS[k] = noPx[k] ? v : (v + "px") : tS[k] = v
                } else {
                    return typeof this[k] === "function" ? this[k]() :
                        isAttr ? tD.getAttribute(k) : isNaN(parseFloat(tS[k])) ? tS[k] : (tS[k].indexOf('px') > -1) ? parseFloat(tS[k]) : tS[k]
                }
                if (i === max - 1) return this
            }
        }
    })(),
    //////////////////////////////////
    // method 기술하자.
    fn['query'] = query,
    fn['queryAll'] = queryAll,
    fn['className'] = function (v) {
        if (v === null) return this.dom.removeAttribute('class');
        else return v !== undefined ? this.dom.className = v : this.dom.hasAttribute('class') ? this.dom.className : null
    },
    fn['className+'] = (function () {
        let arg, i, t;
        return function (v) {
            arg = v.split(' '), i = arg.length;
            while (i--) t = arg[i], ~this.dom.className.indexOf(t) ? 0 : this.dom.className += (' ' + t);
            return this.dom.className;
        }
    })(),
    fn['className-'] = (function () {
        let arg, i, t;
        return function (v) {
            arg = v.split(' '), i = arg.length;
            while (i--) t = arg[i], ~this.dom.className.indexOf(t) ? this.dom.className = this.dom.className.replace(t, '') : 0;
            return this.dom.className = this.dom.className.replace(/ +/g, ' ').trim()
        }
    })(),
    fn['+html'] = function (v) {
        return v !== undefined ? this.dom.innerHTML = v + this.dom.innerHTML : this.dom.innerHTML
    },
    fn['html'] = function (v) {
        return v !== undefined ? this.dom.innerHTML = v : this.dom.innerHTML
    }, // set-null 일때 set-'' 과 동일하게 처리
    fn['html+'] = function (v) {
        return v !== undefined ? this.dom.innerHTML += v : this.dom.innerHTML
    },
    fn['+text'] = function (v) {
        return v !== undefined ? this.dom.textContent = v + this.dom.textContent : this.dom.textContent
    },
    fn['text'] = function (v) {
        return v !== undefined ? this.dom.textContent = v : this.dom.textContent
    }, // set-null 일때 set-'' 과 동일하게 처리
    fn['text+'] = function (v) {
        return v !== undefined ? this.dom.textContent += v : this.dom.textContent
    },
    fn['value'] = function (v) {
        return v !== undefined ? this.dom.value = v : this.dom.value
    },
    fn['parent'] = fn['<'] = function (v) {
        v = v === 'body' ? document.body : v instanceof DomCls ? v.dom : v;
        if (v === undefined) return this.dom.parentNode ? Dom(this.dom.parentNode) : this.dom.parentNode;
        else v.appendChild(this.dom)
    },
    fn['remove'] = function () {
        if (this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
        return this
    },
    fn['addChild'] = fn['>'] = function (v) {
        this.dom.appendChild(v instanceof DomCls ? v.dom : v);
    },
    fn['addChildAt'] = function (index, v) {
        let refChild = this.dom.children[index];
        if (refChild) this.dom.insertBefore(v instanceof DomCls ? v.dom : v, refChild);
        else this.dom.appendChild(v instanceof DomCls ? v.dom : v);
    },
    fn['removeChild'] = function (v) {
        this.dom.removeChild(v instanceof DomCls ? v.dom : v);
    },
    fn['removeChildAt'] = function (index) {
        if (this.dom.children[index]) {
            this.dom.removeChild(this.dom.children[index])
        }
    },
    fn['getChildAt'] = function (index) {
        let t;
        return (t = this.dom.children[index]) ? Dom(t) : null
    },
    fn['getChildNum'] = function () {
        return this.dom.children.length
    },
    fn['getChildIndex'] = function (v) {
        return Array.prototype.indexOf.call(this.dom.children, v.dom ? v.dom : v)
    },
    fn['getSelfIndex'] = function () {
        return Array.prototype.indexOf.call(this.dom.parentNode.children, this.dom)
    };
///////////////////////////////////////////////////////////////////////////////////
(function () {
    let keys, realKeys;
    let lX, lY, realX, realY, preventKey;
    let evtUUID, event_UUID_TABLE;
    let i;
    let preventKeyFunc;
    evtUUID = 0,
        event_UUID_TABLE = {},
        // 디텍팅과 관련된 녀석들
        // 디덱팅과 관련없는 녀석들은 여기서 허용함
        // mouse event
        keys = 'over,out,down,up,move,click,dblclick,wheel'.split(','),
        // TODO - safari not surpport 'wheel',
        // keyboard event
        keys.push('keydown', 'keyup', 'keypress'),
        // element event
        keys.push('blur', 'change', 'contextmenu', 'focus', 'input', 'invalid', 'reset', 'select', 'submit', 'search'),
        // TODO - safari not surpport 'invalid',
        // TODO - ie, firefox not surpport 'search',
        // drag event
        keys.push('drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll'),
        realKeys = {},
        i = keys.length,
        preventKeyFunc = function (v) {
            v[preventKey]()
        },
        // lX = (DETECTOR.browser === 'ie' && DETECTOR.browserVer < 10) ? 'offsetX' : 'layerX',
        // lY = (DETECTOR.browser === 'ie' && DETECTOR.browserVer < 10) ? 'offsetY' : 'layerY',
        // realX = (DETECTOR.browser === 'firefox') ? 'pageX' : 'x',
        // realY = (DETECTOR.browser === 'firefox') ? 'pageY' : 'y',
        preventKey = (DETECTOR.browser === 'ie') ? 'preventDefault' : 'stopPropagation';
    i = keys.length;
    while (i--) {
        (function () {
            let eventKey = keys[i];
            let tDomUUID;
            realKeys[eventKey] = DETECTOR[eventKey] ? DETECTOR[eventKey] : eventKey;
            fn[eventKey] = function (handler) {
                tDomUUID = this.dom.__uuid;
                if (handler === null) {
                    if (event_UUID_TABLE[tDomUUID]) {
                        this.dom.removeEventListener(realKeys[eventKey], event_UUID_TABLE[tDomUUID][realKeys[eventKey]], true);
                        event_UUID_TABLE[tDomUUID][realKeys[eventKey]] = undefined
                    }
                } else {
                    if (handler) {
                        // 기존에 등록된 이벤트는 무조건 삭제
                        if (event_UUID_TABLE[tDomUUID]) {
                            this.dom.removeEventListener(realKeys[eventKey], event_UUID_TABLE[tDomUUID][realKeys[eventKey]], true);
                            event_UUID_TABLE[tDomUUID][realKeys[eventKey]] = undefined
                        }
                        //console.log(event_UUID_TABLE)
                        if (!event_UUID_TABLE[tDomUUID]) event_UUID_TABLE[tDomUUID] = {};
                        event_UUID_TABLE[tDomUUID][realKeys[eventKey]] = function (e) {
                            handler.call(UUID_TABLE[this.__uuid], {
                                type: eventKey,
                                target: e.target,
                                // x: e[realX], y: e[realY],
                                // deltaX: e.deltaX, deltaY: e.deltaY,
                                // localX: e[lX], localY: e[lY],
                                prevent: preventKeyFunc,
                                nativeEvent: e,
                                uuid: evtUUID++
                            })
                        };
                        event_UUID_TABLE[tDomUUID][realKeys[eventKey]].originHandler = handler;
                        this.dom.addEventListener(realKeys[eventKey], event_UUID_TABLE[tDomUUID][realKeys[eventKey]], true)
                    } else {
                        // 기존에 등록된 이벤트가 있으면 리턴
                        return event_UUID_TABLE[tDomUUID][realKeys[eventKey]]
                    }
                }
            }
        })()
    }
})();
export default Dom;