"use strict";
import Rich from "../Rich";
import Dom from "./Dom";

let queryAll = (function () {
    let rootDom, len;
    return function (v, useNative) {
        let result;
        rootDom = (this === Rich) ? document : this.dom;
        result = rootDom.querySelectorAll(v);
        result = Array.prototype.slice.apply(result);
        len = result.length;
        if (!useNative) while (len--) result[len] = Dom(result[len]);
        return result
    }
})()
export default queryAll;

