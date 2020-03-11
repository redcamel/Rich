"use strict";
Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe(
        'Rich.STORAGE Test',
        function () {
            it("초기 모드 확인 - 초기모드는 로컬", function () {
                expect(Rich.STORAGE.mode === Rich.STORAGE.LOCAL).to.be.true
            })
            it("모드 변경 확인 - 세션으로 변경", function () {
                Rich.STORAGE.mode = Rich.STORAGE.SESSION
                expect(Rich.STORAGE.mode === Rich.STORAGE.SESSION).to.be.true
            })
            it("모드 변경 확인 - 다시 로컬모드로 변경", function () {
                Rich.STORAGE.mode = Rich.STORAGE.LOCAL
                expect(Rich.STORAGE.mode === Rich.STORAGE.LOCAL).to.be.true
            })
        }
    )
    describe(
        'Rich.STORAGE localStorage Test',
        function () {
            it("초기 모드 확인 - 모드는 로컬", function () {
                Rich.STORAGE.mode = Rich.STORAGE.LOCAL
                expect(Rich.STORAGE.mode === Rich.STORAGE.LOCAL).to.be.true
            }),
                it("모드 변경 확인 - 숫자를 입력했을때", function () {
                    Rich.STORAGE.S('test2', 1)
                    expect(Rich.STORAGE.S('test2') === 1).to.be.true
                }),
                it("모드 변경 확인 - 문자로 숫자를 입력했을때", function () {
                    Rich.STORAGE.S('test3', '1')
                    expect(Rich.STORAGE.S('test3') === '1').to.be.true
                }),
                it("모드 변경 확인 - 문자를 입력했을때", function () {
                    Rich.STORAGE.S('test4', '문자')
                    expect(Rich.STORAGE.S('test4') === '문자').to.be.true
                }),
                it("모드 변경 확인 - 문자를 입력했을때", function () {
                    Rich.STORAGE.S('test5', '12px')
                    expect(Rich.STORAGE.S('test5') === '12px').to.be.true
                });
            (function () {
                var t0;
                t0 = {
                    test1: 1,
                    test2: 2
                }
                return it("모드 변경 확인 - 오브젝트를 입력했을떄", function () {
                    Rich.STORAGE.S('test6', t0)
                    expect(JSON.stringify(Rich.STORAGE.S('test6')) === JSON.stringify(t0)).to.be.true
                })
            })()
        }
    )
    describe(
        'Rich.STORAGE localStorage Test',
        function () {
            it("초기 모드 확인 - 모드는 로컬", function () {
                Rich.STORAGE.mode = Rich.STORAGE.SESSION
                expect(Rich.STORAGE.mode === Rich.STORAGE.SESSION)
            });
            it("모드 변경 확인 - 숫자를 입력했을때", function () {
                Rich.STORAGE.S('test2', 1)
                expect(Rich.STORAGE.S('test2') === 1).to.be.true
            });
            it("모드 변경 확인 - 문자로 숫자를 입력했을때", function () {
                Rich.STORAGE.S('test3', '1')
                expect(Rich.STORAGE.S('test3') === '1').to.be.true
            });
            it("모드 변경 확인 - 문자를 입력했을때", function () {
                Rich.STORAGE.S('test4', '문자')
                expect(Rich.STORAGE.S('test4') === '문자').to.be.true
            });
            it("모드 변경 확인 - 문자를 입력했을때", function () {
                Rich.STORAGE.S('test5', '12px')
                expect(Rich.STORAGE.S('test5') === '12px').to.be.true
            });
            (function () {
                var t0;
                t0 = {
                    test1: 1,
                    test2: 2
                }
                return it("모드 변경 확인 - 오브젝트를 입력했을떄", function () {
                    Rich.STORAGE.S('test6', t0)
                    expect(JSON.stringify(Rich.STORAGE.S('test6')) === JSON.stringify(t0)).to.be.true
                })
            })()
        }
    )
    TEST_HELPER();
})