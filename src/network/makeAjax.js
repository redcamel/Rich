"use strict";
export default function makeAjax(baseOption = {}) {
    return function (url, option = {}) {
        let newOption = {};
        for (const k in baseOption) newOption[k] = baseOption[k]
        if (option['body']) newOption.body = option['body'];
        return fetch(url, newOption)
    }
}