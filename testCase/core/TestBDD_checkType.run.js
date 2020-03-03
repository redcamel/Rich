Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test - NUMBER', function () {
        describe('Test - 기본 허용범위 테스트', function () {
            [-1.1, -1, 0, 1, 1.1, null, undefined].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.NUMBER )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트', function () {
            [true, false, NaN, '문자열', function () {}, {}].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.NUMBER )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )', function () {
            [-1.1, -1, 0, 1, 1.1].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ',Rich.DEFINE_TYPE.NUMBER )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트  ( nullishAble = false 일 경우 )', function () {
            [true, false, NaN, '문자열', function () {}, {}, null, undefined].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.NUMBER )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.NUMBER, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        })
    });
    describe('Test - INT', function () {

        describe('Test - 기본 허용범위 테스트', function () {
            [-1, 0, 1, null, undefined].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.INT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.INT)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트', function () {
            [-1.1, 1.1, NaN, '문자열', function () {}, {}].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.INT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.INT)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )', function () {
            [-1, 0, 1].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.INT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.INT, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )', function () {
            [true, false, -1.1, 1.1, NaN, '문자열', function () {}, {}, null, undefined].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.INT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.INT, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
    });
    describe('Test - UINT', function () {
        describe('Test - 기본 허용범위 테스트', function () {
            [0, 1, null, undefined].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.UINT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트', function () {
            [true, false, -1.1, -1, 1.1, NaN, '문자열', function () {}, {}].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.UINT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )', function () {
            [0, 1].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.UINT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )', function () {
            [true, false, -1.1, -1, 1.1, NaN, '문자열', function () {}, {}, null, undefined].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.UINT )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.UINT, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
    });
    describe('Test - STRING', function () {
        describe('Test - 기본 허용범위 테스트', function () {
            ['문자열', '1', null, undefined].forEach(function (testValue) {
                it('Rich.checkType( ' + (typeof testValue === 'string' ? '"' + testValue + '"' : testValue) + ', Rich.DEFINE_TYPE.STRING )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트', function () {
            [true, false, -1.1, -1, 0, 1, 1.1, NaN, function () {}, {}].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.STRING )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )', function () {
            ['문자열', '1',].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.STRING )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )', function () {
            [-1.1, -1, 0, 1, 1.1, NaN, function () {}, {}, null, undefined].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.STRING )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.STRING, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
    });
    describe('Test - BOOLEAN', function () {
        describe('Test - 기본 허용범위 테스트', function () {
            [true, false, null, undefined].forEach(function (testValue) {
                it('Rich.checkType( ' + (typeof testValue === 'string' ? '"' + testValue + '"' : testValue) + ', Rich.DEFINE_TYPE.BOOLEAN )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트', function () {
            [-1.1, -1, 0, 1, 1.1, NaN, function () {}, {}].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.BOOLEAN )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )', function () {
            [true, false].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.BOOLEAN )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )', function () {
            [-1.1, -1, 0, 1, 1.1, NaN, '문자열', function () {}, {}, null, undefined].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.BOOLEAN )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.BOOLEAN, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
    });
    describe('Test - FUNCTION', function () {
        describe('Test - 기본 허용범위 테스트', function () {
            [function () {}, null, undefined].forEach(function (testValue) {
                it('Rich.checkType( ' + (typeof testValue === 'string' ? '"' + testValue + '"' : testValue) + ', Rich.DEFINE_TYPE.FUNCTION )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트', function () {
            [true, false - 1.1, -1, 0, 1, 1.1, NaN, {}].forEach(function (testValue) {
                it('Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.FUNCTION )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - 기본 허용범위 테스트 ( nullishAble = false 일 경우 )', function () {
            [function () {}].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.FUNCTION )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 기본 허용범위외 테스트 ( nullishAble = false 일 경우 )', function () {
            [true, false, -1.1, -1, 0, 1, 1.1, NaN, '문자열', {}, null, undefined].forEach(function (testValue) {
                it('option = { nullishAble : false } / Rich.checkType( ' + testValue + ', Rich.DEFINE_TYPE.FUNCTION )', function () {
                    var result = true;
                    try {
                        Rich.checkType(testValue, Rich.DEFINE_TYPE.FUNCTION, {nullishAble: false})
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
            });
        });
    });
    describe('Test - CUSTOM', function () {
        it('TODO', function () {})
    })
    checkState();
});
