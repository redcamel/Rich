Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
    describe('Test dispatcher : body', function () {
        TEST_HELPER.makeTestByList(
            ['down', 'up', 'over', 'out', 'click', 'move'],
            function () {
                Rich.Css('html').S('height', '100%');
                Rich.Css('body').S('height', '100%');
                it('Test - dispatcher : ' + $testValue, function () {
                    var result = $testValue + '0';
                    Rich.Dom('body').S(
                        $testValue, function (e) {
                            console.log($testValue, e)
                            result = $testValue + '1';
                        }
                    )
                    Rich.dispatcher(Rich.Dom('body'), $testValue)
                    expect(result).to.equal($testValue + '1');

                })
            }
        )

    });
    describe('Test dispatcher ', function () {
        TEST_HELPER.makeTestByList(
            [
                'over', 'out', 'down', 'up', 'move', 'click', 'dblclick', 'wheel',
                'blur', 'change', 'contextmenu', 'focus', 'input', 'invalid', 'reset', 'select', 'submit', 'search',
                'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll'
            ],
            function () {
                it('Test - dispatcher : $testValue', function () {
                    var result = $testValue + '0';
                    var t0 = Rich.Dom('div').S(
                        $testValue, function (e) {
                            console.log($testValue, e)
                            result = $testValue + '1';
                        }
                    );
                    Rich.dispatcher(t0, $testValue);
                    expect(result).to.equal($testValue + '1');
                })
            }
        );
    });
    TEST_HELPER();
})