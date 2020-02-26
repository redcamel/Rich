Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test Rich.defineProperty - 기본 인자 허용범위 체크 ', function () {
        describe('Test - target : Object 확장이 아닐경우 테스트 ( [1, "string", true, false, null, undefined] )', function () {
            [1, "string", true, false, null, undefined].forEach(function (target) {
                it('입력값 : ' + target, function () {
                    var result = true;
                    try {
                        Rich.defineProperty(target, 'keyName_' + target, Rich.defineProperty.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - target : Object 확장일 경우 테스트 ( function(){}, class{}, {} )', function () {
            [function () {
            }, {}].forEach(function (target) {
                it('입력값 : ' + target, function () {
                    var result = true;
                    try {
                        Rich.defineProperty(target, 'keyName_' + target, Rich.defineProperty.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });

        });
        describe('Test - keyName', function () {
            describe('Test - 문자열이외 입력시 에러가 나는지 ( [0, true, false, function () {}, {}, undefined, null, NaN ] )', function () {
                [0, true, false, function () {
                }, {}, undefined, null, NaN].forEach(function (keyName) {
                    it('입력값 : ' + keyName, function () {
                        var result = true;
                        try {
                            Rich.defineProperty(
                                function () {
                                },
                                keyName, Rich.defineProperty.NUMBER
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.false;
                    });
                });
            })
            describe('Test - 키가 중복 될떄 에러가 나는지', function () {
                it('keyName 중복 테스트', function () {
                    var testTarget = function () {
                    }
                    Rich.defineProperty(testTarget.prototype, 'testKeyNameDuplication', Rich.defineProperty.NUMBER)
                    var result = true;
                    try {
                        Rich.defineProperty(testTarget.prototype, 'testKeyNameDuplication', Rich.defineProperty.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            })
        });
        describe('Test - type', function () {
            it('입력값 : 정의할수없는 타입을 입력함', function () {
                var result = true;
                try {
                    Rich.defineProperty(
                        function () {
                        },
                        'keyName_test', ' 정의할수없는 타입을 입력함'
                    )
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.false;
            });
            for (var k in Rich.defineProperty) {
                it('입력값 : ' + k, function () {
                    var result = true;
                    try {
                        Rich.defineProperty(
                            function () {
                            },
                            'keyName_' + k, Rich.defineProperty[k]
                        )
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            }
        });
        describe('Test - option : nullish 허용 테스트 ( null, undefined )', function () {
            it('입력값 : null', function () {
                var result = true;
                try {
                    Rich.defineProperty(
                        function () {
                        },
                        'keyName_test', Rich.defineProperty.NUMBER, null
                    )
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.true;
            });
            it('입력값 : undefined', function () {
                var result = true;
                try {
                    Rich.defineProperty(
                        function () {
                        },
                        'keyName_test', Rich.defineProperty.NUMBER, undefined
                    )
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.true;
            });
        });
        describe('Test - option : 순수 Object가 아닐경우 테스트 ( 0, \'string\', true, false, function(){}, class{} )', function () {
            [0, 'string', true, false, function () {
            }].forEach(function (option) {
                it('입력값 : ' + option, function () {
                    var result = true;
                    try {
                        Rich.defineProperty(
                            function () {
                            },
                            'keyName_test', Rich.defineProperty.NUMBER, option
                        )
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - option : 순수 Object만 허용 ( {} )', function () {
            it('입력값 : ' + {}, function () {
                var result = true;
                try {
                    Rich.defineProperty(
                        function () {
                        },
                        'keyName_test', Rich.defineProperty.NUMBER, {}
                    )
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.true;
            });
        })
    });
    describe('Test - Number : ', function () {
        describe('Test - 허용범위 테스트', function () {
            [-1.1, -1, 0, 1, 1.1].forEach(function (v) {
                it('입력값 : ' + v, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.NUMBER)
                    var targetInstance = new target();
                    targetInstance.keyName_test = v;
                    expect(targetInstance.keyName_test === v).to.be.true;
                });
            });
        });
        describe('Test - 허용범위 외 테스트', function () {
            [NaN, null, undefined, true, false, '문자열', {}, function () {
            }].forEach(function (v) {
                it('입력값 : ' + v, function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.NUMBER)
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
                    Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.NUMBER)
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === 0).to.be.true;
                });
                it('초기값이 잘 지정되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.NUMBER,
                        {
                            value: -1
                        }
                    )
                    var targetInstance = new target();
                    expect(targetInstance.keyName_test === -1).to.be.true;
                });
            });
            describe('Test - 기본 범위 체크', function () {
                [-1.1, -1, 0, 1, 1.1].forEach(function (v) {
                    it('입력값 : ' + v + '허용되는지', function () {
                        var target = function Test() {
                        }
                        Rich.defineProperty(target.prototype, 'keyName_test', Rich.defineProperty.NUMBER)
                        console.log(target)
                        var targetInstance = new target();
                        var result = true;
                        try {
                            targetInstance.keyName_test = v;
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.true;
                    });
                });
            });
            describe('Test - option.min 테스트', function () {
                it('{ value : -10, min : -1 } : 초기값이 최소값 보다 작을때 최소값으로 치환되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.NUMBER,
                        {
                            value: -10,
                            min: -1
                        }
                    )

                    var targetInstance = new target();
                    console.log(targetInstance)
                    expect(targetInstance.keyName_test == -1).to.be.true;
                });
                it('{  min : -1 } : 입력값이 최소값 보다 작을때 최소값으로 치환되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.NUMBER,
                        {
                            min: -1
                        }
                    )

                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = -2;
                    expect(targetInstance.keyName_test == -1).to.be.true;
                });
            });
            describe('Test - option.max 테스트', function () {
                it('{ value : 10, max : 5 } : 초기값이 최대값보다 클때 최대값으로 치환되는지', function () {
                    var target = function Test() {
                    }
                    Rich.defineProperty(
                        target.prototype,
                        'keyName_test',
                        Rich.defineProperty.NUMBER,
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
                        Rich.defineProperty.NUMBER,
                        {
                            max: 5
                        }
                    )
                    var targetInstance = new target();
                    console.log(targetInstance)
                    targetInstance.keyName_test = 10
                    expect(targetInstance.keyName_test == 5).to.be.true;
                });
            });
            describe('Test - option.step 테스트', function () {
                it('TODO', function () {
                })
            });
            describe('Test - option.nullishAble 테스트', function () {
                it('TODO - {  value : null, nullishAble : true } : nullishAble 상태일때 초기값이 null로 허용되나 체크', function () {

                });
            });
            describe('Test - option.callback 테스트', function () {
                it('TODO', function () {
                })
            });
        });


    });
    checkState();
});