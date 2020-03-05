"use strict"

export default function getJS(...urlList) {
    return new Promise((resolve, reject) => {
        let i = -1;
        let MAX = urlList.length;
        let callNext = function () {
            i++;
            if (i === MAX) {
                resolve()
            } else {
                let t0 = document.createElement('script');
                t0.type = 'text/javascript'
                t0.src = urlList[i]
                t0.onload = callNext;
                t0.onerror = reject
                document.head.appendChild(t0)
            }
        }
        callNext()
        // urlList.forEach(src=>{
        //     let t0 = document.createElement('script');
        //     t0.src = src
        //     document.head.appendChild(t0)
        // })

        // let failRes;
        // Promise.all([...urlList].map(src => fetch(src)))
        //     .then(response => {
        //         response.forEach(res => {
        //             if (res.ok === false) failRes = res;
        //         });
        //         if (failRes) {
        //             if (reject) reject(failRes);
        //         } else {
        //             let result = []
        //             Promise.all(response.map((res, index) => {
        //                 return res.text().then(source => {
        //                     let t0 = document.createElement('script');
        //                     t0.setAttribute('targetSRC', res.url)
        //                     t0.innerHTML = source;
        //                     result[index] = t0
        //
        //                 })
        //             })).then(_ => {
        //                 result.forEach(v => document.head.appendChild(v))
        //                 resolve(response)
        //             })
        //         }
        //     })

    })
}