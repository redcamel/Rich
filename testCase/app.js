"use strict";
Rich.init('asset/css.css').then(function () {
    {
        var containerRoot;
        var containerCurrentState, containerStatePass, containerStateFail, containerStateDuration;
        const testList = [
            {
                title: 'Test - Main',
                url: 'main/TestBDD_Main.html?testParams=1&testParams2=test'
            },
            {
                title: 'Test - Rich.dispatcher',
                url: 'main/TestBDD_dispatcher.html'
            },
            {
                title: 'Test - Rich.defineProperty',
                url: 'core/TestBDD_defineProperty.html'
            },
            {
                title: 'Test - Rich.defineProperty : NUMBER',
                url: 'core/TestBDD_NUMBER.html',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : INT',
                url: 'core/TestBDD_INT.html',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : UINT',
                url: 'core/TestBDD_UINT.html',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : STRING',
                url: 'core/TestBDD_STRING.html',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : BOOLEAN',
                url: 'core/TestBDD_BOOLEAN.html',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.Dom',
                url: 'display/TestBdd_Dom.html'
            },
            {
                title: 'Test - Rich.Css',
                url: 'css/TestBDD_Css.html'
            },
            {
                title: 'Test - Rich.DETECTOR',
                url: 'detector/Test_DETECTOR.html',
                banner: 'Visual'
            },
            {
                title: 'Test - Test Dom Events',
                url: 'display/TestDomEvents.html',
                banner: 'Visual'
            },
            {
                title: 'Test - Test Container Method',
                url: 'display/TestContainerMethod.html',
                banner: 'Visual'
            },
            {
                title: 'Test - Rich.LOOPER',
                url: 'looper/TestBDD_LOOPER.html'
            },
            {
                title: 'Test - Rich.KEY',
                url: 'keyboard/TestBDD_KEY.html',
                banner: 'Visual'
            },
            {
                title: 'Test - Rich.WIN',
                url: 'window/TestBDD_WIN.html',
                banner: 'Visual'
            },
            {
                title: 'Test - Rich.STORAGE',
                url: 'storage/TestBDD_STORAGE.html'
            }
        ]
        const IFRAME_LIST = []
        containerRoot = Rich.Dom('div').S(
            '>', Rich.Dom('div').S(
                '@className', 'containerCurrentState',
                '>', containerCurrentState = Rich.Dom('div'),
                '>', Rich.Dom('div').S(
                    'line-height', 18,
                    '>', containerStatePass = Rich.Dom('div').S('@className', 'pass'),
                    '>', containerStateFail = Rich.Dom('div').S('@className', 'fail'),
                    '>', containerStateDuration = Rich.Dom('div').S('@className', 'duration')
                )
            ),
            '<', 'body'
        );
        var tick = function () {
            var pass = 0;
            var fail = 0;
            var duration = 0
            IFRAME_LIST.forEach(function (v) {
                var t0;
                t0 = v.dom.contentWindow.document.querySelector('.passes em');
                if (t0) pass += +t0.textContent
                t0 = v.dom.contentWindow.document.querySelector('.failures em');
                if (t0) fail += +t0.textContent
                t0 = v.dom.contentWindow.document.querySelector('.duration em');
                if (t0) duration += +t0.textContent
            })
            containerCurrentState.S('html', 'Total Test Result - ' + (fail ? 'FAIL' : 'SUCCESS'))
            containerStatePass.S('html', 'Passed : ' + pass);
            containerStateFail.S('html', 'Fail : ' + fail);
            containerStateDuration.S('html', 'Total duration : ' + duration.toFixed(2) + 's');
            requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)


        testList.forEach(function (v) {
            var t0;
            Rich.Dom('div').S(
                '@className', 'itemContainer',
                '>', Rich.Dom('div').S(
                    '@className', 'title',
                    'down', function () {
                        location.href = v['url']
                    },
                    'html', v['title'],
                    '>', Rich.Dom('div').S(
                        '@className', 'banner',
                        'display', v['banner'] ? 'block' : 'none',
                        'html', v['banner']
                    )
                ),
                '>', t0 = Rich.Dom('iframe').S(
                    '@src', v['url']
                ),
                '<', containerRoot
            )
            if (v['banner'] != 'Visual') IFRAME_LIST.push(t0)

        })
    }
})
