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
                        {keyName: 'testNumber', type: Rich.defineProperty.NUMBER, option: {}},
                        {keyName: 'testInt', type: Rich.defineProperty.INT, option: {}},
                        {keyName: 'testUint', type: Rich.defineProperty.UINT, option: {}}
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