"use strict";
let STORAGE
let mode, tStore
localStorage.type = 'localStorage'
sessionStorage.type = 'sessionStorage'
STORAGE = {
    SESSION: 'session',
    LOCAL: 'local',
    S: (function () {
        let arg;
        let max, i;
        let k, v, t;
        return function () {
            console.log('tStore', tStore)
            arg = arguments;
            i = 0;
            max = arg.length;
            for (i; i < max; i++) {
                k = arg[i];
                i++;
                v = arg[i];
                if (v === null && tStore.key(k) > -1) tStore.removeItem(k)
                else if (i < arg.length) typeof STORAGE[k] == "function" ? STORAGE[k](v) : tStore.setItem(k, JSON.stringify(v))
                else {
                    if (typeof STORAGE[k] == "function") return STORAGE[k]()
                    else {
                        t = tStore.getItem(k);
                        return parseInt(t).toString() !== 'NaN' ? +t : JSON.parse(t)
                    }
                }
                if (i === max - 1) return STORAGE
            }
        }
    })(),
    clear: function (allClearYn) {
        if (allClearYn) {
            localStorage.clear();
            sessionStorage.clear();
        } else tStore.clear()
        return STORAGE
    }
}
Object.defineProperty(STORAGE, 'mode', {
    get: function () {
        return mode
    },
    set: function (v) {
        if (v === STORAGE['SESSION'] || v === STORAGE['LOCAL']) {
            mode = v
            tStore = v === STORAGE['SESSION'] ? sessionStorage : localStorage
        } else {
            throw new Error('올바르지않은 상수입니다.')
        }
    }
})
mode = STORAGE['LOCAL']
tStore = localStorage;
export default STORAGE;
      