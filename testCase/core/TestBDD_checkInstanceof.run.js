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

            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.NULLISH
                ),
                function () {
                    it('Rich.checkInstanceof( $testValue, TestClass )', function () {
                        expect(function () {
                            var TestClass = function () {this.name = 'TestClass'};
                            Rich.checkInstanceof($testValue, TestClass)
                        }).to.throw();
                    });
                }
            )

        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false )', function () {
            var TestClass = function () {this.name = 'TestClass'}
            var testInstance = new TestClass();
            it('Rich.checkInstanceof( ' + testInstance.constructor.name + ' instance' + ', TestClass )', function () {
                expect(function () {
                    Rich.checkInstanceof(testValue, TestClass, false);
                }).to.throw();
            });
        });
        describe('Test - 기본 허용범외 테스트 ( nullishAble = false )', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.TYPE_LIST.ALL,
                function () {
                    it('Rich.checkInstanceof( $testValue, TestClass )', function () {
                        expect(function () {
                            var TestClass = function () {this.name = 'TestClass'};
                            Rich.checkInstanceof($testValue, TestClass, false)
                        }).to.throw();
                    });
                }
            )
        });
    });
    TEST_HELPER();
});
