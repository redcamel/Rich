"use strict";
Rich.init('asset/css.css').then(function () {
    {
        var containerRoot;
        var containerCurrentState, containerStatePass, containerStateFail, containerStateDuration;
        var testList = [
            {
                title: 'Main',
                url: 'main/TestBDD_Main.html?testParams=1&testParams2=test',
                description: '초기화와 기본 정의 매서드를 테스트함.'
            },
            {
                title: 'Rich.dispatcher',
                url: 'main/TestBDD_dispatcher.html',
                description: '기본 이벤트 디스패처를 테스트함'
            },
            {
                title: 'Rich.defineProperty',
                url: 'core/TestBDD_defineProperty.html',
                description: '객체에 타입별 getter/setter 기능을 테스트함'
            },
            {
                title: 'Rich.definePropertys',
                url: 'core/TestBDD_definePropertys.html',
                description: 'defineProperty를 한번에 하는 기능을 테스트함'
            },
            {
                title: 'ING - Rich.checkSchema method',
                url: 'core/TestBDD_checkSchema.html',
                description: '스키마검증 테스트 케이스 - 이녀석은 너무 귀찮아...',
                banner: 'Type'
            },
            {
                title: 'Rich.checkType method',
                url: 'core/TestBDD_checkType.html',
                description: '단순값을 타입 평가하는 테스트',
                banner: 'Type'
            },
            {
                title: 'Rich.checkTypes method',
                url: 'core/TestBDD_checkTypes.html',
                description: 'checkType을 한번에 수행하는 매서드',
                banner: 'Type'
            },
            {
                title: 'checkInstanceof method',
                url: 'core/TestBDD_checkInstanceof.html',
                description: '진행중 - 단순값을 타입 평가하는 테스트',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : NUMBER',
                url: 'core/TestBDD_NUMBER.html',
                description: 'defineProperty.NUMBER 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : INT',
                url: 'core/TestBDD_INT.html',
                description: 'defineProperty.INT 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : UINT',
                url: 'core/TestBDD_UINT.html',
                description: 'defineProperty.UINT 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : STRING',
                url: 'core/TestBDD_STRING.html',
                description: 'defineProperty.STRING 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : BOOLEAN',
                url: 'core/TestBDD_BOOLEAN.html',
                description: 'defineProperty.BOOLEAN 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : FUNCTION',
                url: 'core/TestBDD_FUNCTION.html',
                description: 'defineProperty.FUNCTION 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : ARRAY',
                url: 'core/TestBDD_ARRAY.html',
                description: 'defineProperty.ARRAY 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : OBJECT',
                url: 'core/TestBDD_OBJECT.html',
                description: 'defineProperty.OBJECT 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.defineProperty : CUSTOM',
                url: 'core/TestBDD_CUSTOM.html',
                description: 'defineProperty.CUSTOM 유형을 테스트함',
                banner: 'Type'
            },
            {
                title: 'Rich.Dom',
                url: 'display/TestBdd_Dom.html',
                description: 'Dom 객체 생성/핸들링을 테스트함'
            },
            {
                title: 'query & queryAll',
                url: 'display/TestBdd_query.html',
                description: 'query & queryAll 매서드 동작 테스트'
            },
            {
                title: 'Rich.Css',
                url: 'css/TestBDD_Css.html',
                description: 'CSSStyleDeclaration 객체 생성/핸들링을 테스트함'
            },
            {
                title: 'Rich.DETECTOR',
                url: 'detector/Test_DETECTOR.html',
                description: '기본 디텍팅 항목',
                banner: 'Visual'
            },
            {
                title: 'Rich.getJS & Rich.getCSS',
                url: 'network/TestBDD_getJS_getCSS.html',
                description: 'getJS, getCSS 매서드 테스트함'
            },
            {
                title: 'Test Dom Events',
                url: 'display/TestDomEvents.html',
                description: 'Dom 이벤트 처리 시각화',
                banner: 'Visual'
            },
            {
                title: 'Test Container Method',
                url: 'display/TestContainerMethod.html',
                description: 'Dom 자식처리 시각화',
                banner: 'Visual'
            },
            {
                title: 'Rich.LOOPER',
                url: 'looper/TestBDD_LOOPER.html',
                description: '루퍼 매니저 테스트함'
            },
            {
                title: 'Rich.KEY',
                url: 'keyboard/TestBDD_KEY.html',
                description: '키보드 버퍼처리 시각화함',
                banner: 'Visual'
            },
            {
                title: 'Rich.WIN',
                url: 'window/TestBDD_WIN.html',
                description: '윈도우 관련 매니저 테스트함',
                banner: 'Visual'
            },
            {
                title: 'Rich.STORAGE',
                url: 'storage/TestBDD_STORAGE.html',
                description: '스토리지 관리 테스트함'
            }
        ]
        var IFRAME_LIST = []
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
        var tick = (function () {
            var prevFailNum = 0;
            return function () {
                var pass = 0;
                var fail = 0;
                var duration = 0
                IFRAME_LIST.forEach(function (itemContainer) {
                    var v = Rich.Dom(itemContainer.dom.querySelector('iframe'))
                    var t0;
                    if (prevFailNum) itemContainer.S('opacity', 0.1)
                    t0 = v.dom.contentWindow.document.querySelector('.passes em');
                    if (t0) pass += +t0.textContent
                    t0 = v.dom.contentWindow.document.querySelector('.failures em');
                    if (t0) {
                        fail += +t0.textContent
                        if (+t0.textContent) {
                            itemContainer.S('opacity', 1)
                            itemContainer.S('height', 500)
                            Rich.Dom(itemContainer.dom.querySelector('iframe')).S('height', '100%')
                        }
                    }
                    t0 = v.dom.contentWindow.document.querySelector('.duration em');
                    if (t0) duration += +t0.textContent
                })
                prevFailNum = fail;
                containerCurrentState.S(
                    'color', fail ? 'red' : '#f2a971',
                    'html', 'Total Test Result - ' + (fail ? 'FAIL' : 'SUCCESS')
                )
                containerStatePass.S('html', 'Passed : ' + pass);
                containerStateFail.S('html', 'Fail : ' + fail);
                containerStateDuration.S('html', 'Total duration : ' + duration.toFixed(2) + 's');
                requestAnimationFrame(tick)
            }
        })()
        requestAnimationFrame(tick)

        testList.forEach(function (v) {
            var t0;
            var itemContainer = Rich.Dom('div').S(
                '@className', 'itemContainer',
                '>', Rich.Dom('div').S(
                    '@className', 'title',
                    'down', function () {
                        location.href = v['url']
                    },
                    'background', v['title'].substr(0, 4) === 'TODO' ? '#6c7180' : v['title'].substr(0, 3) === 'ING' ? '#3d8c4e' : '',
                    'html', v['title'],
                    '>', Rich.Dom('div').S(
                        '@className', 'description',
                        'html', v['description']
                    ),
                    '>', Rich.Dom('div').S(
                        '@className', 'banner ' + v['banner'],
                        'display', v['banner'] ? 'block' : 'none',
                        'html', v['banner']
                    )
                ),
                '>', t0 = Rich.Dom('iframe').S(
                    '@src', v['url']
                ),
                '<', containerRoot
            )
            IFRAME_LIST.push(itemContainer)

        })
    }
})
