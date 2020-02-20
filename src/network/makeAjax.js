"use strict";
export default function makeAjax(option = {}) {
    return function (url, body) {
        let newOption = {};
        for (const k in option) newOption[k] = option[k]
        if (body) newOption.body = body;
        return fetch(url, newOption)
    }
}