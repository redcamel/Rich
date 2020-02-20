"use strict";
Rich.init().then(_ => {
    let containerRoot;
    let containerCurrentState, containerStatePass, containerStateFail, containerStateDuration;
    const testList = [
        {
            title: 'Test - Rich.Dom',
            url: 'display/TestBdd_Dom.html'
        },
        {
            title: 'Test - Test Dom Events',
            url: 'display/TestDomEvents.html',
            type: 'visual'
        },
        {
            title: 'Test - Test Container Method',
            url: 'display/TestContainerMethod.html',
            type: 'visual'
        },
        {
            title: 'Test - Rich.Css',
            url: 'css/TestBDD_Css.html'
        }
    ]
    const IFRAME_LIST = []
    containerRoot = Rich.Dom('div').S(
        '>', containerCurrentState = Rich.Dom('div').S(
            '@className', 'containerCurrentState',
            'html', 'Total Test Page : ' + testList.length,
            '>', containerStatePass = Rich.Dom('div').S('@className', 'pass'),
            '>', containerStateFail = Rich.Dom('div').S('@className', 'fail'),
            '>', containerStateDuration = Rich.Dom('div').S('@className', 'duration')
        ),
        '<', 'body'
    );
    let tick = function () { 

        let pass = 0;
        let fail = 0;
        let duration = 0
        IFRAME_LIST.forEach(v => {
            let t0;
            t0 = v.dom.contentWindow.document.querySelector('.passes em');
            if (t0) pass += +t0.textContent
            t0 = v.dom.contentWindow.document.querySelector('.failures em');
            if (t0) fail += +t0.textContent
            t0 = v.dom.contentWindow.document.querySelector('.duration em');
            if (t0) duration += +t0.textContent

        })
        containerStatePass.S('html', 'Passed : ' + pass);
        containerStateFail.S('html', 'Fail : ' + fail);
        containerStateDuration.S('html', 'Total duration : ' + duration + 's');
        requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)


    testList.forEach(v => {
        let t0;
        Rich.Dom('div').S(
            '@className', 'itemContainer',
            '>', Rich.Dom('div').S(
                '@className', 'title',
                'down', e => {
                    location.href = v['url']
                },
                'html', v['title'],
                '>', Rich.Dom('div').S(
                    '@className', 'type',
                    'display', v['type'] === 'visual' ? 'block' : 'none',
                    'html', 'Visual Test'
                )
            ),
            '>', t0 = Rich.Dom('iframe').S(
                '@src', v['url']
            ),
            '<', containerRoot
        )
        if (v['type'] != 'visual') IFRAME_LIST.push(t0)

    })
})
