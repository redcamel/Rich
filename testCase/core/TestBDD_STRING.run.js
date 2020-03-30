Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test - STRING', function () {
        describe('Test - 허용범위 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.TYPE_LIST.STRING_NULLISH,
                function () {
                    it('입력값 : $testValue', function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.STRING
                        )
                        console.log(target)
                        var targetInstance = new target();
                        targetInstance.keyName_test = $testValue
                        expect(targetInstance.keyName_test).to.equal($testValue);
                    });
                }
            )
        });
        describe('Test - 허용범위외 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.STRING_NULLISH
                ),
                function () {
                    it('입력값 : $testValue', function () {
                        expect(function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.STRING
                            )
                            console.log(target)
                            var targetInstance = new target();
                            targetInstance.keyName_test = $testValue
                        }).to.throw();
                    });
                }
            )
        });
        describe('Test - 허용범위 테스트  ( option.nullishAble = false일때 )', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.TYPE_LIST.STRING,
                function () {
                    it('입력값 : $testValue', function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.STRING,
                            {
                                value: "기본값",
                                nullishAble: false
                            }
                        )
                        console.log(target)
                        var targetInstance = new target();
                        targetInstance.keyName_test = $testValue
                        expect(targetInstance.keyName_test).to.equal($testValue);
                    });
                }
            )
        });
        describe('Test - 허용범위 외 테스트 ( option.nullishAble = false일때 )', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.STRING
                ),
                function () {
                    it('{ nullishAble : false, value : "기본값" } / 입력값 : $testValue', function () {
                        expect(function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.STRING,
                                {
                                    value: '기본값',
                                    nullishAble: false
                                }
                            )
                            var targetInstance = new target();
                            targetInstance.keyName_test = $testValue
                        }).to.throw();
                    });
                }
            )

        });
        describe('Test - option', function () {
            describe('Test - option.value 테스트', function () {
                it('option = null / nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING
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
                        Rich.DEFINE_TYPE.STRING,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('option = { nullishAble : false } /  nullishAble 상태가 아닐때 초기값이 없으면 에러가 나나!', function () {
                    expect(function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.STRING,
                            {
                                nullishAble: false
                            }
                        )
                    }).to.throw();
                });
                it('{ value : "초기값문자열" } 초기값이 잘 지정되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: "초기값문자열"
                        }
                    )
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test).to.equal("초기값문자열");
                });
            });

            describe('Test - option.nullishAble 테스트', function () {
                it('{ nullishAble : true } : nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('{ value : "초기값이 지정되어라", nullishAble : true } : nullishAble 상태일때 초기값이 세팅이 옵션되로 되는지 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: '초기값이 지정되어라',
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal('초기값이 지정되어라');
                });
                it('{ value : "초기값이 지정되어라", nullishAble : true } : nullishAble 실제 값을 set 했을때 허용되는지 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: "초기값이 지정되어라",
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = '변화된 값이 되어라'
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal('변화된 값이 되어라');
                });
            });

            describe('Test - option.callback 테스트', function () {
                it('콜백테스트', function () {
                    var result = false
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            nullishAble: true,
                            callback: function () {
                                result = true
                            }
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = "값이닷!"
                    console.log(targetInstance)
                    expect(result).to.equal(true);
                })
            });

        });
    });
    TEST_HELPER();
});