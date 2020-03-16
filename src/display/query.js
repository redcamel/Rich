"use strict";
import Dom from "./Dom";

let query = (function () {
    let rootDom;
    return function (queryString, useNative = false) {
        rootDom = (this instanceof Dom) ? this.dom : document;
        rootDom = rootDom.querySelector(queryString) || null;
        return useNative ? rootDom : (rootDom && Dom(rootDom));
    }
})()
export default query;

