chai.config.includeStack = true;
var expect = chai.expect;
var assert = chai.assert;
mocha.setup({
    ui : 'bdd',
    timeout : 10000
});

(function () {
// <div id="mocha">
//     <h1>Rich.getJS & Rich.getCSS TestCase</h1>
// </div>
    var t0 = document.createElement('div')
    var t1 = location.href.split('/')
    t1 = t1[t1.length - 1];
    t1 = t1.split('?');
    t1 = t1[0];
    t1 = t1.replace('.html', '')
    t0.setAttribute('id', 'mocha')
    t0.innerHTML = '<h1>' + t1 + ' TestCase</h1>'
    document.body.appendChild(t0)

})();

// mocha.checkLeaks();
var TEST_HELPER = function () {
    mocha.run(function (failures) {
        console.log(failures)

        console.log('failures', failures)
        if (failures) {
            Rich.Dom('button').S(
                'position', 'fixed',
                'z-index', 1,
                'top', 15,
                'right', 15,
                'width', 40,
                'height', 40,
                'border', 0,
                'border-radius', '50%',
                'outline', 'none',
                'background', 'red',
                'color', '#fff',
                'html', 'Fail',
                '<', 'body'
            )
            Rich.Dom('#mocha-report').S('@className', 'fail')
        } else {
            Rich.Dom('button').S(
                'position', 'fixed',
                'z-index', 1,
                'top', 15,
                'right', 15,
                'width', 40,
                'height', 40,
                'border', 0,
                'border-radius', '50%',
                'outline', 'none',
                'background', '#fff',
                'color', '#000',
                'html', 'Pass',
                '<', 'body'
            )
            Rich.Dom('#mocha-report').S('@className', 'test pass fast')
        }
    });
};
(function () {
    var testFunc = function testFunc() {}
    var testArray = [];
    var testObject = {}
    TEST_HELPER.TYPE_LIST = {
        NULLISH: [null, undefined],
        NUMBER: [-2, -1.1, -1, 0, 1, 1.1, 2],
        INT: [-2, -1, 0, 1, 2],
        UINT: [0, 1, 2],
        STRING: ['테스트문자열', '111111'],
        BOOLEAN: [true, false],
        OBJECT: [testObject],
        FUNCTION: [testFunc],
        ARRAY: [testArray],
        //
        NUMBER_NULLISH: [-2, -1.1, -1, 0, 1, 1.1, 2, null, undefined],
        INT_NULLISH: [-2, -1, 0, 1, 2, null, undefined],
        UINT_NULLISH: [0, 1, 2, null, undefined],
        STRING_NULLISH: ['테스트문자열', '111111', null, undefined],
        BOOLEAN_NULLISH: [true, false, null, undefined],
        OBJECT_NULLISH: [testObject, null, undefined],
        FUNCTION_NULLISH: [testFunc, null, undefined],
        ARRAY_NULLISH: [testArray, null, undefined],
        //
        NAN: [NaN],
    };

    TEST_HELPER.getTestTypeList = function () {
        var arg = Array.prototype.slice.call(arguments)
        var newList = []
        arg.forEach(function (v) {
            v.forEach(function (v2) {
                if (newList.indexOf(v2) === -1) newList.push(v2)
            })
        })
        return newList
    }
    TEST_HELPER.removeItem = function (target, removeItem) {
        let tList = target.concat()
        return tList.filter(function (v) {
            if (removeItem.indexOf(v) === -1) return true
            // target.splice(target.indexOf(v), 1)
        });
    }
    TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.NULLISH)

    TEST_HELPER.makeTestByList = (function () {
        var getStrFromComment = (function () {
            var t0;
            return function (source) {
                if (typeof source != 'string') throw('getStrFromComment : 해석할 값은 문자열만 가능 :' + source);
                source = source.trim()
                source = source.replace(/function(\s?)+\((\s?)+\)(\s?)+{/, '')
                source = source.replace(/}$/, '')
                // t0 = source.trim().match(/(\/\*)[\s\S]+(\*\/)/g);
                // if (t0) return t0[0].replace(/\/\*|\*\//g, '').trim();
                // else throw('getStrFromComment : 해석할 불가능한 값 : ' + source)
                // console.log(source)
                return source
            }
        })()
        var makeIt = function (testValue, source) {
            eval(
                getStrFromComment(source.toString()).replace(/\$testValue/g, Rich.valueToText(testValue))
            )
        }
        return function (testList, source) {
            testList.forEach(function (testValue) {
                    makeIt(
                        testValue,
                        source
                    )
                }
            );
        }
    })();
    var t0 = TEST_HELPER.getTestTypeList(
        TEST_HELPER.TYPE_LIST.NULLISH,
        TEST_HELPER.TYPE_LIST.NUMBER,
        TEST_HELPER.TYPE_LIST.INT,
        TEST_HELPER.TYPE_LIST.UINT,
        TEST_HELPER.TYPE_LIST.STRING,
        TEST_HELPER.TYPE_LIST.BOOLEAN,
        TEST_HELPER.TYPE_LIST.OBJECT,
        TEST_HELPER.TYPE_LIST.FUNCTION,
        TEST_HELPER.TYPE_LIST.ARRAY,
        TEST_HELPER.TYPE_LIST.NAN
    )
    TEST_HELPER.TYPE_LIST.ALL = t0
})();
