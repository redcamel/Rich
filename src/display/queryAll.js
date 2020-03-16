"use strict";
import Dom from "./Dom";

let queryAll = (function () {
    let rootDom, len;
    return function (v, useNative) {
        let result;
        rootDom = (this instanceof Dom) ? this.dom : document;
        result = rootDom.querySelectorAll(v);
        result = Array.prototype.slice.apply(result);
        len = result.length;
        if (!useNative) while (len--) result[len] = Dom(result[len]);
        return result
    }
})()
export default queryAll;

