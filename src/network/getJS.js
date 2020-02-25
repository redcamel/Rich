"use strict"

export default function getJS(...urlList) {
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
                    Promise.all(response.map(res => {
                        return res.text().then(source => {
                            let t0 = document.createElement('script');
                            t0.innerHTML = source;
                            document.head.appendChild(t0)
                        })
                    })).then(_ => {
                        resolve(response)
                    })
                }
            })

    })
}