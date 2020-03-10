Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test - FUNCTION', function () {
        describe('Test - 허용범위 테스트', function () {
            [function () {}, undefined, null].forEach(function (targetValue) {
                it('입력값 : ' + targetValue, function () {
                    var target = function Test() {}
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.DEFINE_TYPE.FUNCTION)
                    var targetInstance = new target();
                    targetInstance.keyName_test = targetValue;
                    expect(targetInstance.keyName_test === targetValue).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 테스트 ( option.nullishAble = false일때 )', function () {
            [function () {}].forEach(function (targetValue) {
                it('{ nullishAble : false, value : function () {} } / 입력값 : ' + function () {}, function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.FUNCTION,
                        {
                            value: function () {},
                            nullishAble: false
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = targetValue;
                    expect(targetInstance.keyName_test === targetValue).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 외 테스트 ( option.nullishAble = false일때 )', function () {
            [NaN, null, undefined, -1, 0, 1, '문자열', {},].forEach(function (v) {
                it('{ nullishAble : false, value : function () {} } / 입력값 : ' + v, function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.FUNCTION,
                        {
                            nullishAble: false,
                            value: function () {}
                        }
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = v;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - option', function () {
            describe('Test - option.value 테스트', function () {
                it('초기값 옵션이 없을경우 null로 생성되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.DEFINE_TYPE.FUNCTION)
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === null).to.be.true;
                });
                it('{ value : true } / 초기값이 잘 지정되는지', function () {
                    var target = function Test() {}
                    var testValue = function TestValue() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.FUNCTION,
                        {
                            value: testValue
                        }
                    )
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === testValue).to.be.true;
                });

                [NaN, null, undefined, -1, 0, 1, '문자열', {}].forEach(function (v) {
                    it('{ nullishAble : false, value : ' + v + ' } / 초기값이 Function이 아닐때 에러가 나는지', function () {
                        var target = function Test() {}
                        var result = true;
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.FUNCTION,
                                {
                                    nullishAble: false,
                                    value: v
                                }
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.false;
                    });
                });
                [NaN, null, undefined, -1, 0, 1, '문자열', {}].forEach(function (v) {
                    it('{ nullishAble : true, value : ' + v + ' } / 초기값이 Function이 아닐때 에러가 나는지', function () {
                        var target = function Test() {}
                        var result = true;
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.FUNCTION,
                                {
                                    nullishAble: true,
                                    value: v
                                }
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.false;
                    });
                });
            });

            describe('Test - option.nullishAble 테스트', function () {
                it('{   nullishAble : true } : nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.FUNCTION,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == null).to.be.true;
                });
                it('{ value : function () {}, nullishAble : true } : nullishAble 상태일때 초기값이 세팅이 옵션대로 되는지 체크', function () {
                    var target = function Test() {}
                    var testValue = function TestValue() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.FUNCTION,
                        {
                            value: testValue,
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == testValue).to.be.true;
                });
                it('{ value : function () {}, nullishAble : true } : nullishAble 실제 값을 set 했을때 허용되는지 체크', function () {
                    var target = function Test() {}
                    var testValue = function TestValue() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.FUNCTION,
                        {
                            value: testValue,
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = null
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == null).to.be.true;
                });
            });
            describe('Test - option.allowList 테스트', function () {
                it('TODO - allowList', function () {

                })
            });
            describe('Test - option.callback 테스트', function () {
                it('콜백테스트', function () {
                    var result = false
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.FUNCTION,
                        {
                            callback: function () {
                                result = true
                            }
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = function () {}
                    console.log(targetInstance)
                    expect(result).to.be.true;
                })
            });
        });


    });
    checkState();
});
