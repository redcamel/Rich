Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    // describe('Test - 단위 유닛만 있을때 검증', function () {
    //
    //     it('UINT', function () {
    //         var testData = {
    //             uintCheck: 12
    //         }
    //         var result = true;
    //         try {
    //             Rich.checkSchema(testData, {
    //                 uintCheck: {
    //                     type: Rich.DEFINE_TYPE.UINT
    //                 }
    //             })
    //         } catch (e) {
    //             result = false;
    //         }
    //         expect(result).to.be.true;
    //         console.log(this)
    //
    //     });
    //     it('INT', function () {
    //         var testData = {
    //             intCheck: -13
    //         }
    //         var result = true;
    //         try {
    //             Rich.checkSchema(testData, {
    //                 intCheck: {
    //                     type: Rich.DEFINE_TYPE.INT
    //                 }
    //             })
    //         } catch (e) {
    //             result = false;
    //         }
    //         expect(result).to.be.true;
    //     });
    //     it('NUMBER', function () {
    //         var testData = {
    //             numberCheck: 14.1
    //         }
    //         var result = true;
    //         try {
    //             Rich.checkSchema(testData, {
    //                 numberCheck: {
    //                     type: Rich.DEFINE_TYPE.NUMBER
    //                 }
    //             })
    //         } catch (e) {
    //             result = false;
    //         }
    //         expect(result).to.be.true;
    //     });
    //     it('BOOLEAN', function () {
    //         var testData = {
    //             trueCheck: true
    //         }
    //         var result = true;
    //         try {
    //             Rich.checkSchema(testData, {
    //                 trueCheck: {
    //                     type: Rich.DEFINE_TYPE.BOOLEAN
    //                 }
    //             })
    //         } catch (e) {
    //             result = false;
    //         }
    //         expect(result).to.be.true;
    //     });
    //     it('BOOLEAN', function () {
    //         var testData = {
    //             falseCheck: false
    //         }
    //         var result = true;
    //         try {
    //             Rich.checkSchema(testData, {
    //                 falseCheck: {
    //                     type: Rich.DEFINE_TYPE.BOOLEAN
    //                 }
    //             })
    //         } catch (e) {
    //             result = e;
    //         }
    //         expect(result).to.be.true;
    //     });
    //
    //     describe('허용값 테스트', function () {
    //         ['문자열', null, undefined].forEach(function (testValue) {
    //             it('입력값 : ' + testValue, function () {
    //                 var testData = {stringCheck: testValue}
    //                 var result = true;
    //                 try {
    //                     Rich.checkSchema(testData, {
    //                         stringCheck: {
    //                             type: Rich.DEFINE_TYPE.STRING
    //                         }
    //                     })
    //                 } catch (e) {
    //                     result = false;
    //                 }
    //                 expect(result).to.be.true;
    //             });
    //         });
    //     });
    //     describe('허용값외 테스트', function () {
    //         [-1.1, -1, 0, 1, 1.1, true, false, function () {}, {}].forEach(function (testValue) {
    //             it('입력값 : ' + testValue, function () {
    //                 var testData = {stringCheck: testValue}
    //                 var result = true;
    //                 try {
    //                     Rich.checkSchema(testData, {
    //                         stringCheck: {
    //                             type: Rich.DEFINE_TYPE.STRING
    //                         }
    //                     })
    //                 } catch (e) {
    //                     result = false;
    //                 }
    //                 expect(result).to.be.false;
    //             });
    //         });
    //     });
    //     describe('허용값 테스트 ( nullishAble = false }', function () {
    //         ['문자열'].forEach(function (testValue) {
    //             it('입력값 : ' + testValue, function () {
    //                 var testData = {stringCheck: testValue}
    //                 var result = true;
    //                 try {
    //                     Rich.checkSchema(testData, {
    //                         stringCheck: {
    //                             type: Rich.DEFINE_TYPE.STRING,
    //                             option: {nullishAble: false}
    //                         }
    //                     })
    //                 } catch (e) {
    //                     result = false;
    //                 }
    //                 expect(result).to.be.true;
    //             });
    //         });
    //     });
    //     describe('허용값외 테스트 ( nullishAble = false }', function () {
    //         [null, undefined, -1.1, -1, 0, 1, 1.1, true, false, function () {}, {}].forEach(function (testValue) {
    //             it('입력값 : ' + testValue, function () {
    //                 var testData = {stringCheck: testValue}
    //                 var result = true;
    //                 try {
    //                     Rich.checkSchema(testData, {
    //                         stringCheck: {
    //                             type: Rich.DEFINE_TYPE.STRING,
    //                             option: {nullishAble: false}
    //                         }
    //                     })
    //                 } catch (e) {
    //                     result = false;
    //                 }
    //                 expect(result).to.be.false;
    //             });
    //         });
    //     });
    // });
    // describe('Test - 멀티 단위 유닛 검증', function () {
    //     it('멀티 유닛 검증', function () {
    //         var testData = {
    //             stringCheck: '이름',
    //             uintCheck: 12,
    //             intCheck: -13,
    //             numberCheck: 14.1,
    //             trueCheck: true,
    //             falseCheck: false
    //         }
    //         var result = true;
    //         try {
    //             Rich.checkSchema(testData, {
    //                 stringCheck: {
    //                     type: Rich.DEFINE_TYPE.STRING
    //                 },
    //                 uintCheck: {
    //                     type: Rich.DEFINE_TYPE.UINT
    //                 },
    //                 intCheck: {
    //                     type: Rich.DEFINE_TYPE.INT
    //                 },
    //                 numberCheck: {
    //                     type: Rich.DEFINE_TYPE.NUMBER
    //                 },
    //                 trueCheck: {
    //                     type: Rich.DEFINE_TYPE.BOOLEAN
    //                 },
    //                 falseCheck: {
    //                     type: Rich.DEFINE_TYPE.BOOLEAN
    //                 }
    //             })
    //
    //         } catch (e) {
    //             result = e
    //         }
    //         expect(result).to.be.true;
    //     });
    //     it('structInfo에 정의 되지 않은 값이 들어올떄', function () {
    //         var testData = {
    //             stringCheck: '이름',
    //             uintCheck: 12,
    //             intCheck: -13,
    //             numberCheck: 14.1,
    //             trueCheck: true,
    //             falseCheck: false
    //         }
    //         var result = true;
    //         try {
    //             Rich.checkSchema(testData, {
    //                 stringCheck: {
    //                     type: Rich.DEFINE_TYPE.STRING
    //                 },
    //                 uintCheck: {
    //                     type: Rich.DEFINE_TYPE.UINT
    //                 },
    //                 intCheck: {
    //                     type: Rich.DEFINE_TYPE.INT
    //                 },
    //                 numberCheck: {
    //                     type: Rich.DEFINE_TYPE.NUMBER
    //                 },
    //                 trueCheck: {
    //                     type: Rich.DEFINE_TYPE.BOOLEAN
    //                 }
    //             })
    //         } catch (e) {
    //             result = false;
    //         }
    //         expect(result).to.be.false;
    //
    //     });
    describe('TODO - 배열이 있을떄 어떻게 처리해야하나', function () {
        it('TODO - 배열이 있을떄 어떻게 처리해야하나', function () {
            var testData = {
                stringCheck: '이름',
                objectTest: {
                    test: 1,
                    test2: 2,
                },
                objectTest2: {
                    test1: {
                        test1_1: 1.1
                    },
                    test2: 2,
                },
                arrayTest: [
                    1,
                    2,
                    3,
                    4
                ],
                arrayTest2: [
                    {
                        testData: 1
                    }
                ],
                arrayTest3: [
                    {
                        testData: [1, 2, 3, 5]
                    }
                ]
            }

            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: 'STRING'},
                    objectTest: {
                        type: 'OBJECT',
                        struct: {
                            test: {type: 'INT'},
                            test2: {type: 'UINT'}
                        }
                    },
                    objectTest2: {
                        type: 'OBJECT',
                        struct: {
                            test1: {
                                type: 'OBJECT',
                                struct: {
                                    test1_1: {type: 'NUMBER'}
                                }
                            },
                            test2: {type: 'UINT'}
                        }
                    },
                    arrayTest: {
                        type: 'ARRAY',
                        childItem: {type: 'INT'}
                    },
                    arrayTest2: {
                        type: 'ARRAY',
                        childItem: {
                            type: 'OBJECT',
                            struct: {
                                testData: {type: 'INT'}
                            }
                        }
                    },
                    arrayTest3: {
                        type: 'ARRAY',
                        childItem: {
                            type: 'OBJECT',
                            struct: {
                                testData: {
                                    type: 'ARRAY',
                                    childItem: {type: 'INT'}
                                }
                            }
                        }
                    }
                })
            }).to.not.throw();


        });
    });
    // });


    TEST_HELPER();
});
