"use strict";
export default function makeAjax(baseOption = {}) {
    return function (url, option = {}) {
        let newOption = {};
        for (let k in baseOption) newOption[k] = baseOption[k]
        for (let k in option) newOption[k] = option[k]
        return fetch(url, newOption)
    }
}