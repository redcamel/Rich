Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {

    describe('Test - 단위 유닛만 있을때 검증', function () {

        it('UINT', function () {
            expect(function () {
                var testData = {uintCheck: 12}
                Rich.checkSchema(testData, {
                    uintCheck: {
                        type: Rich.DEFINE_TYPE.UINT
                    }
                })
            }).to.not.throw();
        });
        it('INT', function () {
            expect(function () {
                var testData = {intCheck: -13}
                Rich.checkSchema(testData, {
                    intCheck: {
                        type: Rich.DEFINE_TYPE.INT
                    }
                })
            }).to.not.throw();
        });
        it('NUMBER', function () {
            expect(function () {
                var testData = {numberCheck: 14.1}
                Rich.checkSchema(testData, {
                    numberCheck: {
                        type: Rich.DEFINE_TYPE.NUMBER
                    }
                })
            }).to.not.throw();
        });
        it('BOOLEAN', function () {
            expect(function () {
                var testData = {trueCheck: true}
                Rich.checkSchema(testData, {
                    trueCheck: {
                        type: Rich.DEFINE_TYPE.BOOLEAN
                    }
                })
            }).to.not.throw();
        });
        it('BOOLEAN', function () {
            expect(function () {
                var testData = {falseCheck: false}
                Rich.checkSchema(testData, {
                    falseCheck: {
                        type: Rich.DEFINE_TYPE.BOOLEAN
                    }
                })
            }).to.not.throw();
        });
        describe('허용값 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.TYPE_LIST.STRING_NULLISH,
                function () {
                    it('입력값 : $testValue', function () {
                        expect(function () {
                            var testData = {stringCheck: $testValue}
                            Rich.checkSchema(testData, {
                                stringCheck: {
                                    type: Rich.DEFINE_TYPE.STRING
                                }
                            })
                        }).to.not.throw();
                    });
                }
            )
        });
        describe('허용값외 테스트', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.STRING_NULLISH
                ),
                function () {
                    it('입력값 : $testValue', function () {
                        expect(function () {
                            var testData = {stringCheck: $testValue}
                            Rich.checkSchema(testData, {
                                stringCheck: {
                                    type: Rich.DEFINE_TYPE.STRING
                                }
                            })
                        }).to.throw();
                    });
                }
            )
        });
        describe('허용값 테스트 ( nullishAble = false }', function () {
            ['문자열'].forEach(function (testValue) {
                it('입력값 : ' + testValue, function () {
                    var testData = {stringCheck: testValue}
                    var result = true;
                    try {
                        Rich.checkSchema(testData, {
                            stringCheck: {
                                type: Rich.DEFINE_TYPE.STRING,
                                option: {nullishAble: false}
                            }
                        })
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('허용값외 테스트 ( nullishAble = false }', function () {
            [null, undefined, -1.1, -1, 0, 1, 1.1, true, false, function () {}, {}].forEach(function (testValue) {
                it('입력값 : ' + testValue, function () {
                    var testData = {stringCheck: testValue}
                    var result = true;
                    try {
                        Rich.checkSchema(testData, {
                            stringCheck: {
                                type: Rich.DEFINE_TYPE.STRING,
                                option: {nullishAble: false}
                            }
                        })
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
    });
    describe('Test - 멀티 단위 유닛 검증', function () {
        it('1뎁스 검증 - 허용된 값이 들어올때', function () {
            var testData = {
                stringCheck: '이름',
                uintCheck: 12,
                intCheck: -13,
                numberCheck: 14.1,
                trueCheck: true,
                falseCheck: false
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    uintCheck: {type: Rich.DEFINE_TYPE.UINT},
                    intCheck: {type: Rich.DEFINE_TYPE.INT},
                    numberCheck: {type: Rich.DEFINE_TYPE.NUMBER},
                    trueCheck: {type: Rich.DEFINE_TYPE.BOOLEAN},
                    falseCheck: {type: Rich.DEFINE_TYPE.BOOLEAN}
                })
            }).to.not.throw();
        });
        it('1뎁스 검증 structInfo에 정의 되지 않은 값이 들어올떄', function () {
            var testData = {
                stringCheck: '이름',
                uintCheck: 12.1,
                intCheck: -13,
                numberCheck: 14.1,
                trueCheck: true,
                falseCheck: false
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    uintCheck: {type: Rich.DEFINE_TYPE.UINT},
                    intCheck: {type: Rich.DEFINE_TYPE.INT},
                    numberCheck: {type: Rich.DEFINE_TYPE.NUMBER},
                    trueCheck: {type: Rich.DEFINE_TYPE.BOOLEAN},
                    falseCheck: {type: Rich.DEFINE_TYPE.BOOLEAN}
                })
            }).to.throw()
        });
        it('2뎁스 검증 : ARRAY - 허용된 값이 들어올때 / 자식으로 기본값이 들어올떄', function () {
            var testData = {
                stringCheck: '이름',
                arrayCheck: TEST_HELPER.TYPE_LIST.INT_NULLISH
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    arrayCheck: {
                        type: Rich.DEFINE_TYPE.ARRAY,
                        childItem: {
                            type: Rich.DEFINE_TYPE.INT
                        }
                    }
                })
            }).to.not.throw()
        });
        it('2뎁스 검증 : ARRAY - 허용된 값이 들어올때  / 자식으로 기본값이 들어올떄', function () {
            var testData = {
                stringCheck: '이름',
                arrayCheck: TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.INT_NULLISH
                )
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    arrayCheck: {
                        type: Rich.DEFINE_TYPE.ARRAY,
                        childItem: {
                            type: Rich.DEFINE_TYPE.INT
                        }
                    }
                })
            }).to.throw()
        });
        it('2뎁스 검증 : ARRAY - 허용된 값이 들어올때 / 자식으로 배열을 허용할떄', function () {
            var testData = {
                stringCheck: '이름',
                arrayCheck: [
                    [1, 2, 3, 4],
                    [2, 3, 4, 5],
                    [1]
                ]
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    arrayCheck: {
                        type: Rich.DEFINE_TYPE.ARRAY,
                        childItem: {
                            type: Rich.DEFINE_TYPE.ARRAY
                        }
                    }
                })
            }).to.not.throw()
        });
        it('2뎁스 검증 : ARRAY - 허용되지 않은 값이 들어올때 / 자식으로 배열을 허용하는데 다른값이 들어올때', function () {
            var testData = {
                stringCheck: '이름',
                arrayCheck: [
                    [1, 2, 3, 4],
                    [2, 3, 4, 5],
                    {test: '이놈은 잘못된 녀석이니 막아야함'}
                ]
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    arrayCheck: {
                        type: Rich.DEFINE_TYPE.ARRAY,
                        childItem: {
                            type: Rich.DEFINE_TYPE.ARRAY
                        }
                    }
                })
            }).to.throw()
        });
        it('2뎁스 검증 : OBJECT - 허용된 값이 들어올때 / 자식으로 기본값이 들어올떄', function () {
            var testData = {
                stringCheck: '이름',
                objectCheck: {
                    depth2_1: -1,
                    depth2_2: -0,
                    depth2_3: 1
                }
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    objectCheck: {
                        type: Rich.DEFINE_TYPE.OBJECT,
                        struct: {
                            depth2_1: {type: Rich.DEFINE_TYPE.INT},
                            depth2_2: {type: Rich.DEFINE_TYPE.INT},
                            depth2_3: {type: Rich.DEFINE_TYPE.INT}
                        }
                    }
                })
            }).to.not.throw()
        });
        it('2뎁스 검증 : OBJECT - 허용되지 않는 값이 들어올때 / 자식으로 기본값이 들어올떄', function () {
            var testData = {
                stringCheck: '이름',
                objectCheck: {
                    depth2_1: -1.1,
                    depth2_2: -0.1,
                    depth2_3: 1.1
                }
            }
            expect(function () {
                Rich.checkSchema(testData, {
                    stringCheck: {type: Rich.DEFINE_TYPE.STRING},
                    objectCheck: {
                        type: Rich.DEFINE_TYPE.OBJECT,
                        struct: {
                            depth2_1: {type: Rich.DEFINE_TYPE.INT},
                            depth2_2: {type: Rich.DEFINE_TYPE.INT},
                            depth2_3: {type: Rich.DEFINE_TYPE.INT}
                        }
                    }
                })
            }).to.throw()
        });
    });
    describe('Test - 멀티 단위 유닛 검증', function () {
        it('structInfo에 정의 되지 않은 값이 들어올떄', function () {
            var testData = {
                stringCheck: '이름',
                uintCheck: 12,
                intCheck: -13,
                numberCheck: 14.1,
                trueCheck: true,
                falseCheck: false
            }
            var result = true;
            try {
                Rich.checkSchema(testData, {
                    stringCheck: {
                        type: Rich.DEFINE_TYPE.STRING
                    },
                    uintCheck: {
                        type: Rich.DEFINE_TYPE.UINT
                    },
                    intCheck: {
                        type: Rich.DEFINE_TYPE.INT
                    },
                    numberCheck: {
                        type: Rich.DEFINE_TYPE.NUMBER
                    },
                    trueCheck: {
                        type: Rich.DEFINE_TYPE.BOOLEAN
                    }
                })
            } catch (e) {
                result = false;
            }
            expect(result).to.be.false;

        });
        describe(' - 복합테스트', function () {
            it(' - 복합테스트', function () {
                var testData = {
                    stringCheck: '이름',
                    objectTest: {test: 1, test2: 2,},
                    objectTest2: {test1: {test1_1: 1.1}, test2: 2,},
                    arrayTest: [1, 2, 3, 4],
                    arrayTest2: [{testData: 1}],
                    arrayTest3: [{testData: [1, 2, 3, 5]}],
                    arrayTest4: [
                        [1, 2, 3, 5],
                        [1, 2, 3, 5]
                    ]
                }
                expect(function () {
                    Rich.checkSchema(testData, {
                        stringCheck: {type: 'STRING'},
                        objectTest: {type: 'OBJECT', struct: {test: {type: 'INT'}, test2: {type: 'UINT'}}},
                        objectTest2: {
                            type: 'OBJECT',
                            struct: {
                                test1: {type: 'OBJECT', struct: {test1_1: {type: 'NUMBER'}}},
                                test2: {type: 'UINT'}
                            }
                        },
                        arrayTest: {type: 'ARRAY', childItem: {type: 'INT'}},
                        arrayTest2: {type: 'ARRAY', childItem: {type: 'OBJECT', struct: {testData: {type: 'INT'}}}},
                        arrayTest3: {
                            type: 'ARRAY',
                            childItem: {type: 'OBJECT', struct: {testData: {type: 'ARRAY', childItem: {type: 'INT'}}}}
                        },
                        arrayTest4: {type: 'ARRAY', childItem: {type: 'ARRAY', childItem: {type: 'INT'}}}
                    })
                }).to.not.throw();


            });
        });
    });
    TEST_HELPER();
});
