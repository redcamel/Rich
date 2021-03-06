Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test - Rich.checkTypes( ...arg ) / 기본 실행 테스트 ', function () {
        it('Rich.checkTypes( [0.1, Rich.DEFINE_TYPE.NUMBER], [-1, Rich.DEFINE_TYPE.INT], [1, Rich.DEFINE_TYPE.UINT]  )', function () {
            var result = true;
            try {
                Rich.checkTypes(
                    [0.1, Rich.DEFINE_TYPE.NUMBER],
                    [-1, Rich.DEFINE_TYPE.INT],
                    [1, Rich.DEFINE_TYPE.UINT]
                )
            } catch (e) {
                result = false
            }
            expect(result).to.be.true;
        });
        it('Rich.checkTypes( [0.1, Rich.DEFINE_TYPE.STRING], [-1, Rich.DEFINE_TYPE.BOOLEAN], [1, Rich.DEFINE_TYPE.FUNCTION]  )', function () {
            var result = true;
            try {
                Rich.checkTypes(
                    ['문자열', Rich.DEFINE_TYPE.STRING],
                    [true, Rich.DEFINE_TYPE.BOOLEAN],
                    [function () {}, Rich.DEFINE_TYPE.FUNCTION]
                )
            } catch (e) {
                result = false
            }
            expect(result).to.be.true;
        });
    });
    TEST_HELPER();
});
