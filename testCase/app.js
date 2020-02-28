"use strict";
Rich.init('asset/css.css').then(function () {
    {
        var containerRoot;
        var containerCurrentState, containerStatePass, containerStateFail, containerStateDuration;
        const testList = [
            {
                title: 'Test - Main',
                url: 'main/TestBDD_Main.html?testParams=1&testParams2=test',
                description : '초기화와 기본 정의 매서드를 테스트함.'
            },
            {
                title: 'Test - Rich.dispatcher',
                url: 'main/TestBDD_dispatcher.html',
                description : '기본 이벤트 디스패처를 테스트함'
            },
            {
                title: 'Test - Rich.defineProperty',
                url: 'core/TestBDD_defineProperty.html',
                description : '객체에 타입별 getter/setter 기능을 테스트함'
            },
            {
                title: 'Test - Rich.defineProperty : NUMBER',
                url: 'core/TestBDD_NUMBER.html',
                description : 'defineProperty.NUMBER 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : INT',
                url: 'core/TestBDD_INT.html',
                description : 'defineProperty.INT 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : UINT',
                url: 'core/TestBDD_UINT.html',
                description : 'defineProperty.UINT 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : STRING',
                url: 'core/TestBDD_STRING.html',
                description : 'defineProperty.STRING 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.defineProperty : BOOLEAN',
                url: 'core/TestBDD_BOOLEAN.html',
                description : 'defineProperty.BOOLEAN 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'TODO - Rich.defineProperty : CUSTOM',
                url: 'core/TestBDD_CUSTOM.html',
                description : 'defineProperty.CUSTOM 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Test - Rich.Dom',
                url: 'display/TestBdd_Dom.html',
                description : 'Dom 객체 생성/핸들링을 테스트함'
            },
            {
                title: 'Test - Rich.Css',
                url: 'css/TestBDD_Css.html',
                description : 'CSSStyleDeclaration 객체 생성/핸들링을 테스트함'
            },
            {
                title: 'Test - Rich.DETECTOR',
                url: 'detector/Test_DETECTOR.html',
                description : '기본 디텍팅 항목',
                banner: 'Visual'
            },
            {
                title: 'Test - Test Dom Events',
                url: 'display/TestDomEvents.html',
                description : 'Dom 이벤트 처리 시각화',
                banner: 'Visual'
            },
            {
                title: 'Test - Test Container Method',
                url: 'display/TestContainerMethod.html',
                description : 'Dom 자식처리 시각화',
                banner: 'Visual'
            },
            {
                title: 'Test - Rich.LOOPER',
                url: 'looper/TestBDD_LOOPER.html',
                description : '루퍼 매니저 테스트함'
            },
            {
                title: 'Test - Rich.KEY',
                url: 'keyboard/TestBDD_KEY.html',
                description : '키보드 버퍼처리 시각화함',
                banner: 'Visual'
            },
            {
                title: 'Test - Rich.WIN',
                url: 'window/TestBDD_WIN.html',
                description : '윈도우 관련 매니저 테스트함',
                banner: 'Visual'
            },
            {
                title: 'Test - Rich.STORAGE',
                url: 'storage/TestBDD_STORAGE.html',
                description : '스토리지 관리 테스트함'
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
                        '@className', 'description',
                        'html', v['description']
                    ),
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
