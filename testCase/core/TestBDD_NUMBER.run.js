Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test - Number', function () {
        describe('Test - 허용범위 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.NUMBER_NULLISH),
                function () {
                    it(
                        '입력값 : $testValue',
                        function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.NUMBER
                            )
                            var targetInstance = new target();
                            targetInstance.keyName_test = $testValue;
                            expect(targetInstance.keyName_test).to.equal($testValue);
                        }
                    );
                }
            )
        });
        describe('Test - 허용범위 외 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.NUMBER_NULLISH
                ),
                function () {
                    it(
                        '입력값 : $testValue',
                        function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.NUMBER
                            )
                            var targetInstance = new target();
                            expect(function () {
                                targetInstance.keyName_test = $testValue
                            }).to.throw();
                        }
                    );
                }
            );
        });
        describe('Test - 허용범위 테스트 ( option.nullishAble = false일때 ) ', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.TYPE_LIST.NUMBER,
                function () {
                    it(
                        'option = { nullishAble : false, value : 0 } / 입력값 : $testValue',
                        function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.NUMBER
                            )
                            var targetInstance = new target();
                            targetInstance.keyName_test = $testValue;
                            expect(targetInstance.keyName_test).to.equal($testValue);
                        }
                    );
                }
            );
        });

        describe('Test - 허용범위 외 테스트 ( option.nullishAble = false일때 )', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.NUMBER
                ),
                function () {
                    it(
                        'option = { nullishAble : false, value : 0 } / 입력값 : $testValue',
                        function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.NUMBER,
                                {
                                    value: 0,
                                    nullishAble: false
                                }
                            )
                            var targetInstance = new target();
                            expect(function () {
                                targetInstance.keyName_test = $testValue
                            }).to.throw();
                        }
                    );
                }
            );

        });

        describe('Test - option', function () {
            describe('Test - option.value 테스트', function () {
                it('option = null / 초기값 옵션이 없을경우 null 로 생성되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.DEFINE_TYPE.NUMBER)
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('option = { value : -1 } / 초기값이 잘 지정되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            value: -1
                        }
                    )
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test).to.equal(-1);
                });
            });
            describe('Test - option.min 테스트', function () {
                it('option = { value : -10, min : -1 } / 초기값이 최소값 보다 작을때 최소값으로 치환되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            value: -10,
                            min: -1
                        }
                    )

                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(-1);
                });
                it('option = {  min : -1 } / 입력값이 최소값 보다 작을때 최소값으로 치환되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            min: -1
                        }
                    )

                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = -2;
                    expect(targetInstance.keyName_test).to.equal(-1);
                });
            });
            describe('Test - option.max 테스트', function () {
                it('option = { value : 10, max : 5 } / 초기값이 최대값보다 클때 최대값으로 치환되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            value: 10,
                            max: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(5);
                });
                it('option = {  max : 5 } / 입력값이 최대값보다 클때 최대값으로 치환되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            max: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = 10
                    expect(targetInstance.keyName_test).to.equal(5);
                });
            });
            describe('Test - option.nullishAble 테스트', function () {
                it('option = null / nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('option = { nullishAble : true } / nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('option = { nullishAble : false } / nullishAble 상태가 아닐때 초기값이 없으면 에러가 나나!', function () {
                    var target = function Test() {}
                    var result = true;
                    try {
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.NUMBER,
                            {
                                nullishAble: false
                            }
                        )
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
                it('option = { value : 5 } / nullishAble 상태일때 초기값이 세팅이 옵션되로 되는지 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            value: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(5);
                });
                it('option = { value : 5 } / nullishAble 실제 값을 set 했을때 허용되는지 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            value: 5
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = null
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('option = { min : 5 } / nullishAble 일떄 nullish입력시 기본값이 min, max를 무시하는지 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            min: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
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
                        Rich.DEFINE_TYPE.NUMBER,
                        {
                            callback: function () {
                                result = true
                            }
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = 1
                    console.log(targetInstance)
                    expect(result).to.equal(true);
                })
            });
        });
    });
    TEST_HELPER();
});