Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test - STRING', function () {
        describe('Test - 허용범위 테스트', function () {
            ['문자열'].forEach(function (testValue) {
                it('{ nullishAble : false, value : "기본값" } 입력값 : ' + testValue, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.STRING,
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
            ['문자열', undefined, null].forEach(function (testValue) {
                it('{ nullishAble : true } 입력값 : ' + testValue, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.STRING,
                        {
                            nullishAble: true
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
        describe('Test - 허용범위 외 테스트', function () {
            [undefined, null, -1.1, -1, 0, 1, 1.1, NaN, true, false, {}, function () {
            }].forEach(function (testValue) {
                it('{ nullishAble : false, value : "기본값" } 입력값 : ' + testValue, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.STRING,
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
            [-1.1, -1, 0, 1, 1.1, NaN, true, false, {}, function () {
            }].forEach(function (testValue) {
                it('{ nullishAble : true } 입력값 : ' + testValue, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.STRING,
                        {
                            nullishAble: true
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
        describe('Test - option 테스트', function () {
            describe('Test - option.value 테스트', function () {
                it('초기값 옵션이 없고 nullishAble : true 가 아닐경우', function () {
                    var result = true
                    var target = function Test() {
                    }
                    try {
                        Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.STRING)
                    } catch (e) {
                        result = false
                    }
                    expect(result).to.be.false;
                });
                it('{ value : "문자열" } 초기값이 잘 지정되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.STRING,
                        {
                            value: "문자열"
                        }
                    )
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === "문자열").to.be.true;
                });
            });

            describe('Test - option.nullishAble 테스트', function () {
                it('{ nullishAble : true } : nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.STRING,
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
                        Rich.defineProperty.STRING,
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
                        Rich.defineProperty.STRING,
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
                        Rich.defineProperty.STRING,
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