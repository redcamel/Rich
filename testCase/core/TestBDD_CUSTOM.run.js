Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    var TestCustomType = function TestCustomType() { }
    var instanceTestCustomType = new TestCustomType();
    describe('Test - CUSTOM', function () {
        describe('Test - 허용범위 테스트', function () {
            [undefined, null, instanceTestCustomType].forEach(function (testValue) {
                it('입력값 : ' + (testValue ? testValue.constructor.name + ' instance' : testValue), function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        TestCustomType,
                        null,
                        true
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = testValue;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 테스트  ( option.nullishAble = false일때 )', function () {
            [instanceTestCustomType].forEach(function (testValue) {
                it('option = { nullishAble : false, value : instanceTestCustomType } / 입력값 : ' + (testValue ? testValue.constructor.name + ' instance' : testValue), function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        TestCustomType,
                        {
                            value: instanceTestCustomType,
                            nullishAble: false
                        },
                        true
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = testValue;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 외 테스트  ( option.nullishAble = false일때 )', function () {
            [-1.1, -1, 0, 1, 1.1, NaN, true, false, {}, function () { }].forEach(function (testValue) {
                it('option = { nullishAble : false, value : instanceTestCustomType } / 입력값 : ' + testValue, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        TestCustomType,
                        {
                            value: instanceTestCustomType,
                            nullishAble: false
                        },
                        true
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = testValue;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
            [-1.1, -1, 0, 1, 1.1, NaN, true, false, {}, function () {
            }].forEach(function (testValue) {
                it('{ nullishAble : true } 입력값 : ' + testValue, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        TestCustomType,
                        {
                            value: new TestCustomType(),
                            nullishAble: true
                        },
                        true
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = testValue;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
            describe('Test - option 테스트', function () {
                describe('Test - option.value 테스트', function () {
                    it('option = null / nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            TestCustomType,
                            null,
                            true
                        )
                        var targetInstance = new target();
                        console.log(targetInstance)
                        expect(targetInstance.keyName_test === null).to.be.true;
                    });
                    it('option = { nullishAble : true } / nullishAble 상태일때 초기값이 null로 세팅되나 체크 초기값이 잘 지정되는지', function () {
                        var target = function Test() {
                        }
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            TestCustomType,
                            {
                                nullishAble: true
                            },
                            true
                        )
                        var targetInstance = new target();
                        expect(targetInstance.keyName_test === null).to.be.true;
                    });
                    it('option = { nullishAble : false } /  nullishAble 상태가 아닐때 초기값이 없으면 에러가 나나!', function () {
                        var target = function Test() {}
                        var result = true;
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                TestCustomType,
                                {
                                    nullishAble: false
                                },
                                true
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.false;
                    });
                });

                describe('Test - option.nullishAble 테스트', function () {
                    it('{ nullishAble : true } : nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                        var target = function Test() {
                        }
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            TestCustomType,
                            {
                                nullishAble: true
                            },
                            true
                        )
                        var targetInstance = new target();
                        console.log(targetInstance)
                        expect(targetInstance.keyName_test == null).to.be.true;
                    });
                    it('{ value : instanceTestCustomType, nullishAble : true } : nullishAble 상태일때 초기값이 세팅이 옵션되로 되는지 체크', function () {
                        var target = function Test() {
                        }
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            TestCustomType,
                            {
                                value: instanceTestCustomType,
                                nullishAble: true
                            },
                            true
                        )
                        var targetInstance = new target();
                        console.log(targetInstance)
                        expect(targetInstance.keyName_test === instanceTestCustomType).to.be.true;
                    });
                    it('{ value : null, nullishAble : true } : nullishAble 실제 값을 set 했을때 허용되는지 체크', function () {
                        var target = function Test() {
                        }
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            TestCustomType,
                            {
                                value: null,
                                nullishAble: true
                            },
                            true
                        )
                        var targetInstance = new target();
                        targetInstance.keyName_test = instanceTestCustomType
                        console.log(targetInstance)
                        expect(targetInstance.keyName_test === instanceTestCustomType).to.be.true;
                    });
                });

                describe('Test - option.callback 테스트', function () {
                    it('콜백테스트', function () {
                        var result = false
                        var target = function Test() {
                        }
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            TestCustomType,
                            {
                                nullishAble: true,
                                callback: function () {
                                    result = true
                                }
                            },
                            true
                        )
                        var targetInstance = new target();
                        targetInstance.keyName_test = instanceTestCustomType
                        console.log(targetInstance)
                        expect(result).to.be.true;
                    })
                });
                //
            });
        });
        TEST_HELPER();
    });
});