"use strict";
import Rich from "../Rich";
import Dom from "./Dom";

let query = (function () {
    let rootDom;
    return function (queryString, useNative = false) {
        rootDom = (this === Rich) ? document : this.dom;
        rootDom = rootDom.querySelector(queryString) || null;
        return useNative ? rootDom : (rootDom && Dom(rootDom));
    }
})()
export default query;

