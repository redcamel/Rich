"use strict"

export default function getCSS(...urlList) {
    return new Promise((resolve, reject) => {
        let failRes;
        Promise.all([...urlList].map(src => fetch(src)))
            .then(response => {
                response.forEach(res => {
                    if (res.ok === false) failRes = res;
                });
                if (failRes) {
                    if(reject) reject(failRes);
                } else {
                    let result = []
                    Promise.all(response.map((res,index) => {
                        return res.text().then(source => {
                            let t0 = document.createElement('style');
                            t0.setAttribute('media','all')
                            t0.innerHTML = source;
                            result[index] = t0
                        })
                    })).then(_ => {
                        result.forEach(v => document.head.appendChild(v))
                        resolve(response)
                    })
                }
            })

    })
}