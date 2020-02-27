Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    Rich.Css('#test-id::before').S('content', '"beforeTest"', 'background', 'red');
    Rich.Css('#test-id::after').S('content', '"afterTest"', 'background', 'red');

    describe('Test Rich.Css', function () {
        describe('Test tag', function () {
            it('test html - get/set', function () {
                Rich.Css('html').S('background', 'green')
                expect(Rich.Css('html').S('background')).to.equal('green');
            });
            it('test html - get/set', function () {
                Rich.Css('html').S('background', 'yellow')
                expect(Rich.Css('html').S('background')).to.equal('yellow');
            });
            it('test body - get/set', function () {
                Rich.Css('html').S('background', 'green')
                expect(Rich.Css('html').S('background')).to.equal('green');
            });
            it('test body - get/set', function () {
                Rich.Css('html').S('background', 'blue')
                expect(Rich.Css('html').S('background')).to.equal('blue');
            });
            it('test body - remove', function () {
                Rich.Css('html').remove()
                Rich.Css('body').remove()
                expect(Rich.Css('html').S('background')).to.be.empty;
            });
        });
        describe('Test id', function () {
            it('test #test-id - get/set', function () {
                Rich.Css('#test-id').S('background', 'yellow')
                expect(Rich.Css('#test-id').S('background')).to.equal('yellow');
            });
            it('test #test-id - get/set', function () {
                Rich.Css('#test-id').S('background', 'green')
                expect(Rich.Css('#test-id').S('background')).to.equal('green');
            });
        });
        describe('Test class', function () {
            it('test .test-class - get/set', function () {
                Rich.Css('.test-class').S('background', 'yellow')
                expect(Rich.Css('.test-class').S('background')).to.equal('yellow');
            });
            it('test test-class - get/set', function () {
                Rich.Css('.test-class').S('background', 'purple')
                expect(Rich.Css('.test-class').S('background')).to.equal('purple');
            });
        });
        describe('Test class', function () {
            it('test .test-class2 - get/set', function () {
                Rich.Css('.test-class2').S('background', 'yellow')
                expect(Rich.Css('.test-class2').S('background')).to.equal('yellow');
            });
            it('test test-class2 - get/set', function () {
                Rich.Css('.test-class2').S('background', 'purple')
                expect(Rich.Css('.test-class2').S('background')).to.equal('purple');
            });
        });
        describe('Test first-child', function () {
            it('test button:first-child - get/set', function () {
                Rich.Css('button:first-child').S('background', 'yellow')
                expect(Rich.Css('button:first-child').S('background')).to.equal('yellow');
            });
        });
        describe('Test last-child', function () {
            it('test button:last-child - get/set', function () {
                Rich.Css('button:last-child').S('background', 'blue')
                expect(Rich.Css('button:last-child').S('background')).to.equal('blue');
            });
        });
        describe('Test nth-child', function () {
            it('test .test-class2:nth-child(1) - get/set', function () {
                Rich.Css('.test-class2:nth-child(1)').S('background', 'yellow')
                expect(Rich.Css('.test-class2:nth-child(1)').S('background')).to.equal('yellow');
            });
            it('test .test-class2:nth-child(odd) - get/set', function () {
                Rich.Css('.test-class2:nth-child(odd)').S('background', 'yellow')
                expect(Rich.Css('.test-class2:nth-child(odd)').S('background')).to.equal('yellow');
            });
            it('test .test-class2:nth-child(even) - get/set', function () {
                Rich.Css('.test-class2:nth-child(even)').S('background', 'blue')
                expect(Rich.Css('.test-class2:nth-child(even)').S('background')).to.equal('blue');
            });
        });
        describe('Test keyName', function () {
            it('test keyName', function () {
                Rich.Css('button').S('padding-left', 10)
                expect(Rich.Css('button').S('padding-left')).to.equal(10);
            });
            it('test keyName', function () {
                Rich.Css('button').S('paddingLeft', 20)
                expect(Rich.Css('button').S('padding-left')).to.equal(20);
            });
            it('test keyName', function () {
                Rich.Css('button').S('padding-right', '10%')
                expect(Rich.Css('button').S('padding-right')).to.equal('10%');
            });
        });
        describe('Test unit', function () {
            it('test unit', function () {
                Rich.Css('button').S('margin-left', 10)
                expect(Rich.Css('button').S('margin-left')).to.equal(10);
            });
            it('test unit', function () {
                Rich.Css('button').S('margin-left', '20%')
                expect(Rich.Css('button').S('margin-left')).to.equal('20%');
            });
            it('test unit', function () {
                Rich.Css('button').S('margin-left', '10em')
                expect(Rich.Css('button').S('margin-left')).to.equal('10em');
            });

        });
        describe('Test remove', function () {

            it('test unit', function () {
                Rich.Css('button').remove()
                expect(Rich.Css('button').S('margin-left')).to.equal('');
            });
        });
    });
    checkState()
})
