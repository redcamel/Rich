Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {

    describe('Test - INT', function () {
        describe('Test - 허용범위 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.INT_NULLISH),
                function () {
                    it(
                        '입력값 : $testValue',
                        function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.INT
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
                    TEST_HELPER.TYPE_LIST.INT_NULLISH
                ),
                function () {
                    it(
                        '입력값 : $testValue',
                        function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.INT
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
                TEST_HELPER.TYPE_LIST.INT,
                function () {
                    it(
                        'option = { nullishAble : false, value : 0 } / 입력값 : $testValue',
                        function () {
                            var target = function Test() {}
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.DEFINE_TYPE.INT
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
                    TEST_HELPER.TYPE_LIST.INT
                ),
                function () {
                    it(
                        'option = { nullishAble : false, value : 0 } / 입력값 : $testValue',
                        function () {
                            expect(function () {
                                var target = function Test() {}
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.INT,
                                    {
                                        value: 0,
                                        nullishAble: false
                                    }
                                )
                                var targetInstance = new target();
                                targetInstance.keyName_test = $testValue
                            }).to.throw();
                        }
                    );
                }
            );

        });
        describe('Test - option', function () {
            describe('Test - option.value 테스트', function () {
                it('초기값 옵션이 없을경우 null으로 생성되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.DEFINE_TYPE.INT)
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === null).to.be.true;
                });
                TEST_HELPER.makeTestByList(
                    TEST_HELPER.TYPE_LIST.INT,
                    function () {
                        it(
                            'option = { value :  $testValue } / 초기값이 잘 지정되는지',
                            function () {
                                var target = function Test() {}
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.INT,
                                    {
                                        value: $testValue
                                    }
                                )
                                var targetInstance = new target();
                                expect(targetInstance.keyName_test).to.equal($testValue);
                            }
                        );
                    }
                );
                TEST_HELPER.makeTestByList(
                    [-1.1, 1.1],
                    function () {
                        it(
                            'option = { value :  $testValue } / 초기값이 정수가 아닐경우 에러를 발생시키는지',
                            function () {
                                expect(function () {
                                    var target = function Test() {}
                                    Rich.defineProperty(
                                        target.prototype,
                                        'keyName_test',
                                        Rich.DEFINE_TYPE.INT,
                                        {
                                            value: $testValue
                                        }
                                    );
                                }).to.throw();
                            }
                        );
                    }
                );

            });

            describe('Test - option.min 테스트', function () {
                it('option = { value : -10, min : -1 } / 초기값이 최소값 보다 작을때 최소값으로 치환되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.INT,
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
                        Rich.DEFINE_TYPE.INT,
                        {
                            min: -1
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = -2;
                    expect(targetInstance.keyName_test).to.equal(-1);
                });
                TEST_HELPER.makeTestByList(
                    [-1.1, 1.1],
                    function () {
                        it('option = { min : $testValue } / 최소값이 정수가 아닐경우 에러를 발생시키는지', function () {
                            expect(function () {
                                var target = function Test() {}
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.INT,
                                    {
                                        min: $testValue
                                    }
                                )
                            }).to.throw();
                        });
                    }
                );
            });
            describe('Test - option.max 테스트', function () {
                it('option = { value : 10, max : 5 } / 초기값이 최대값보다 클때 최대값으로 치환되는지', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.INT,
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
                        Rich.DEFINE_TYPE.INT,
                        {
                            max: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = 10
                    expect(targetInstance.keyName_test).to.equal(5);
                });
                TEST_HELPER.makeTestByList(
                    [-1.1, 1.1],
                    function () {
                        it('option = { max : $testValue } 최대값이 정수가 아닐경우 에러를 발생시키는지', function () {

                            expect(function () {
                                var target = function Test() {}
                                Rich.defineProperty(
                                    target.prototype,
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.INT,
                                    {
                                        max: $testValue
                                    }
                                )
                            }).to.throw();
                        });
                    }
                );
            });
            describe('Test - option.nullishAble 테스트', function () {
                it('option = null / nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.INT
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
                        Rich.DEFINE_TYPE.INT,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('option = { nullishAble : false } / nullishAble 상태가 아닐때 초기값이 없으면 에러가 나나!', function () {
                    expect(function () {
                        var target = function Test() {}
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.INT,
                            {
                                nullishAble: false
                            }
                        )
                    }).to.throw();
                });
                it('option = { value : 5 } / nullishAble 상태일때 초기값이 세팅이 옵션되로 되는지 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.INT,
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
                        Rich.DEFINE_TYPE.INT,
                        {
                            value: 5
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = null
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test).to.equal(null);
                });
                it('option = { min : 5 } / nullishAble 일떄 nullish입력시 min, max를 무시하는지 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.INT,
                        {
                            value: null,
                            min: 5
                        }
                    )
                    var targetInstance = new target();
                    // targetInstance.keyName_test = null
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
                        Rich.DEFINE_TYPE.INT,
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