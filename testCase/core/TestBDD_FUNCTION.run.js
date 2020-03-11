Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test - FUNCTION', function () {
        describe('Test - 허용범위 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.TYPE_LIST.FUNCTION_NULLISH,
                function () {
                    it('입력값 : $testValue', function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.FUNCTION
                        )
                        var targetInstance = new target();
                        var realTestValue = $testValue
                        targetInstance.keyName_test = realTestValue;
                        expect(targetInstance.keyName_test).to.equal(realTestValue);
                    });
                }
            )
        });
        describe('Test - 허용범위외 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.FUNCTION_NULLISH
                ),
                function () {
                    it('입력값 : $testValue', function () {
                        expect(function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.FUNCTION
                            )
                            var targetInstance = new target();
                            targetInstance.keyName_test = $testValue;
                        }).to.throw();
                    });
                }
            )
        });
        describe('Test - 허용범위 테스트 ( option.nullishAble = false일때 )', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.TYPE_LIST.FUNCTION,
                function () {
                    it('{ nullishAble : false, value : $testValue } / 입력값 : $testValue', function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.FUNCTION,
                            {
                                value: $testValue,
                                nullishAble: false
                            }
                        )
                        var targetInstance = new target();
                        var realTestValue = $testValue
                        targetInstance.keyName_test = realTestValue;
                        expect(targetInstance.keyName_test).to.equal(realTestValue);
                    });
                }
            );
        });
        describe('Test - 허용범위 외 테스트 ( option.nullishAble = false일때 )', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.FUNCTION
                ),
                function () {
                    it('{ nullishAble : false, value : $testValue } / 입력값 : $testValue', function () {
                        expect(function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.FUNCTION,
                                {
                                    nullishAble: false,
                                    value: $testValue
                                }
                            )
                            console.log(target)
                            var targetInstance = new target();
                            targetInstance.keyName_test = $testValue;
                        }).to.throw();
                    });
                }
            );
        });
        describe('Test - option', function () {
            describe('Test - option.value 테스트', function () {
                it('초기값 옵션이 없을경우 null로 생성되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.DEFINE_TYPE.FUNCTION)
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                TEST_HELPER.makeTestByList(
                    TEST_HELPER.TYPE_LIST.FUNCTION,
                    function () {
                        it('{ value : true } / 초기값이 잘 지정되는지', function () {
                            var target = function Test() {}
                            var realTestValue = $testValue;
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.FUNCTION,
                                {
                                    value: realTestValue
                                }
                            )
                            var targetInstance = new target();
                            expect(targetInstance.keyName_test).to.equal(realTestValue);
                        });
                    }
                )
                TEST_HELPER.makeTestByList(
                    TEST_HELPER.removeItem(
                        TEST_HELPER.TYPE_LIST.ALL,
                        TEST_HELPER.TYPE_LIST.FUNCTION_NULLISH
                    ),
                    function () {
                        it('{ nullishAble : false, value : $testValue } / 초기값이 boolean or nullish 아닐때 에러가 나는지', function () {
                            expect(function () {
                                var target = function Test() {}
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.FUNCTION,
                                    {
                                        nullishAble: false,
                                        value: $testValue
                                    }
                                )
                            }).to.throw();
                        });
                    }
                );
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
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('{   nullishAble : false } : nullishAble 허용하지 않을때 초기값 없으면 에러가 나는지 체크', function () {

                    expect(function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.FUNCTION,
                            {
                                nullishAble: false
                            }
                        )
                    }).to.throw();
                });
            });
            describe('Test - option.nullishAble = true 일때 테스트', function () {
                describe('Test - option.nullishAble = true 일때 초기값이 세팅대로 되나 체크', function () {
                    TEST_HELPER.makeTestByList(
                        TEST_HELPER.TYPE_LIST.FUNCTION_NULLISH,
                        function () {
                            it('{ nullishAble : true, value : $testValue }', function () {
                                var target = function Test() {}
                                var realTestValue = $testValue;
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.FUNCTION,
                                    {
                                        value: realTestValue,
                                        nullishAble: true
                                    }
                                )
                                var targetInstance = new target();
                                console.log(targetInstance)
                                expect(targetInstance.keyName_test).to.equal(realTestValue);
                            });
                        }
                    );
                });
                describe('Test - option.nullishAble = true 일때 실제 set을 null로 지정했을때 null이 허용되나 체크', function () {
                    TEST_HELPER.makeTestByList(
                        TEST_HELPER.TYPE_LIST.FUNCTION_NULLISH,
                        function () {
                            it('{ nullishAble : true, value : $testValue } / 입력값 : null', function () {
                                var target = function Test() {}
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.FUNCTION,
                                    {
                                        value: $testValue,
                                        nullishAble: true
                                    }
                                )
                                var targetInstance = new target();
                                targetInstance.keyName_test = null
                                console.log(targetInstance)
                                expect(targetInstance.keyName_test).to.equal(null);
                            });
                        }
                    )

                });
            });
            describe('Test - option.nullishAble = false 일때 테스트', function () {
                describe('Test - option.nullishAble = false 일때 초기값이 세팅대로 되나 체크', function () {
                    TEST_HELPER.makeTestByList(
                        TEST_HELPER.TYPE_LIST.FUNCTION,
                        function () {
                            it('{ nullishAble : true, value : $testValue }', function () {
                                var target = function Test() {}
                                var realTestValue = $testValue
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.FUNCTION,
                                    {
                                        value: realTestValue,
                                        nullishAble: false
                                    }
                                )
                                var targetInstance = new target();
                                console.log(targetInstance)
                                expect(targetInstance.keyName_test).to.equal(realTestValue);
                            });
                        }
                    );
                });
                describe('Test - option.nullishAble = false 일때 실제 set을 null로 지정했을때 에러가 나나 테스트', function () {
                    TEST_HELPER.makeTestByList(
                        TEST_HELPER.TYPE_LIST.FUNCTION,
                        function () {
                            it('{ nullishAble : true, value : $testValue } / 입력값 : null', function () {
                                expect(function () {
                                    var target = function Test() {}
                                    Rich.defineProperty(
                                        target.prototype,
                                        'keyName_test',
                                        Rich.DEFINE_TYPE.FUNCTION,
                                        {
                                            value: $testValue,
                                            nullishAble: false
                                        }
                                    )
                                    var targetInstance = new target();
                                    targetInstance.keyName_test = null
                                    console.log(targetInstance)
                                }).to.throw();
                            });
                        }
                    )

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
                    targetInstance.keyName_test = function(){}
                    console.log(targetInstance)
                    expect(result).to.be.true;
                })
            });
        });


    });
    TEST_HELPER();
});
