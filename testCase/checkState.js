var expect = chai.expect;
var assert = chai.assert;
mocha.setup('bdd');
(function () {
// <div id="mocha">
//     <h1>Rich.getJS & Rich.getCSS TestCase</h1>
// </div>
    var t0 = document.createElement('div')
    var t1 = location.href.split('/')
    t1 = t1[t1.length - 1];
    t1 = t1.split('?');
    t1 = t1[0];
    t1 = t1.replace('.html', '')
    t0.setAttribute('id', 'mocha')
    t0.innerHTML = '<h1>' + t1 + ' TestCase</h1>'
    document.body.appendChild(t0)
})();

// mocha.checkLeaks();
var checkState = function () {
    mocha.run(function (failures) {
        console.log(failures)

        console.log('failures', failures)
        if (failures) {
            Rich.Dom('button').S(
                'position', 'fixed',
                'z-index', 1,
                'top', 15,
                'right', 15,
                'width', 40,
                'height', 40,
                'border', 0,
                'border-radius', '50%',
                'outline', 'none',
                'background', 'red',
                'color', '#fff',
                'html', 'Fail',
                '<', 'body'
            )
            Rich.Dom('#mocha-report').S('@className', 'fail')
        } else {
            Rich.Dom('button').S(
                'position', 'fixed',
                'z-index', 1,
                'top', 15,
                'right', 15,
                'width', 40,
                'height', 40,
                'border', 0,
                'border-radius', '50%',
                'outline', 'none',
                'background', '#fff',
                'color', '#000',
                'html', 'Pass',
                '<', 'body'
            )
            Rich.Dom('#mocha-report').S('@className', 'test pass fast')
        }
    });
}