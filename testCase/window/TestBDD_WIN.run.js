"use strict";
Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    var tMap = {}
    var tBox;
    tBox = Rich.Dom('div').S('font-size', 11);
    Rich.Dom('#mocha').addChildAt(1, tBox);
    'mouseX,mouseY,w,h,orientation,pageX,pageY'.split(',').forEach(function (k) {
        tMap[k] = Rich.Dom('div').S(
            'display', 'block',
            'padding', 3,
            'color', '#fff',
            'html', k + ' : ' + Rich.WIN[k],
            '<', tBox
        )
    })
    Rich.Dom('div').S(
        'position', 'relative',
        'height', 2000,
        '<', 'body'
    )
    Rich.LOOPER.addMainLoop('WIN_TEST', function () {
        for (var k in tMap) {
            tMap[k].S('html', k + ' : ' + Rich.WIN[k])
        }
    })
    checkState();
})
var pre_test_one, pre_test_multi;
var HD_test1, HD_test2, HD_null
HD_test1 = function () {
}
HD_test2 = function () {
}
HD_null = null
pre_test_one = ''
pre_test_multi = ''

// 하나만 해도 잘 동작 하는지 테스트
Rich.WIN.add('pre_test_one', function () {
    pre_test_one = '1', console.log('test')
})


// 순차 동작 보장 테스트
Rich.WIN.add('pre_test_multi_1', function () {
    pre_test_multi += '1', console.log('test1')
})
Rich.WIN.add('pre_test_multi_2', function () {
    pre_test_multi += '2', console.log('test2')
})
Rich.WIN.add('pre_test_multi_3', function () {
    pre_test_multi += '3', console.log('test3')
})
Rich.WIN.add('pre_test_multi_4', function () {
    pre_test_multi += '4', console.log('test4')
})

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
describe(
    "Rich.WIN Test",
    function () {
        it("Rich.WIN - 기본정의 add", function () {
            // 미리 동작 시켜둔녀석들에 의해 pre_test_one 가 1이어야 함
            Rich.dispatcher(window, 'resize', {})
            expect(pre_test_one == '1' ? true : false).to.be.true
        });
        it("Rich.WIN - 기본정의 has", function () {
            expect(Rich.WIN.has('pre_test_one')).to.be.true
        });
        it("Rich.WIN - 중복정의 add : 허용하지않음", function () {
            // pre_test_one 을 2로 다시 바꾸는 콜백으로 덮어씀
            Rich.WIN.add('overrideTest', HD_test1)
            var result = true
            try {
                Rich.WIN.add('overrideTest', HD_test2)
            } catch (e) {
                result = false
            }
            expect(result).to.be.false
        });
        it("Rich.WIN - add시 핸들러를 함수만 받는지", function () {
            var t0 = true
            try {
                Rich.WIN.add('nullTest', HD_null)
            } catch (error) {
                t0 = false
            }
            expect(t0).to.be.false
        })
    }
)
