var testRun = function(){
    mocha.run(failures => {
        console.log(failures)

        console.log('failures',failures)
        if (failures) {
            Rich.Dom('button').S(
                'position', 'fixed',
                'z-index',1,
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
        }
    });
}