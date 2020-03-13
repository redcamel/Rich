Rich.init(
    'https://unpkg.com/mocha/mocha.css',
    "https://unpkg.com/chai/chai.js",
    "https://unpkg.com/mocha/mocha.js",
    "../asset/cssPage.css",
    "../TEST_HELPER.js"
).then(function () {
        describe(
            'Test - NUMBER',
            function () {
                make_NUMBER_INT_UINT_test(Rich.DEFINE_TYPE.NUMBER, 5.1, 10.1)
            }
        );
        describe(
            'Test - INT',
            function () {
                make_NUMBER_INT_UINT_test(Rich.DEFINE_TYPE.INT, 5, 10)
            }
        );
        describe(
            'Test - UINT',
            function () {
                make_NUMBER_INT_UINT_test(Rich.DEFINE_TYPE.UINT, 5, 10)
            }
        );
        describe(
            'Test - STRING',
            function () {
                make_STRING_BOOLEAN_FUNCTION_ARRAY_OBJECT(Rich.DEFINE_TYPE.STRING)
            }
        );
        describe(
            'Test - BOOLEAN',
            function () {
                make_STRING_BOOLEAN_FUNCTION_ARRAY_OBJECT(Rich.DEFINE_TYPE.BOOLEAN)
            }
        );
        describe(
            'Test - FUNCTION',
            function () {
                make_STRING_BOOLEAN_FUNCTION_ARRAY_OBJECT(Rich.DEFINE_TYPE.FUNCTION)
            }
        );
        describe(
            'Test - ARRAY',
            function () {
                make_STRING_BOOLEAN_FUNCTION_ARRAY_OBJECT(Rich.DEFINE_TYPE.ARRAY)
            }
        );
        describe(
            'Test - OBJECT',
            function () {
                make_STRING_BOOLEAN_FUNCTION_ARRAY_OBJECT(Rich.DEFINE_TYPE.OBJECT)
            }
        );

        TEST_HELPER();
    }
);