Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test Rich.defineProperty( target, keyName, type, option, isCustomType = false )', function () {
        describe('Test - target : Object 확장이 아닐경우 테스트 => 전부 실패해야함', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.OBJECT, TEST_HELPER.TYPE_LIST.FUNCTION, TEST_HELPER.TYPE_LIST.ARRAY),
                ),
                function () {
                    it('target = $testValue', function () {

                        expect(function () {
                            Rich.defineProperty($testValue, 'keyName_' + $testValue, Rich.DEFINE_TYPE.NUMBER)
                        }).to.throw();
                    });
                }
            )
        });
        describe('Test - target : Object 확장일 경우 테스트 ( function(){}, class{}, {} ) => 전부 성공해야함', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.OBJECT, TEST_HELPER.TYPE_LIST.FUNCTION, TEST_HELPER.TYPE_LIST.ARRAY),
                function () {
                    it('target = $testValue', function () {
                        expect(function () {
                            Rich.defineProperty($testValue, 'keyName_' + $testValue, Rich.DEFINE_TYPE.NUMBER)
                        }).to.not.throw();
                    });
                }
            )

        });
        describe('Test - keyName', function () {
            describe('Test - 문자열이외 입력시 에러가 나는지=> 전부 실패해야함', function () {
                TEST_HELPER.makeTestByList(
                    TEST_HELPER.removeItem(
                        TEST_HELPER.TYPE_LIST.ALL,
                        TEST_HELPER.TYPE_LIST.STRING
                    ),
                    function () {
                        it('keyName = $testValue', function () {

                            expect(function () {
                                Rich.defineProperty(
                                    function () {},
                                    $testValue,
                                    Rich.DEFINE_TYPE.NUMBER
                                )
                            }).to.throw();
                        });
                    }
                )
            })
            describe('Test - 키가 중복 될떄 에러가 나는지 => 실패해야함', function () {
                it('keyName 중복 테스트', function () {
                    expect(function () {
                        var testTarget = function () {}
                        Rich.defineProperty(testTarget.prototype, 'testKeyNameDuplication', Rich.DEFINE_TYPE.NUMBER)
                        Rich.defineProperty(testTarget.prototype, 'testKeyNameDuplication', Rich.DEFINE_TYPE.NUMBER)
                    }).to.throw();
                });
            })
        });
        describe('Test - type', function () {
            describe('Test - 정의할수없는 타입을 입력함 => 실패해야함', function () {
                it('type = 정의할수없는 타입', function () {
                    expect(function () {
                        Rich.defineProperty(
                            function () { },
                            'keyName_test',
                            '정의할수없는 타입'
                        )
                    }).to.throw();
                });
            });
            describe('Test - 정의가능한 타입 입력 => 전부 성공해야함', function () {
                var TEST_LIST = []
                for (var k in Rich.DEFINE_TYPE) TEST_LIST.push(k)
                TEST_HELPER.makeTestByList(
                    TEST_LIST,
                    function () {
                        it('type = $testValue', function () {
                            expect(function () {
                                Rich.defineProperty(
                                    function () {},
                                    'keyName_' + $testValue,
                                    Rich.DEFINE_TYPE[$testValue],
                                )
                            }).to.not.throw();
                        });
                    }
                )
            });
        });
        describe('Test - option', function () {
            describe('Test - nullish 허용 테스트 ( null, undefined ) => 전부 성공해야함', function () {
                TEST_HELPER.makeTestByList(
                    TEST_HELPER.TYPE_LIST.NULLISH,
                    function () {
                        it('option = $testValue', function () {
                            expect(function () {
                                Rich.defineProperty(
                                    function () {
                                    },
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.NUMBER,
                                    $testValue
                                )
                            }).to.not.throw();
                        });
                    }
                )
            });
            describe('Test - 순수 Object or nullish 가 아닐경우 테스트 => 전부 실패해야함', function () {
                TEST_HELPER.makeTestByList(
                    TEST_HELPER.removeItem(
                        TEST_HELPER.TYPE_LIST.ALL,
                        TEST_HELPER.TYPE_LIST.OBJECT_NULLISH
                    ),
                    function () {
                        it('option = $testValue', function () {
                            expect(function () {
                                Rich.defineProperty(
                                    function () { },
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.NUMBER,
                                    $testValue
                                )
                            }).to.throw();
                        });
                    }
                )
            });
            describe('Test - 순수 Object or nullish 만 허용 ( {}, undefined, null )', function () {
                TEST_HELPER.makeTestByList(
                    TEST_HELPER.TYPE_LIST.OBJECT_NULLISH,
                    function () {
                        it('option = $testValue', function () {
                            expect(function () {
                                Rich.defineProperty(
                                    function () { },
                                    'keyName_test',
                                    Rich.DEFINE_TYPE.NUMBER,
                                    $testValue
                                )
                            }).to.not.throw();
                        });
                    }
                )

            })
            describe('Test - option의 세부항목의 기본값 테스트', function () {
                it('option 미설정시 option.nullishAble의 기본값은 true', function () {
                    var Target = function Target() {}
                    var resultOption = Rich.defineProperty(
                        Target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER
                    )
                    expect(resultOption.nullishAble).to.equal(true);
                });
            })
        });
    });
    TEST_HELPER();
})
;