Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(_ => {
    describe('Test Rich.defineProperty - 기본 인자 허용범위 체크 ', function () {
        describe('Test - target : Object 확장이 아닐경우 테스트 ( [1, "string", true, false, null, undefined] )', function () {
            [1, "string", true, false, null, undefined].forEach(k => {
                it('Rich.defineProperty(target, type, option) - 정의 가능한 타입만 허용하는지 체크 : ' + k, function () {
                    let result = true;
                    try {
                        Rich.defineProperty(k, Rich.defineProperty.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - target : Object 확장일 경우 테스트 ( {}, function(){}, class{} )', function () {
            [{}, function () {
            }, class {
            }].forEach(k => {
                it('Rich.defineProperty(target, type, option) - 정의 가능한 타입만 허용하는지 체크 : ' + k, function () {
                    let result = true;
                    try {
                        Rich.defineProperty(k, Rich.defineProperty.NUMBER)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            });

        });
        describe('Test - type', function () {
            it('Rich.defineProperty(target, type, option) : 정의 가능한 타입만 허용하는지 체크', function () {
                let result = true;
                try {
                    Rich.defineProperty({}, '정의할수없는 타입을 입력함')
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.false;
            });
            for (let k in Rich.defineProperty) {
                it('Rich.defineProperty(target, type, option) : ' + k, function () {
                    let result = true;
                    try {
                        Rich.defineProperty({}, Rich.defineProperty[k])
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.true;
                });
            }
        });
        describe('Test - option : nullish 허용 테스트 ( null, undefined )', function () {
            it('Rich.defineProperty(target, type, option) : nullish 허용 ( null )', function () {
                let result = true;
                try {
                    Rich.defineProperty({}, Rich.defineProperty.NUMBER, null)
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.true;
            });
            it('Rich.defineProperty(target, type, option) : nullish 허용 ( undefined )', function () {
                let result = true;
                try {
                    Rich.defineProperty({}, Rich.defineProperty.NUMBER, undefined)
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.true;
            });
        });
        describe('Test - option : 순수 object가 아닐경우 테스트 ( 0, \'string\', true, false, function(){}, class{} )', function () {
            [0, 'string', true, false, function(){}, class{}].forEach(option => {
                it('Rich.defineProperty(target, type, option) - 정의 가능한 타입만 허용하는지 체크 : ' + option, function () {
                    let result = true;
                    try {
                        Rich.defineProperty({}, Rich.defineProperty.NUMBER, option)
                    } catch (e) {
                        result = false;
                    }
                    expect(result).to.be.false;
                });
            });
        });
        describe('Test - option : 순수 object만 허용 ( {} )', function () {
            it('Rich.defineProperty(target, type, option) - 정의 가능한 타입만 허용하는지 체크 : ' + {}, function () {
                let result = true;
                try {
                    Rich.defineProperty({}, Rich.defineProperty.NUMBER, {})
                } catch (e) {
                    result = false;
                }
                expect(result).to.be.true;
            });
        })
    });
    checkState();
});