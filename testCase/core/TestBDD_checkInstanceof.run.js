Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test - checkInstanceof( value, type, nullishAble = true )', function () {
        describe('Test - 기본 허용범위 테스트', function () {
            var TestClass = function () {this.name = 'TestClass'}
            var testInstance = new TestClass();
            [testInstance, null, undefined].forEach(function (testValue) {
                it('Rich.checkInstanceof( ' + (testValue ? testValue.constructor.name + ' instance' : testValue) + ', TestClass )', function () {
                    var result = true;
                    try {
                        Rich.checkInstanceof(testValue, TestClass)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범외 테스트', function () {
            var TestClass = function () {this.name = 'TestClass'};
            [-1.1, -1, 0, 1, 1.1, true, false, NaN, '문자열', function () {}, {}].forEach(function (testValue) {
                it('Rich.checkInstanceof( ' + testValue + ', TestClass )', function () {
                    var result = true;
                    try {
                        Rich.checkInstanceof(testValue, TestClass)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false )', function () {
            var TestClass = function () {this.name = 'TestClass'}
            var testInstance = new TestClass();
            [testInstance].forEach(function (testValue) {
                it('Rich.checkInstanceof( ' + (testValue ? testValue.constructor.name + ' instance' : testValue) + ', TestClass )', function () {
                    var result = true;
                    try {
                        Rich.checkInstanceof(testValue, TestClass, false)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범외 테스트 ( nullishAble = false )', function () {
            var TestClass = function () {this.name = 'TestClass'};
            [null, undefined, -1.1, -1, 0, 1, 1.1, true, false, NaN, '문자열', function () {}, {}].forEach(function (testValue) {
                it('Rich.checkInstanceof( ' + testValue + ', TestClass )', function () {
                    var result = true;
                    try {
                        Rich.checkInstanceof(testValue, TestClass, false)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
    });
    TEST_HELPER();
});
