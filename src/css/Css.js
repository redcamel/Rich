"use strict";
import DETECTOR from "../ditector/DETECTOR";

let Css;
let CssCls;
let style, sheet, rullSet;
let UU_TABLE, UUID;
let fn;
let getIndex;
let temp;
UU_TABLE = {}, UUID = 0;
style = document.createElement('style');
document.head.appendChild(style);
sheet = style.sheet || style.stylesheet;
rullSet = sheet.cssRules;
CssCls = function (k) {
    this.__key = k;
    if (!UU_TABLE[k]) {
        try {
            sheet.insertRule(k + '{}', UUID);
            this.rull = rullSet[UUID].style
        } catch (e) {
            this.__noHasBrowser = true
        }
    }
};
getIndex = function (k) {
    let i = sheet.cssRules.length;
    let result;
    while (i--) {
        if (sheet.cssRules[i].selectorText == k) {
            result = i;
            break
        }
    }
    return result
},
    //////////////////////////////////
    // 프로토타입 정의
    fn = CssCls.prototype;
// 외부 유출용 프로토타입 정의
CssCls.fn = fn;
fn.S = (function () {
    let isIE9 = DETECTOR.browser == 'ie' && DETECTOR.browserVer < 10;
    let exp = /-([a-z])/gi;
    let noPx = {'opacity': 1, 'z-index': 1, 'zIndex': 1};
    let regFunc = function (match, char, index, str) {
        return char.toUpperCase();
    };
    if (isIE9) {
        return function () {
            let arg = arguments;
            let max, i;
            let k, v, tS;
            i = 0, max = arg.length;
            tS = this.rull;
            for (i; i < max; i++) {
                k = arg[i], i++, v = arg[i];
                k = k.replace(exp, regFunc);
                if (i < arg.length) {
                    typeof this[k] == "function" ? this[k](v) :
                        typeof v == "number" ? tS[k] = noPx[k] ? v : (v + "px") : tS[k] = v
                } else {
                    return typeof this[k] == "function" ? this[k]() : isNaN(parseFloat(tS[k])) ? tS[k] : (tS[k].indexOf('px') > -1) ? parseFloat(tS[k]) : tS[k]
                }
                if (i == max - 1) return this
            }
        }
    } else {
        return function () {
            let arg = arguments;
            let max, i;
            let k, v, tS;
            i = 0, max = arg.length;
            tS = this.rull;
            for (i; i < max; i++) {
                k = arg[i], i++, v = arg[i];
                if (i < arg.length) {
                    typeof this[k] == "function" ? this[k](v) :
                        typeof v == "number" ? tS[k] = noPx[k] ? v : (v + "px") : tS[k] = v
                } else {
                    return typeof this[k] == "function" ? this[k]() : isNaN(parseFloat(tS[k])) ? tS[k] : (tS[k].indexOf('px') > -1) ? parseFloat(tS[k]) : tS[k]
                }
                if (i == max - 1) return this
            }
        }
    }
})();
fn.remove = function () {
    sheet.deleteRule(getIndex(this.__key));
    delete UU_TABLE[this.__key];
    UUID--
};
Css = function (key) {
    if (!UU_TABLE[key]) {
        temp = new CssCls(key);
        if (!temp.__noHasBrowser) UU_TABLE[key] = temp, UUID++
    }
    return UU_TABLE[key]
};
export default Css;