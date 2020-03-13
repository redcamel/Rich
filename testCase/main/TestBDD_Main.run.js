Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test init - 초기화 체크', function () {
        it('기본 초기화', function () {
            return Rich.init().then(function (result) {
                expect(result).to.equal(Rich)
            })
        })
        it('js파일 실패후 catch로 처리되는지', function () {
            return Rich.init('Test23.js')
                .catch(function (failRes) {
                    console.log('실패테스트', failRes)
                    expect(failRes.ok).to.equal(false)
                })
        })
        it('js파일 로딩하고 초기화 되는지 확인', function () {
            return Rich.init('../asset/test2.js')
                .then(function (result) {
                    console.log('this', this)
                    console.log('성공테스트', result)
                    expect(result).to.equal(Rich)
                })
        })
    });
    describe('Test addMethod', function () {
        describe('Test nameKey', function () {
            it('name : 소문자로 시작하는거 체킹되는지 / 입력값 :  testMethodDefine', function () {
                expect(function () {
                    Rich.addMethod('testMethodDefine', function (v) {
                        console.log(v)
                    })
                }).to.not.throw();
            });
            it('name : 소문자로 시작하는거 체킹되는지 / 입력값 :  TestMethodDefine', function () {
                expect(function () {
                    Rich.addMethod('TestMethodDefine', function (v) {
                        console.log(v)
                    })
                }).to.throw();
            });
            it('name : 중복정의 체킹되는지', function () {
                expect(function () {
                    Rich.addMethod('testMethodDuplication', function (v) {
                        console.log(v)
                    })
                    Rich.addMethod('testMethodDuplication', function (v) {
                        console.log(v)
                    })
                }).to.throw();
            });
        });
        describe('Test value : 함수만 허용하는지', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.FUNCTION
                ),
                function () {
                    it('입력값 : $testValue', function () {
                        expect(function () {
                            Rich.addMethod('testMethodDefine_' + Math.random(), $testValue)
                        }).to.throw();
                    });
                }
            )
        });
    });
    describe('Test addClass', function () {
        describe('Test nameKey', function () {
            it('name : 대문자로 시작하는거 체킹되는지 / 입력값 : TestClassDefine', function () {
                expect(function () {
                    Rich.addClass('TestClassDefine', function (v) {
                        console.log(v)
                    })
                }).to.not.throw();
            });
            it('name : 대문자로 시작하는거 체킹되는지 / 입력값 : testClassDefine', function () {
                expect(function () {
                    Rich.addClass('testClassDefine', function (v) {
                        console.log(v)
                    })
                }).to.throw();
            });
            it('name : 중복정의 체킹되는지', function () {
                expect(function () {
                    Rich.addClass('TestClassDuplication', function (v) {
                        console.log(v)
                    })
                    Rich.addClass('TestClassDuplication', function (v) {
                        console.log(v)
                    })
                }).to.throw();
            });
        });
        describe('Test value : 함수만 허용하는지', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.FUNCTION
                ),
                function () {
                    it('입력값 : $testValue', function () {
                        expect(function () {
                            Rich.addClass('testClassDefine_' + Math.random(), $testValue)
                        }).to.throw();
                    });
                }
            )
        })
    });
    describe('Test addStatic', function () {
        describe('Test nameKey', function () {
            it('name : 대문자만 허용하는지 / 입력값 :  TEST_STATIC_OBJECT', function () {
                expect(function () {
                    Rich.addStatic('TEST_STATIC_OBJECT', {})
                }).to.not.throw();
            });
            it('name : 대문자만 허용하는지 / 입력값 :  test_static_object', function () {
                expect(function () {
                    Rich.addStatic('test_static_object', {})
                }).to.throw();
            });
            it('name : 중복정의 체킹되는지', function () {
                expect(function () {
                    Rich.addStatic('TEST_STATIC_OBJECT_DUPLICATION', {})
                    Rich.addStatic('TEST_STATIC_OBJECT_DUPLICATION', {})
                }).to.throw();
            });
        });
        describe('Test value : 오브젝트만 허용하는지', function () {
            TEST_HELPER.makeTestByList(
                TEST_HELPER.removeItem(
                    TEST_HELPER.TYPE_LIST.ALL,
                    TEST_HELPER.TYPE_LIST.OBJECT
                ),
                function () {
                    it('입력값 : $testValue', function () {
                        expect(function () {
                            Rich.addStatic('TEST_STATIC_OBJECT_DUPLICATION_' + Math.random(), $testValue)
                        }).to.throw();
                    });
                }
            )
        })
    });

    describe('Test throwError', function () {
        it('throwError', function () {
            var t0 = function () {
                Rich.throwError('throwError', 'test')
            };
            expect(t0).to.throw();
        })
    })

    describe('Test getParam', function () {
        it('getParam', function () {
            expect(Rich.getParam('testParams') === '1').to.be.true;
        })
        it('getParam', function () {
            expect(Rich.getParam('testParams2') === 'test').to.be.true;
        })
    })

    describe('TODO - makeAjax', function () {
        it('TODO')
    });
    describe('TODO - ajaxJsonGet', function () {
        it('TODO')
    });
    describe('TODO - ajaxJsonPost', function () {
        it('TODO')
    });
    TEST_HELPER();
})