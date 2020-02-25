describe('Test beforeLoop',function() {
	afterEach(function(){
		Rich.LOOPER.delAll();
	});
	describe('Test hasBeforeLoop', function () {
		it('test hasBeforeLoop', function () {
			expect(Rich.LOOPER.hasBeforeLoop('test')).to.be.false;
		});
		it('test hasBeforeLoop', function () {
			Rich.LOOPER.addBeforeLoop('test', function () {
			});
			expect(Rich.LOOPER.hasBeforeLoop('test')).to.be.true;
		});
	});
	describe('Test getBeforeLoop', function () {
		var testFunc = function () {
			console.log("testFunc")
		};
		it('test - getBeforeLoop', function () {
			expect(Rich.LOOPER.getBeforeLoop('getTest')).to.be.undefined;
		});
		it('test - addBeforeLoop', function () {
			Rich.LOOPER.addBeforeLoop('getTest', testFunc);
			expect(Rich.LOOPER.getBeforeLoop('getTest')).to.be.equal(testFunc);
		});
	});
	describe('Test getBeforeLoopList', function () {
		var testFunc = function () {
			console.log("testFunc")
		};
		var testFunc2 = function () {
			console.log("testFunc2")
		};
		it('test - getBeforeLoopList', function () {
			expect(Rich.LOOPER.getBeforeLoopList()).to.have.lengthOf(0);
		});
		it('test - getBeforeLoopList', function () {
			Rich.LOOPER.addBeforeLoop('getTest', testFunc);
			expect(Rich.LOOPER.getBeforeLoopList()).to.have.lengthOf(1);
		});
		it('test - getBeforeLoopList', function () {
			Rich.LOOPER.addBeforeLoop('getTest1', testFunc);
			Rich.LOOPER.addBeforeLoop('getTest2', testFunc2);
			expect(Rich.LOOPER.getBeforeLoopList()[0]).to.be.equal(testFunc);
		});
		it('test - getBeforeLoopList', function () {
			Rich.LOOPER.addBeforeLoop('getTest1', testFunc);
			Rich.LOOPER.addBeforeLoop('getTest2', testFunc2);
			expect(Rich.LOOPER.getBeforeLoopList()[1]).to.be.equal(testFunc2);
		});
	});
	describe('Test addBeforeLoop', function () {
		it('test - addBeforeLoop define', function () {
			Rich.LOOPER.addBeforeLoop('test', function () {
			});
			expect(Rich.LOOPER.hasBeforeLoop('test')).to.be.true;
		});
		it('test - redefine', function () {
			let result = true;
			Rich.LOOPER.addBeforeLoop('test', function () {
			});
			try {
				Rich.LOOPER.addBeforeLoop('test', function () {
				});
			} catch (e) {
				// console.log(e);
				result = false
			}
			expect(result).to.be.false;
		});
		[1, true, false, null, undefined, function () {
		}, [], {a: 1}].forEach(function (v) {
			it('test Rich.LOOPER.addBeforeLoop( ' + v + ' , function(){} )', function () {
				try {
					Rich.LOOPER.addBeforeLoop(v, function () {
					})
				} catch (e) {
					// console.log(e)
				}
				expect(Rich.LOOPER.hasBeforeLoop(v)).to.be.false;
			});
		})
	});
	describe('Test delBeforeLoop', function () {
		it('test delBeforeLoop', function () {
			Rich.LOOPER.addBeforeLoop('test', function () {
			});
			Rich.LOOPER.delBeforeLoop('test');
			expect(Rich.LOOPER.hasBeforeLoop('test')).to.be.false;
		});
	});
	describe('Test delBeforeLoopAll', function () {
		it('test delBeforeLoopAll', function () {
			Rich.LOOPER.addBeforeLoop('test1', function () {
			});
			Rich.LOOPER.addBeforeLoop('test2', function () {
			});
			Rich.LOOPER.addBeforeLoop('test3', function () {
			});
			Rich.LOOPER.addBeforeLoop('test4', function () {
			});
			Rich.LOOPER.delBeforeLoopAll();
			expect(Rich.LOOPER.hasBeforeLoop('test1')).to.be.false;
		});
	});
});
describe('Test mainLoop',function() {
	afterEach(function(){
		Rich.LOOPER.delAll();
	});
	describe('Test hasMainLoop', function () {
		it('test hasMainLoop', function () {
			expect(Rich.LOOPER.hasMainLoop('test')).to.be.false;
		});
		it('test hasMainLoop', function () {
			Rich.LOOPER.addMainLoop('test', function () {
			});
			expect(Rich.LOOPER.hasMainLoop('test')).to.be.true;
		});
	});
	describe('Test getMainLoop', function () {
		var testFunc = function () {
			console.log("testFunc")
		};
		it('test - getMainLoop', function () {
			expect(Rich.LOOPER.getMainLoop('getTest')).to.be.undefined;
		});
		it('test - addMainLoop', function () {
			Rich.LOOPER.addMainLoop('getTest', testFunc);
			expect(Rich.LOOPER.getMainLoop('getTest')).to.be.equal(testFunc);
		});
	});
	describe('Test getMainLoopList', function () {
		var testFunc = function () {
			console.log("testFunc")
		};
		var testFunc2 = function () {
			console.log("testFunc2")
		};
		it('test - getMainLoopList', function () {
			expect(Rich.LOOPER.getMainLoopList()).to.have.lengthOf(0);
		});
		it('test - getMainLoopList', function () {
			Rich.LOOPER.addMainLoop('getTest', testFunc);
			expect(Rich.LOOPER.getMainLoopList()).to.have.lengthOf(1);
		});
		it('test - getMainLoopList', function () {
			Rich.LOOPER.addMainLoop('getTest1', testFunc);
			Rich.LOOPER.addMainLoop('getTest2', testFunc2);
			expect(Rich.LOOPER.getMainLoopList()[0]).to.be.equal(testFunc);
		});
		it('test - getMainLoopList', function () {
			Rich.LOOPER.addMainLoop('getTest1', testFunc);
			Rich.LOOPER.addMainLoop('getTest2', testFunc2);
			expect(Rich.LOOPER.getMainLoopList()[1]).to.be.equal(testFunc2);
		});
	});
	describe('Test addMainLoop', function () {
		it('test - addMainLoop define', function () {
			Rich.LOOPER.addMainLoop('test', function () {
			});
			expect(Rich.LOOPER.hasMainLoop('test')).to.be.true;
		});
		it('test - redefine', function () {
			let result = true;
			Rich.LOOPER.addMainLoop('test', function () {
			});
			try {
				Rich.LOOPER.addMainLoop('test', function () {
				});
			} catch (e) {
				// console.log(e);
				result = false
			}
			expect(result).to.be.false;
		});
		[1, true, false, null, undefined, function () {
		}, [], {a: 1}].forEach(function (v) {
			it('test Rich.LOOPER.addMainLoop( ' + v + ' , function(){} )', function () {
				try {
					Rich.LOOPER.addMainLoop(v, function () {
					})
				} catch (e) {
					// console.log(e)
				}
				expect(Rich.LOOPER.hasMainLoop(v)).to.be.false;
			});
		})
	});
	describe('Test delMainLoop', function () {
		it('test delMainLoop', function () {
			Rich.LOOPER.addMainLoop('test', function () {
			});
			Rich.LOOPER.delMainLoop('test');
			expect(Rich.LOOPER.hasMainLoop('test')).to.be.false;
		});
	});
	describe('Test delMainLoopAll', function () {
		it('test delMainLoopAll', function () {
			Rich.LOOPER.addMainLoop('test1', function () {
			});
			Rich.LOOPER.addMainLoop('test2', function () {
			});
			Rich.LOOPER.addMainLoop('test3', function () {
			});
			Rich.LOOPER.addMainLoop('test4', function () {
			});
			Rich.LOOPER.delMainLoopAll();
			expect(Rich.LOOPER.hasMainLoop('test1')).to.be.false;
		});
	});
});
describe('Test afterLoop',function() {
	afterEach(function(){
		Rich.LOOPER.delAll();
	});
	describe('Test hasAfterLoop', function () {
		it('test hasAfterLoop', function () {
			expect(Rich.LOOPER.hasAfterLoop('test')).to.be.false;
		});
		it('test hasAfterLoop', function () {
			Rich.LOOPER.addAfterLoop('test', function () {
			});
			expect(Rich.LOOPER.hasAfterLoop('test')).to.be.true;
		});
	});
	describe('Test getAfterLoop', function () {
		var testFunc = function () {
			console.log("testFunc")
		};
		it('test - getAfterLoop', function () {
			expect(Rich.LOOPER.getAfterLoop('getTest')).to.be.undefined;
		});
		it('test - addAfterLoop', function () {
			Rich.LOOPER.addAfterLoop('getTest', testFunc);
			expect(Rich.LOOPER.getAfterLoop('getTest')).to.be.equal(testFunc);
		});
	});
	describe('Test getAfterLoopList', function () {
		var testFunc = function () {
			console.log("testFunc")
		};
		var testFunc2 = function () {
			console.log("testFunc2")
		};
		it('test - getAfterLoopList', function () {
			expect(Rich.LOOPER.getAfterLoopList()).to.have.lengthOf(0);
		});
		it('test - getAfterLoopList', function () {
			Rich.LOOPER.addAfterLoop('getTest', testFunc);
			expect(Rich.LOOPER.getAfterLoopList()).to.have.lengthOf(1);
		});
		it('test - getAfterLoopList', function () {
			Rich.LOOPER.addAfterLoop('getTest1', testFunc);
			Rich.LOOPER.addAfterLoop('getTest2', testFunc2);
			expect(Rich.LOOPER.getAfterLoopList()[0]).to.be.equal(testFunc);
		});
		it('test - getAfterLoopList', function () {
			Rich.LOOPER.addAfterLoop('getTest1', testFunc);
			Rich.LOOPER.addAfterLoop('getTest2', testFunc2);
			expect(Rich.LOOPER.getAfterLoopList()[1]).to.be.equal(testFunc2);
		});
	});
	describe('Test addAfterLoop', function () {
		it('test - addAfterLoop define', function () {
			Rich.LOOPER.addAfterLoop('test', function () {
			});
			expect(Rich.LOOPER.hasAfterLoop('test')).to.be.true;
		});
		it('test - redefine', function () {
			let result = true;
			Rich.LOOPER.addAfterLoop('test', function () {
			});
			try {
				Rich.LOOPER.addAfterLoop('test', function () {
				});
			} catch (e) {
				// console.log(e);
				result = false
			}
			expect(result).to.be.false;
		});
		[1, true, false, null, undefined, function () {
		}, [], {a: 1}].forEach(function (v) {
			it('test Rich.LOOPER.addAfterLoop( ' + v + ' , function(){} )', function () {
				try {
					Rich.LOOPER.addAfterLoop(v, function () {
					})
				} catch (e) {
					// console.log(e)
				}
				expect(Rich.LOOPER.hasAfterLoop(v)).to.be.false;
			});
		})
	});
	describe('Test delAfterLoop', function () {
		it('test delAfterLoop', function () {
			Rich.LOOPER.addAfterLoop('test', function () {
			});
			Rich.LOOPER.delAfterLoop('test');
			expect(Rich.LOOPER.hasAfterLoop('test')).to.be.false;
		});
	});
	describe('Test delAfterLoopAll', function () {
		it('test delAfterLoopAll', function () {
			Rich.LOOPER.addAfterLoop('test1', function () {
			});
			Rich.LOOPER.addAfterLoop('test2', function () {
			});
			Rich.LOOPER.addAfterLoop('test3', function () {
			});
			Rich.LOOPER.addAfterLoop('test4', function () {
			});
			Rich.LOOPER.delAfterLoopAll();
			expect(Rich.LOOPER.hasAfterLoop('test1')).to.be.false;
		});
	});
});