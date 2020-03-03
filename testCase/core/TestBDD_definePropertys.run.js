Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test Rich.definePropertys - 기본테스트', function () {
        it('기본테스트', function () {
            var result = true
            var TestTarget = function TestTarget() {};
            try {
                Rich.definePropertys(
                    TestTarget.prototype,
                    [
                        {keyName: 'testNumber', type: Rich.DEFINE_TYPE.NUMBER, option: {}},
                        {keyName: 'testInt', type: Rich.DEFINE_TYPE.INT, option: {}},
                        {keyName: 'testUint', type: Rich.DEFINE_TYPE.UINT, option: {}}
                    ]
                )
            } catch (e) {
                result = false;
            }
            expect(result).to.be.true
        });
        it('지원하지않는 타입이 들어왔을때 체크', function () {
            var result = true
            var TestTarget = function TestTarget() {};
            try {
                Rich.definePropertys(
                    TestTarget.prototype,
                    [
                        {keyName: 'testNumber', type: Rich.DEFINE_TYPE.NUMBER2, option: {}},
                        {keyName: 'testInt', type: Rich.DEFINE_TYPE.INT2, option: {}},
                        {keyName: 'testUint', type: Rich.DEFINE_TYPE.UINT2, option: {}}
                    ]
                )
            } catch (e) {
                result = false;
            }
            expect(result).to.be.false
        })
    });
    checkState();
});

let testStruct = {
    test: {type: 'STRING', allowList: []}
}