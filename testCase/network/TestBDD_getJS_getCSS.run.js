Rich.init(
    "../asset/cssPage.css",
    "../checkState.js"
).then(function () {
    describe('Test Rich.getJS', function () {
        describe('Test 로딩 성공시 값 테스트', function () {
            it('then 테스트 - 로드 URL : ../asset/test.js', function () {
                return Rich.getJS('../asset/test.js')
                    .then(function (response) {
                        console.log('여기(then으로잡혔다)', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    });
            });
            it('then 테스트 - 로드 URL : ../asset/test.js / urlList값이 올바른지 확인', function () {
                return Rich.getJS('../asset/test.js')
                    .then(function (response) {
                        console.log('여기(then으로잡혔다)', response)
                        expect(response.urlList[0] === '../asset/test.js').to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    });
            });
            it('then 테스트 - 로드 URL : ../asset/test.js, ../asset/test2.js / urlList값이 올바른지 확인', function () {
                return Rich.getJS('../asset/test.js', '../asset/test2.js')
                    .then(function (response) {
                        console.log('여기(then으로잡혔다)', response)
                        console.log(response.urlList.join(','))
                        expect(response.urlList.join(',') === '../asset/test.js,../asset/test2.js').to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    });
            });
        });
        describe('Test error시 catch로 풀려나오는지 테스트', function () {
            it('catch 테스트 - 로드URL : failTest', function () {
                return Rich.getJS('failTest')
                    .then(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기(catch로잡혔다)', response)
                        expect(response.ok).to.be.false
                    });
            });

        });
        describe('Test 외부사이트 스크립트 로드', function () {
            it('외부js로드테스트 - 로드URL : https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js', function () {
                return Rich.getJS('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js')
                    .then(function (response) {
                        console.log('여기로와야함', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.false
                    });
            });

        });
        describe('Test urlList가 없을때', function () {
            it('urlList가 없을때 ', function () {
                return Rich.getJS()
                    .then(function (response) {
                        console.log('여기로와야함', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.false
                    });
            });

        });
    });
    ///////////////////////////////
    describe('Test Rich.getCSS', function () {
        describe('Test 로딩 성공시 값 테스트', function () {
            it('then 테스트 - 로드 URL : ../asset/test.css', function () {
                return Rich.getCSS('../asset/test.css')
                    .then(function (response) {
                        console.log('여기(then으로잡혔다)', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    });
            });
            it('then 테스트 - 로드 URL : ../asset/test.css / urlList값이 올바른지 확인', function () {
                return Rich.getCSS('../asset/test.css')
                    .then(function (response) {
                        console.log('여기(then으로잡혔다)', response)
                        expect(response.urlList[0] === '../asset/test.css').to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    });
            });
            it('then 테스트 - 로드 URL : ../asset/test.css, ../asset/test2.css / urlList값이 올바른지 확인', function () {
                return Rich.getCSS('../asset/test.css', '../asset/test2.css')
                    .then(function (response) {
                        console.log('여기(then으로잡혔다)', response)
                        console.log(response.urlList.join(','))
                        expect(response.urlList.join(',') === '../asset/test.css,../asset/test2.css').to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    });
            });
        });
        describe('Test error시 catch로 풀려나오는지 테스트', function () {
            it('catch 테스트 - 로드URL : failTest', function () {
                return Rich.getCSS('failTest')
                    .then(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기(catch로잡혔다)', response)
                        expect(response.ok).to.be.false
                    });
            });

        });
        describe('Test 외부사이트 스크립트 로드', function () {
            it('외부js로드테스트 - 로드URL : https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.css', function () {
                return Rich.getCSS('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.css')
                    .then(function (response) {
                        console.log('여기로와야함', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.false
                    });
            });

        });
        describe('Test urlList가 없을때', function () {
            it('urlList가 없을때 ', function () {
                return Rich.getCSS()
                    .then(function (response) {
                        console.log('여기로와야함', response)
                        expect(response.ok).to.be.true
                    })
                    .catch(function (response) {
                        console.log('여기로오면안됨', response)
                        expect(response.ok).to.be.false
                    });
            });

        })
    });
    checkState();
})