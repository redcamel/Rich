Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test dispatcher : body', function () {
        ['down', 'up', 'over', 'out', 'click', 'move'].forEach(function (key, index) {
            Rich.Css('html').S('height', '100%');
            Rich.Css('body').S('height', '100%');
            it('Test - dispatcher : ' + key, function () {
                var result = key + '0';
                Rich.Dom('body').S(
                    key, function (e) {
                        console.log(key, e)
                        result = key + '1';
                    }
                )
                Rich.dispatcher(Rich.Dom('body'), key)
                expect(result === key + '1').to.be.true;

            })
        })
    });
    describe('Test dispatcher ', function () {
        [
            'over', 'out', 'down', 'up', 'move', 'click', 'dblclick', 'wheel',
            'blur', 'change', 'contextmenu', 'focus', 'input', 'invalid', 'reset', 'select', 'submit', 'search',
            'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll'
        ].forEach(function (key, index) {
            it('Test - dispatcher : ' + key, function () {
                var result = key + '0';
                var t0 = Rich.Dom('div').S(
                    key, function (e) {
                        console.log(key, e)
                        result = key + '1';
                    }
                )
                Rich.dispatcher(t0, key)
                expect(result === key + '1').to.be.true;

            })
        })
    });
    TEST_HELPER();
})