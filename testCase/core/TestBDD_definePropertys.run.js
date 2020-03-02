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
            let testInstance = new TestTarget()
            console.log(testInstance)
            expect(result).to.be.true
        })
    });
    checkState();
});

let testStruct = {
    test: {type: 'STRING', allowList: []}
}