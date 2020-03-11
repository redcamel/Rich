Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test init', function () {
        it('Test - 기본 초기화 체크', function () {
            return Rich.init().then(function (result) {
                expect(result === Rich).to.be.true
            })
        })
        it('Test - 기본 초기화 체크 : js파일 실패후 catch로 처리되는지', function () {
            return Rich.init('Test23.js')
                .catch(function (failRes) {
                    console.log('실패테스트', failRes)
                    expect(failRes.ok).to.be.false
                })
        })
        it('Test - 기본 초기화 체크 : js파일 로딩하고 초기화 되는지 확인', function () {
            return Rich.init('../asset/test2.js')
                .then(function (result) {
                    console.log('this', this)
                    console.log('성공테스트', result)
                    expect(result === Rich).to.be.true
                })
        })
    });
    describe('Test addMethod', function () {
        describe('Test nameKey', function () {
            it('Test - name : 소문자로 시작하는거 체킹되는지 : testMethodDefine', function () {
                var result = true;
                try {
                    Rich.addMethod('testMethodDefine', function (v) {
                        console.log(v)
                    })
                } catch (e) {
                    result = false
                }
                expect(result).to.be.true;
            });
            it('Test - name : 소문자로 시작하는거 체킹되는지 : TestMethodDefine', function () {
                var result = true;
                try {
                    Rich.addMethod('TestMethodDefine', function (v) {
                        console.log(v)
                    })
                } catch (e) {
                    result = false
                }
                expect(result).to.be.false;
            });
            it('Test - name : 중복정의 체킹되는지', function () {
                var result = true;
                Rich.addMethod('testMethodDuplication', function (v) {
                    console.log(v)
                })
                try {
                    Rich.addMethod('testMethodDuplication', function (v) {
                        console.log(v)
                    })
                } catch (e) {
                    result = false
                }
                expect(result).to.be.false;
            });
        });
        describe('Test value', function () {
            [NaN, -1.1, -1, 0, 1, 1.1, null, undefined, {}].forEach(function (v, index) {
                it('Test - value : 함수만 허용하는지 : ' + v, function () {
                    var result = true;
                    try {
                        Rich.addMethod('testMethodDefine_' + index, v)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        })
    });
    describe('Test addClass', function () {
        describe('Test nameKey', function () {
            it('Test - name : 대문자로 시작하는거 체킹되는지 : TestClassDefine', function () {
                var result = true;
                try {
                    Rich.addClass('TestClassDefine', function (v) {
                        console.log(v)
                    })
                } catch (e) {
                    result = false
                }
                expect(result).to.be.true;
            });
            it('Test - name : 대문자로 시작하는거 체킹되는지 : testClassDefine', function () {
                var result = true;
                try {
                    Rich.addClass('testClassDefine', function (v) {
                        console.log(v)
                    })
                } catch (e) {
                    result = false
                }
                expect(result).to.be.false;
            });
            it('Test - name : 중복정의 체킹되는지', function () {
                var result = true;
                Rich.addClass('TestClassDuplication', function (v) {
                    console.log(v)
                })
                try {
                    Rich.addClass('TestClassDuplication', function (v) {
                        console.log(v)
                    })
                } catch (e) {
                    result = false
                }
                expect(result).to.be.false;
            });
        });
        describe('Test value', function () {
            [NaN, -1.1, -1, 0, 1, 1.1, null, undefined, {}].forEach(function (v, index) {
                it('Test - value : 함수만 허용하는지 : ' + v, function () {
                    var result = true;
                    try {
                        Rich.addClass('testClassDefine_' + index, v)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        })
    });


    describe('Test addStatic', function () {
        describe('Test nameKey', function () {
            it('Test - name : 대문자만 허용하는지 : TEST_STATIC_OBJECT', function () {
                var result = true;
                try {
                    Rich.addStatic('TEST_STATIC_OBJECT', {})
                } catch (e) {
                    result = false
                }
                expect(result).to.be.true;
            });
            it('Test - name : 대문자만 허용하는지 : test_static_object', function () {
                var result = true;
                try {
                    Rich.addStatic('test_static_object', {})
                } catch (e) {
                    result = false
                }
                expect(result).to.be.false;
            });
            it('Test - name : 중복정의 체킹되는지', function () {
                var result = true;
                Rich.addStatic('TEST_STATIC_OBJECT_DUPLICATION', {})
                try {
                    Rich.addStatic('TEST_STATIC_OBJECT_DUPLICATION', {})
                } catch (e) {
                    result = false
                }
                expect(result).to.be.false;
            });
        });
        describe('Test value', function () {
            [NaN, -1.1, -1, 0, 1, 1.1, null, undefined, function () {
            }].forEach(function (v, index) {
                it('Test - value : 오브젝트만 허용하는지 : ' + v, function () {
                    var result = true;
                    try {
                        Rich.addStatic('TEST_STATIC_OBJECT_DUPLICATION_' + index, v)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        })
    });


    describe('Test throwError', function () {
        it('Test - throwError', function () {
            var t0 = function () {
                Rich.throwError('throwError', 'test')
            };
            expect(t0).to.throw();
        })
    })

    describe('Test getParam', function () {
        it('Test - getParam', function () {
            expect(Rich.getParam('testParams') === '1').to.be.true;
        })
        it('Test - getParam', function () {
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