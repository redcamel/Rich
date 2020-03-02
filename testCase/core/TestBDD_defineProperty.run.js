Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test Rich.defineProperty( target, keyName, type, option, isCustomType = false )', function () {
        describe('Test - target : Object 확장이 아닐경우 테스트 ( [1, "string", true, false, null, undefined] ) => 전부 실패해야함', function () {
            [0, 1, "string", true, false, null, undefined].forEach(function (target) {
                it('target = ' + target, function () {
                    var result = true;
                    try {
                        Rich.defineProperty(target, 'keyName_' + target, Rich.DEFINE_TYPE.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - target : Object 확장일 경우 테스트 ( function(){}, class{}, {} ) => 전부 성공해야함', function () {
            [function () {}, {}].forEach(function (target) {
                it('target = ' + target, function () {
                    var result = true;
                    try {
                        Rich.defineProperty(target, 'keyName_' + target, Rich.DEFINE_TYPE.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });

        });
        describe('Test - keyName', function () {
            describe('Test - 문자열이외 입력시 에러가 나는지 ( [0, true, false, function () {}, {}, undefined, null, NaN ] ) => 전부 실패해야함', function () {
                [0, true, false, function () {}, {}, undefined, null, NaN].forEach(function (keyName) {
                    it('keyName = ' + keyName, function () {
                        var result = true;
                        try {
                            Rich.defineProperty(
                                function () {
                                },
                                keyName, Rich.DEFINE_TYPE.NUMBER
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.false;
                    });
                });
            })
            describe('Test - 키가 중복 될떄 에러가 나는지 => 전부 실패해야함', function () {
                it('keyName 중복 테스트', function () {
                    var testTarget = function () {
                    }
                    Rich.defineProperty(testTarget.prototype, 'testKeyNameDuplication', Rich.DEFINE_TYPE.NUMBER)
                    var result = true;
                    try {
                        Rich.defineProperty(testTarget.prototype, 'testKeyNameDuplication', Rich.DEFINE_TYPE.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            })
        });
        describe('Test - type', function () {
            describe('Test - 정의할수없는 타입을 입력함 => 전부 실패해야함', function () {
                it('type = 정의할수없는 타입', function () {
                    var result = true;
                    try {
                        Rich.defineProperty(
                            function () {
                            },
                            'keyName_test', ' 정의할수없는 타입'
                        )
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
            describe('Test - 정의가능한 타입 입력 => 전부 성공해야함', function () {
                for (var k in Rich.DEFINE_TYPE) {
                    it('type = ' + k, function () {
                        var result = true;
                        try {
                            Rich.defineProperty(
                                function () {},
                                'keyName_' + k,
                                Rich.DEFINE_TYPE[k]
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.true;
                    });
                }
            });
        });
        describe('Test - option', function () {
            describe('Test - nullish 허용 테스트 ( null, undefined ) => 전부 성공해야함', function () {
                it('option = null', function () {
                    var result = true;
                    try {
                        Rich.defineProperty(
                            function () {
                            },
                            'keyName_test',
                            Rich.DEFINE_TYPE.NUMBER,
                            null
                        )
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
                it('option = undefined', function () {
                    var result = true;
                    try {
                        Rich.defineProperty(
                            function () {
                            },
                            'keyName_test', Rich.DEFINE_TYPE.NUMBER, undefined
                        )
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });
            describe('Test - 순수 Object가 아닐경우 테스트 ( 0, \'string\', true, false, function(){}, class{} ) => 전부 실패해야함', function () {
                [0, 1, 'string', true, false, function () {}].forEach(function (option) {
                    it('option = ' + option, function () {
                        var result = true;
                        try {
                            Rich.defineProperty(
                                function () { },
                                'keyName_test',
                                Rich.DEFINE_TYPE.NUMBER,
                                option
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.false;
                    });
                });
            });
            describe('Test - 순수 Object or nullish 만 허용 ( {}, undefined, null )', function () {
                [{}, undefined, null].forEach(function (v) {
                    it('option = ' + v, function () {
                        var result = true;
                        try {
                            Rich.defineProperty(
                                function () { },
                                'keyName_test',
                                Rich.DEFINE_TYPE.NUMBER,
                                v
                            )
                        } catch (e) {
                            result = false;
                        }
                        expect(result).to.be.true;
                    });
                })
            })
            describe('Test - option의 세부항목의 기본값 테스트', function () {
                it('option 미설정시 option.nullishAble의 기본값은 true', function () {
                    var Target = function Target(){}
                    var resultOption = Rich.defineProperty(
                        Target.prototype,
                        'keyName_test',
                        Rich.DEFINE_TYPE.NUMBER
                    )
                    expect(resultOption.nullishAble).to.be.true;
                });
            })
        });
    });
    checkState();
});