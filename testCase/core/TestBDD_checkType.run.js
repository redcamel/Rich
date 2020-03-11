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
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.NUMBER_NULLISH),
                            function () {
                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.NUMBER )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER)
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
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL);
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.NUMBER_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {

                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.NUMBER )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER)
                                        }).to.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.NUMBER),
                            function () {

                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.NUMBER )'
                                    , function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER, {nullishAble: false})
                                        }).to.not.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트  ( nullishAble = false 일 경우 )',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL);
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.NUMBER);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {

                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.NUMBER )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER, {nullishAble: false})
                                        }).to.throw();
                                    }
                                );

                            }
                        )
                    })
                describe(
                    'Test - option.min ',
                    function () {
                        it(
                            'Rich.checkType( 1, Rich.DEFINE_TYPE.NUMBER, { min : 1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(1, Rich.DEFINE_TYPE.NUMBER, {min: 1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( -2, Rich.DEFINE_TYPE.NUMBER, { min : -1 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(-2, Rich.DEFINE_TYPE.NUMBER, {min: -1})
                                }).to.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 4, Rich.DEFINE_TYPE.NUMBER, { min : 5 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(4, Rich.DEFINE_TYPE.NUMBER, {min: 5})
                                }).to.throw();
                            }
                        );
                    }
                );
                describe(
                    'Test - option.max ',
                    function () {
                        it(
                            'Rich.checkType( 1, Rich.DEFINE_TYPE.NUMBER, { max : 1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(1, Rich.DEFINE_TYPE.NUMBER, {max: 1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( -2, Rich.DEFINE_TYPE.NUMBER, { max : -1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(-2, Rich.DEFINE_TYPE.NUMBER, {max: -1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 6, Rich.DEFINE_TYPE.NUMBER, { max : 5 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(6, Rich.DEFINE_TYPE.NUMBER, {max: 5})
                                }).to.throw();
                            }
                        );
                    }
                );
            }
        );
        describe(
            'Test - INT',
            function () {
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.INT_NULLISH),
                            function () {

                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.INT )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.INT)
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
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.INT_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {

                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.INT )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.INT)
                                        }).to.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.INT),
                            function () {

                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.INT )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.INT, {nullishAble: false})
                                        }).to.not.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.INT);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {

                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.INT )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.INT, {nullishAble: false})
                                        }).to.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - option.min ',
                    function () {
                        it(
                            'Rich.checkType( 1, Rich.DEFINE_TYPE.INT, { min : 1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(1, Rich.DEFINE_TYPE.INT, {min: 1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( -2, Rich.DEFINE_TYPE.INT, { min : -1 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(-2, Rich.DEFINE_TYPE.INT, {min: -1})
                                }).to.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 4, Rich.DEFINE_TYPE.INT, { min : 5 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(4, Rich.DEFINE_TYPE.INT, {min: 5})
                                }).to.throw();
                            }
                        );
                    }
                );
                describe(
                    'Test - option.max ',
                    function () {
                        it(
                            'Rich.checkType( 1, Rich.DEFINE_TYPE.INT, { max : 1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(1, Rich.DEFINE_TYPE.INT, {max: 1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( -2, Rich.DEFINE_TYPE.INT, { max : -1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(-2, Rich.DEFINE_TYPE.INT, {max: -1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 6, Rich.DEFINE_TYPE.INT, { max : 5 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(6, Rich.DEFINE_TYPE.INT, {max: 5})
                                }).to.throw();
                            }
                        );
                    }
                );
            }
        );
        describe(
            'Test - UINT',
            function () {
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.UINT_NULLISH),
                            function () {

                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.UINT )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT)
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
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.UINT_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {

                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.UINT )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT)
                                        }).to.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        TEST_HELPER.makeTestByList(
                            TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.UINT),
                            function () {

                                it(
                                    'Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT, {nullishAble: false})',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT, {nullishAble: false})
                                        }).to.not.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        var testList = TEST_HELPER.getTestTypeList(TEST_HELPER.TYPE_LIST.ALL)
                        testList = TEST_HELPER.removeItem(testList, TEST_HELPER.TYPE_LIST.UINT_NULLISH);
                        TEST_HELPER.makeTestByList(
                            testList,
                            function () {

                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.UINT )',
                                    function () {
                                        expect(function () {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT, {nullishAble: false})
                                        }).to.throw();
                                    }
                                );

                            }
                        )
                    }
                );
                describe(
                    'Test - option.min ',
                    function () {
                        it(
                            'Rich.checkType( 1, Rich.DEFINE_TYPE.UINT, { min : 1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(1, Rich.DEFINE_TYPE.UINT, {min: 1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 1, Rich.DEFINE_TYPE.UINT, { min : 2 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(1, Rich.DEFINE_TYPE.UINT, {min: 2})
                                }).to.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 4, Rich.DEFINE_TYPE.UINT, { min : 5 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(4, Rich.DEFINE_TYPE.UINT, {min: 5})
                                }).to.throw();
                            }
                        );
                    }
                );
                describe(
                    'Test - option.max ',
                    function () {
                        it(
                            'Rich.checkType( 1, Rich.DEFINE_TYPE.UINT, { max : 1 } ) / 성공해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(1, Rich.DEFINE_TYPE.UINT, {max: 1})
                                }).to.not.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 2, Rich.DEFINE_TYPE.UINT, { max : 1 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(2, Rich.DEFINE_TYPE.UINT, {max: 1})
                                }).to.throw();
                            }
                        );
                        it(
                            'Rich.checkType( 6, Rich.DEFINE_TYPE.UINT, { max : 5 } ) / 실패해야함',
                            function () {
                                expect(function () {
                                    Rich.checkType(6, Rich.DEFINE_TYPE.UINT, {max: 5})
                                }).to.throw();
                            }
                        );
                    }
                );
            }
        );
        describe(
            'Test - STRING',
            function () {
                describe(
                    'Test - 기본 허용범위 테스트',
                    function () {
                        ['문자열', '1', null, undefined].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( ' + (typeof testValue === 'string' ? '"' + testValue + '"' : testValue) + ', Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        [true, false, -1.1, -1, 0, 1, 1.1, NaN, function () {}, {}].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        ['문자열', '1',].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        [-1.1, -1, 0, 1, 1.1, NaN, function () {}, {}, null, undefined].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.STRING )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
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
                        [true, false, null, undefined].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( ' + (typeof testValue === 'string' ? '"' + testValue + '"' : testValue) + ', Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        [-1.1, -1, 0, 1, 1.1, NaN, function () {}, {}].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        [true, false].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        [-1.1, -1, 0, 1, 1.1, NaN, '문자열',
                            function () {}, {}, null, undefined].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.BOOLEAN )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
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
                        [function () {}, null, undefined].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( ' + (typeof testValue === 'string' ? '"' + testValue + '"' : testValue) + ', Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        [true, false - 1.1, -1, 0, 1, 1.1, NaN, {}].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        [function () {}].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        [true, false, -1.1, -1, 0, 1, 1.1, NaN, '문자열', {}, null, undefined].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.FUNCTION )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
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
                        [[], null, undefined].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.ARRAY)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트',
                    function () {
                        [true, false, -1.1, -1, 0, 1, 1.1, NaN, {}, function () {}].forEach(function (testValue) {
                                it(
                                    'Rich.checkType( testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.ARRAY)
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        [[]].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.ARRAY, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.true;
                                    }
                                );
                            }
                        );
                    }
                );
                describe(
                    'Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )',
                    function () {
                        [true, false, -1.1, -1, 0, 1, 1.1, NaN, '문자열', {}, null, undefined, function () {}].forEach(function (testValue) {
                                it(
                                    'option = { nullishAble : false } / Rich.checkType( testValue, Rich.DEFINE_TYPE.ARRAY )',
                                    function () {
                                        var result = true;
                                        try {
                                            Rich.checkType(testValue, Rich.DEFINE_TYPE.ARRAY, {nullishAble: false})
                                        } catch (e) {
                                            result = false
                                        }
                                        expect(result).to.be.false;
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
