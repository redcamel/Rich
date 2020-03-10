Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test - STRING', function () {
        describe('Test - 허용범위 테스트', function () {
            ['-1', '1', '문자열', null, undefined].forEach(function (testValue) {
                it('입력값 : ' + (typeof testValue == 'string' ? '"' + testValue + '"' : testValue), function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = testValue;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 테스트  ( option.nullishAble = false일때 )', function () {
            ['-1', '1', '문자열'].forEach(function (testValue) {
                it('{ nullishAble : false, value : "기본값" } / 입력값 : ' + (typeof testValue == 'string' ? '"' + testValue + '"' : testValue), function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: "기본값",
                            nullishAble: false
                        }
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = testValue;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 외 테스트 ( option.nullishAble = false일때 )', function () {
            [undefined, null, -1.1, -1, 0, 1, 1.1, NaN, true, false, {}, function () {}].forEach(function (testValue) {
                it('{ nullishAble : false, value : "기본값" } / 입력값 : ' + testValue, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: '기본값',
                            nullishAble: false
                        }
                    )
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = testValue;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });

        });
        describe('Test - option', function () {
            describe('Test - option.value 테스트', function () {
                it('option = null / nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test === null).to.be.true;
                });
                it('option = { nullishAble : true } / nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {}
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test === null).to.be.true;
                });
                it('option = { nullishAble : false } /  nullishAble 상태가 아닐때 초기값이 없으면 에러가 나나!', function () {
                    var target = function Test() {}
                    var result = true;
                    try {
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.DEFINE_TYPE.STRING,
                            {
                                nullishAble: false
                            }
                        )
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
                it('{ value : "초기값문자열" } 초기값이 잘 지정되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: "초기값문자열"
                        }
                    )
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === "초기값문자열").to.be.true;
                });
            });

            describe('Test - option.nullishAble 테스트', function () {
                it('{ nullishAble : true } : nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == null).to.be.true;
                });
                it('{ value : "초기값이 지정되어라", nullishAble : true } : nullishAble 상태일때 초기값이 세팅이 옵션되로 되는지 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: '초기값이 지정되어라',
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == '초기값이 지정되어라').to.be.true;
                });
                it('{ value : "초기값이 지정되어라", nullishAble : true } : nullishAble 실제 값을 set 했을때 허용되는지 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            value: "초기값이 지정되어라",
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = '변화된 값이 되어라'
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == '변화된 값이 되어라').to.be.true;
                });
            });
            describe('Test - option.allowList 테스트', function () {
                it('TODO - allowList', function () {

                })
            });
            describe('Test - option.callback 테스트', function () {
                it('콜백테스트', function () {
                    var result = false
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.STRING,
                        {
                            nullishAble: true,
                            callback: function () {
                                result = true
                            }
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = "값이닷!"
                    console.log(targetInstance)
                    expect(result).to.be.true;
                })
            });

        });


    });
    checkState();
});