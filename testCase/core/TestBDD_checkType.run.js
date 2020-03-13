Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
        describe(
            'Test - NUMBER',
            function () {
                make_NUMBER_INT_UINT_test(Rich.DEFINE_TYPE.NUMBER, 5.1, 10.1)
            }
        );
        describe(
            'Test - INT',
            function () {
                make_NUMBER_INT_UINT_test(Rich.DEFINE_TYPE.INT, 5, 10)
            }
        );
        describe(
            'Test - UINT',
            function () {
                make_NUMBER_INT_UINT_test(Rich.DEFINE_TYPE.UINT, 5, 10)
            }
        );

        describe(
            'Test - STRING',
            function () {
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.STRING_NULLISH),
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.STRING)
                                        }).to.not.throw();
                                    }
                                );
                            }
                        )
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.STRING_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.STRING)
                                        }).to.throw();
                                    }
                                );
                            }
                        );

                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.STRING),
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.STRING, {nullishAble: false})
                                        }).to.not.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.STRING);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.STRING, {nullishAble: false})
                                        }).to.throw();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
        describe(
            'Test - BOOLEAN',
            function () {
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.BOOLEAN_NULLISH),
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.BOOLEAN)
                                        }).to.not.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.BOOLEAN_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.BOOLEAN)
                                        }).to.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.BOOLEAN),
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.BOOLEAN, {nullishAble: false})
                                        }).to.not.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.BOOLEAN);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        expect(function () {
                                            expect(result).to.be.false;
                                        }).to.throw();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
        describe(
            'Test - FUNCTION',
            function () {
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.FUNCTION_NULLISH),
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.FUNCTION)
                                        }).to.not.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.FUNCTION_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.FUNCTION)
                                        }).to.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.FUNCTION),
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.FUNCTION, {nullishAble: false})
                                        }).to.not.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.FUNCTION);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.FUNCTION, {nullishAble: false})
                                        }).to.throw();
                                    }
                                );
                            }
                        );

                    }
                );
            }
        );
        describe(
            'Test - ARRAY',
            function () {
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ARRAY_NULLISH),
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.ARRAY)
                                        }).to.not.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.ARRAY_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'Rich.checkType( $testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.ARRAY)
                                        }).to.throw();
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ARRAY),
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.ARRAY, {nullishAble: false})
                                        }).to.not.throw();
                                    }
                                );
                            }
                        );

                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.ARRAY);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( $testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType($testValue, Rich.DEFINE_TYPE.ARRAY, {nullishAble: false})
                                        }).to.throw();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
        TEST_HELPER();
    }
);