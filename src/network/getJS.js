"use strict"

export default function getJS(...urlList) {
    return new Promise((resolve, reject) => {
        let failRes;
        Promise.all([...urlList].map(src => fetch(src,{method : 'GET'})))
            .then(response => {
                response.forEach(res => {
                    if (res.ok === false) failRes = res;
                });
                if (failRes) {
                    if (reject) reject(failRes);
                } else {
                    let result = []
                    Promise.all(response.map((res, index) => {
                        return res.text().then(source => {
                            let t0 = document.createElement('script');
                            t0.setAttribute('targetSRC', res.url)
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