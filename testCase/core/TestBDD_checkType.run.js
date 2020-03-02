Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test - NumberTest', function () {
        describe('Test - 기본 허용범위 테스트', function () {
            [-1.1, -1, 0, 1, 1.1].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ',Rich.DEFINE_TYPE.NUMBER )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue,Rich.DEFINE_TYPE.NUMBER)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트', function () {
            [NaN, '문자열', function () {}, {}].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ',Rich.DEFINE_TYPE.NUMBER )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue,Rich.DEFINE_TYPE.NUMBER)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        })
    });
    checkState();
});
