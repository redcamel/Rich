Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {

    describe('Test - UINT', function () {
        describe('Test - 허용범위 테스트', function () {
            [0, 1, 2].forEach(function (v) {
                it('입력값 : ' + v, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.UINT)
                    var targetInstance = new target();
                    targetInstance.keyName_test = v;
                    expect(targetInstance.keyName_test === v).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 외 테스트', function () {
            [-2, -1, -1.1, 0.1, NaN, null, undefined, true, false, '문자열', {}, function () {
            }].forEach(function (v) {
                it('입력값 : ' + v, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.UINT)
                    console.log(target)
                    var targetInstance = new target();
                    var result = true;
                    try {
                        targetInstance.keyName_test = v;
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - option 테스트', function () {
            describe('Test - option.value 테스트', function () {
                it('초기값 옵션이 없을경우 0으로 생성되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.UINT)
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === 0).to.be.true;
                });
                it('{ value : 1 } 초기값이 잘 지정되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            value: 1
                        }
                    )
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === 1).to.be.true;
                });
                [0, 1].forEach(function (v) {
                    it('{ value : ' + v + ' } 초기값이 0이상의 정수만 허용하는지', function () {
                        var target = function Test() {
                        }
                        Rich.defineProperty(
                            target.prototype,
                            'keyName_test',
                            Rich.defineProperty.UINT,
                            {
                                value: v
                            }
                        )
                        var targetInstance = new target();
                        expect(targetInstance.keyName_test === v).to.be.true;
                    });
                });
                [0.1, 1.1].forEach(function (v) {
                    it('{ value : ' + v + ' } 초기값이 정수가 아닐경우 에러를 발생시키는지', function () {
                        var result = true
                        var target = function Test() {
                        }
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.defineProperty.UINT,
                                {
                                    value: v
                                }
                            )
                        } catch (e) {
                            result = false
                        }
                        expect(result).to.be.false;
                    });
                });
                [-2, -1].forEach(function (v) {
                    it('{ value : ' + v + ' } 초기값이 음수일경우 에러를 발생시키는지', function () {
                        var result = true
                        var target = function Test() {
                        }
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.defineProperty.UINT,
                                {
                                    value: v
                                }
                            )
                        } catch (e) {
                            result = false
                        }
                        expect(result).to.be.false;
                    });
                });
            });

            describe('Test - option.min 테스트', function () {
                it('{ value : 1, min : 2 } : 초기값이 최소값 보다 작을때 최소값으로 치환되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            value: 1,
                            min: 2
                        }
                    )

                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == 2).to.be.true;
                });
                it('{  min : 2 } : 입력값이 최소값 보다 작을때 최소값으로 치환되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            min: 2
                        }
                    )

                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = 1;
                    expect(targetInstance.keyName_test == 2).to.be.true;
                });
                [0.1, 1.1].forEach(function (v) {
                    it('{ min : ' + v + ' } 최소값이 정수가 아닐경우 에러를 발생시키는지', function () {
                        var result = true
                        var target = function Test() {
                        }
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.defineProperty.UINT,
                                {
                                    min: v
                                }
                            )
                        } catch (e) {
                            result = false
                        }
                        expect(result).to.be.false;
                    });
                });
                [-2, -1].forEach(function (v) {
                    it('{ min : ' + v + ' } 최소값이 음수일 경우 에러를 발생시키는지', function () {
                        var result = true
                        var target = function Test() {
                        }
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.defineProperty.UINT,
                                {
                                    min: v
                                }
                            )
                        } catch (e) {
                            result = false
                        }
                        expect(result).to.be.false;
                    });
                });
            });
            describe('Test - option.max 테스트', function () {
                it('{ value : 10, max : 5 } : 초기값이 최대값보다 클때 최대값으로 치환되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            value: 10,
                            max: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == 5).to.be.true;
                });
                it('{  max : 5 } : 입력값이 최대값보다 클때 최대값으로 치환되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            max: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = 10
                    expect(targetInstance.keyName_test == 5).to.be.true;
                });
                [0.1, 1.1].forEach(function (v) {
                    it('{ max : ' + v + ' } 최대값이 정수가 아닐경우 에러를 발생시키는지', function () {
                        var result = true
                        var target = function Test() {
                        }
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.defineProperty.UINT,
                                {
                                    max: v
                                }
                            )
                        } catch (e) {
                            result = false
                        }
                        expect(result).to.be.false;
                    });
                });
                [-2, -1].forEach(function (v) {
                    it('{ max : ' + v + ' } 최대값이 음수일 경우 에러를 발생시키는지', function () {
                        var result = true
                        var target = function Test() {
                        }
                        try {
                            Rich.defineProperty(
                                target.prototype,
                                'keyName_test',
                                Rich.defineProperty.UINT,
                                {
                                    max: v
                                }
                            )
                        } catch (e) {
                            result = false
                        }
                        expect(result).to.be.false;
                    });
                });
            });
            describe('Test - option.nullishAble 테스트', function () {
                it('{   nullishAble : true } : nullishAble 상태일때 초기값이 null로 세팅되나 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == null).to.be.true;
                });
                it('{ value : 5, nullishAble : true } : nullishAble 상태일때 초기값이 세팅이 옵션되로 되는지 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            value: 5,
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == 5).to.be.true;
                });
                it('{ value : 5, nullishAble : true } : nullishAble 실제 값을 set 했을때 허용되는지 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            value: 5,
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = null
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == null).to.be.true;
                });
                it('{ min : 5, nullishAble : true } : nullishAble 일떄 nullish입력시 min, max를 무시하는지 체크', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.UINT,
                        {
                            value: null,
                            min: 5,
                            nullishAble: true
                        }
                    )
                    var targetInstance = new target();
                    // targetInstance.keyName_test = null
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == null).to.be.true;
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
                        Rich.defineProperty.UINT,
                        {
                            callback: function () {
                                result = true
                            }
                        }
                    )
                    var targetInstance = new target();
                    targetInstance.keyName_test = 1
                    console.log(targetInstance)
                    expect(result).to.be.true;
                })
            });
        });
    });
    checkState();
});