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
                        Rich.defineProperty(target, 'keyName_' + target, Rich.DEFINE_TYPE.NUMBER)
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
                        Rich.defineProperty(target, 'keyName_' + target, Rich.DEFINE_TYPE.NUMBER)
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
                                keyName, Rich.DEFINE_TYPE.NUMBER
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
                        'keyName_test', Rich.DEFINE_TYPE.NUMBER, null
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
                        'keyName_test', Rich.DEFINE_TYPE.NUMBER, undefined
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
                            'keyName_test', Rich.DEFINE_TYPE.NUMBER, option
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
                        'keyName_test', Rich.DEFINE_TYPE.NUMBER, {}
                    )
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.true;
            });
        })
    });
    checkState();
});