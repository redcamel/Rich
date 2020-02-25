"use strict";
import KEY from "../keyboard/KEY";

let LOOPER;
let tick;
let totalLoopMap = {
    beforeLoop: {keyMap: {}, list: []},
    mainLoop: {keyMap: {}, list: []},
    afterLoop: {keyMap: {}, list: []}
};
tick = function (time) {
    let i, len;
    let tList;
    tList = totalLoopMap.beforeLoop.list;
    i = 0;
    len = tList.length;
    for (i; i < len; i++) tList[i](time);
    //
    tList = totalLoopMap.mainLoop.list;
    i = 0;
    len = tList.length;
    for (i; i < len; i++) tList[i](time);
    //
    tList = totalLoopMap.afterLoop.list;
    i = 0;
    len = tList.length;
    for (i; i < len; i++) tList[i](time);
    KEY.resolve(time)
    requestAnimationFrame(tick)
};
requestAnimationFrame(tick)
let makeMethods = function (title) {
    let targetMap, targetList;
    targetMap = totalLoopMap[title].keyMap;
    targetList = totalLoopMap[title].list;
    return {
        add: function (key, handler) {
            if (typeof key != 'string') throw new Error(title + ' - key allow only sting. input value : ' + key);
            if (typeof handler != 'function') throw new Error(title + ' - handler allow only function. input value : ' + handler);
            if (targetMap[key]) throw new Error(title + ' - already defined key. input value : ' + key);
            targetMap[key] = handler;
            targetList.push(handler);
        },
        has: function (key) {
            return targetMap.hasOwnProperty(key);
        },
        get: function (key) {
            return targetMap[key]
        },
        getList: function () {
            return targetList.concat()
        },
        del: function (key) {
            let t0;
            t0 = targetList.indexOf(targetMap[key]);
            if (t0 > -1) {
                targetList.splice(t0, 1);
                delete targetMap[key]
            }
        },
        delAll: function () {
            targetMap = totalLoopMap[title].keyMap = {};
            targetList = totalLoopMap[title].list = []
        }
    }
};
let mainLoopInfo, beforeLoopInfo, afterLoopInfo;
mainLoopInfo = makeMethods('mainLoop');
beforeLoopInfo = makeMethods('beforeLoop');
afterLoopInfo = makeMethods('afterLoop');
LOOPER = {
    addBeforeLoop: beforeLoopInfo.add,
    addMainLoop: mainLoopInfo.add,
    addAfterLoop: afterLoopInfo.add,
    //
    hasBeforeLoop: beforeLoopInfo.has,
    hasMainLoop: mainLoopInfo.has,
    hasAfterLoop: afterLoopInfo.has,
    //
    getBeforeLoop: beforeLoopInfo.get,
    getMainLoop: mainLoopInfo.get,
    getAfterLoop: afterLoopInfo.get,
    //
    getBeforeLoopList: beforeLoopInfo.getList,
    getMainLoopList: mainLoopInfo.getList,
    getAfterLoopList: afterLoopInfo.getList,
    //
    delBeforeLoop: beforeLoopInfo.del,
    delMainLoop: mainLoopInfo.del,
    delAfterLoop: afterLoopInfo.del,
    //
    delBeforeLoopAll: beforeLoopInfo.delAll,
    delMainLoopAll: mainLoopInfo.delAll,
    delAfterLoopAll: afterLoopInfo.delAll,
    //
    delAll: function () {
        beforeLoopInfo.delAll();
        mainLoopInfo.delAll();
        afterLoopInfo.delAll();
    }
};
export default LOOPER;