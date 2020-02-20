"use strict"

export default function getJS(...urlList) {
    return new Promise((resolve,reject) => {
        Promise.all([...urlList].map(src => fetch(src)))
            .then(response => {
                let failRes;
                response.forEach(res => {
                    console.log(res)
                    if (res.ok === false) failRes = res;
                });
                if (failRes) {
                    reject(failRes);
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