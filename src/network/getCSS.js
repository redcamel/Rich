"use strict"

export default function getCSS(...urlList) {
    return new Promise((resolve, reject) => {
        let startTime = performance.now();
        let checkedNum = 0;
        let check, makeScriptNode;
        let successInfo = []
        let resolveFunction = function () {
            console.log(resolve)
            if (resolve) resolve({ok: true, urlList: urlList, successInfo: successInfo})
        }
        let rejectFunction = function (e) {
            if (reject) reject({
                ok: false,
                failInfo: {src: urlList[checkedNum], eventType: e['type'], time: performance.now() - startTime},
                urlList: urlList,
                successInfo: successInfo
            })
        }
        check = function (e) {
            successInfo.push({src: urlList[checkedNum], eventType: e['type'], time: performance.now() - startTime})
            checkedNum++
            if (urlList[checkedNum]) makeScriptNode(urlList[checkedNum])
            else resolveFunction()
        }
        makeScriptNode = function (src) {
            console.log('jsLoaded :', src)
            let t0;
            let HEAD = document.head
            t0 = document.createElement('link');
            t0.rel = 'stylesheet'
            t0.href = src;
            t0.onload = check;
            t0.onerror = rejectFunction;
            t0.src = src, HEAD.appendChild(t0)
        }
        if (urlList.length) makeScriptNode(urlList[checkedNum])
        else resolveFunction()
    })
}