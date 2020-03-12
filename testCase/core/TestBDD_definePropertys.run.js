Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test Rich.definePropertys - 기본테스트', function () {
        it('기본테스트', function () {
            expect(function () {
                var TestTarget = function TestTarget() {};
                Rich.definePropertys(
                    TestTarget.prototype,
                    [
                        {keyName: 'testNumber', type: Rich.DEFINE_TYPE.NUMBER, option: {}},
                        {keyName: 'testInt', type: Rich.DEFINE_TYPE.INT, option: {}},
                        {keyName: 'testUint', type: Rich.DEFINE_TYPE.UINT, option: {}}
                    ]
                )
            }).to.not.throw();
        });
        it('지원하지않는 타입이 들어왔을때 체크', function () {

            expect(function () {
                var TestTarget = function TestTarget() {};
                Rich.definePropertys(
                    TestTarget.prototype,
                    [
                        {keyName: 'testNumber', type: Rich.DEFINE_TYPE.__NUMBER__, option: {}},
                        {keyName: 'testInt', type: Rich.DEFINE_TYPE.__INT__, option: {}},
                        {keyName: 'testUint', type: Rich.DEFINE_TYPE.__UINT__, option: {}}
                    ]
                )
            }).to.throw()
        })
    });
    TEST_HELPER();
});

let testStruct = {
    test: {type: 'STRING', allowList: []}
}