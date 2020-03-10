Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe(
        "Rich.query(k) method Test",
        function () {
            describe(
                'Rich.query검색 관련',
                function () {
                    it("Rich.query - id로 잘 찾나", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@id', 'divTest')
                        expect(Rich.query('#divTest') === result).to.be.true
                    });
                    it("Rich.query - class로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@className', 'testDiv')
                        expect(Rich.query('.testDiv') === result).to.be.true
                    });
                    it("Rich.query - 속성으로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@data-attr', 'testAttr')
                        expect(Rich.query('[data-attr="testAttr"]') === result)
                    });
                    it("Rich.query - 태그 이름으로 잘 찾나 ", function () {
                        var result = Rich.Dom('testDiv').S('<', 'body')
                        expect(Rich.query('testDiv') === result).to.be.true
                    });
                    it("Rich.query - 없으면 null을 반환하는가", function () {
                        expect(Rich.query('noResultDivTagName')).to.be.null
                    });
                    it("Rich.query - useNative 옵션은 잘 동작 하나", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@className', 'testDiv2')
                        expect(Rich.query('.testDiv2', true) === result.dom)
                    })
                }
            );
            describe(
                'Rich.queryAll검색 관련',
                function () {
                    it("Rich.queryAll - id로 잘 찾나", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@id', 'div2')
                        expect(Rich.queryAll('#div2')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - class로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@className', 'testDiv3')
                        expect(Rich.queryAll('.testDiv3')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - 속성으로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@data-attr', 'testAttr2')
                        expect(Rich.queryAll('[data-attr="testAttr2"]')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - 태그 이름으로 잘 찾나 ", function () {
                        var result = Rich.Dom('testDiv2').S('<', 'body')
                        expect(Rich.queryAll('testDiv2')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - 없으면 빈 배열 반환하는가", function () {
                        expect(Rich.queryAll('noResultDivTagName').length === 0).to.be.true
                    });
                    it("Rich.queryAll - useNative 옵션은 잘 동작 하나", function () {
                        var result = Rich.Dom('div').S('<', 'body', '@className', 'testDiv4')
                        expect(Rich.queryAll('.testDiv4', true)[0] === result.dom).to.be.true
                    })
                }
            )
        }
    );
    describe(
        "(Rich.Dom instance) query(k) method Test",
        function () {
            var rootDom = Rich.Dom('div').S('@id', 'RichDomInstance', '<', 'body')
            describe(
                'Rich.query검색 관련',
                function () {

                    it("Rich.query - id로 잘 찾나", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@id', 'divTest')
                        expect(rootDom.query('#divTest') === result).to.be.true
                    });
                    it("Rich.query - class로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@className', 'testDiv')
                        expect(rootDom.query('.testDiv') === result).to.be.true
                    });
                    it("Rich.query - 속성으로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@data-attr', 'testAttr')
                        expect(rootDom.query('[data-attr="testAttr"]') === result)
                    });
                    it("Rich.query - 태그 이름으로 잘 찾나 ", function () {
                        var result = Rich.Dom('testDiv').S('<', rootDom)
                        expect(rootDom.query('testDiv') === result).to.be.true
                    });
                    it("Rich.query - 없으면 null을 반환하는가", function () {
                        expect(rootDom.query('noResultDivTagName')).to.be.null
                    });
                    it("Rich.query - useNative 옵션은 잘 동작 하나", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@className', 'testDiv2')
                        expect(rootDom.query('.testDiv2', true) === result.dom)
                    })
                }
            );
            describe(
                'Rich.queryAll검색 관련',
                function () {
                    it("Rich.queryAll - id로 잘 찾나", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@id', 'div2')
                        expect(rootDom.queryAll('#div2')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - class로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@className', 'testDiv3')
                        expect(rootDom.queryAll('.testDiv3')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - 속성으로 잘 찾나 ", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@data-attr', 'testAttr2')
                        expect(rootDom.queryAll('[data-attr="testAttr2"]')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - 태그 이름으로 잘 찾나 ", function () {
                        var result = Rich.Dom('testDiv2').S('<', rootDom)
                        expect(rootDom.queryAll('testDiv2')[0] === result).to.be.true
                    });
                    it("Rich.queryAll - 없으면 빈 배열 반환하는가", function () {
                        expect(rootDom.queryAll('noResultDivTagName').length === 0).to.be.true
                    });
                    it("Rich.queryAll - useNative 옵션은 잘 동작 하나", function () {
                        var result = Rich.Dom('div').S('<', rootDom, '@className', 'testDiv4')
                        expect(rootDom.queryAll('.testDiv4', true)[0] === result.dom).to.be.true
                    })
                }
            )
        }
    );
    checkState();
})