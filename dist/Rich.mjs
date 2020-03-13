function getJS() {
  for (var _len = arguments.length, urlList = new Array(_len), _key = 0; _key < _len; _key++) {
    urlList[_key] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    var startTime = performance.now();
    var checkedNum = 0;
    var check, makeScriptNode;
    var successInfo = [];

    var resolveFunction = function resolveFunction() {
      console.log(resolve);
      if (resolve) resolve({
        ok: true,
        urlList: urlList,
        successInfo: successInfo,
        totalTime: performance.now() - startTime
      });
    };

    var rejectFunction = function rejectFunction(e) {
      if (reject) reject({
        ok: false,
        failInfo: {
          src: urlList[checkedNum],
          eventType: e['type'],
          time: performance.now() - startTime
        },
        urlList: urlList,
        successInfo: successInfo
      });
    };

    check = function check(e) {
      successInfo.push({
        src: urlList[checkedNum],
        eventType: e['type'],
        time: performance.now() - startTime
      });
      checkedNum++;
      if (urlList[checkedNum]) makeScriptNode(urlList[checkedNum]);else resolveFunction();
    };

    makeScriptNode = function makeScriptNode(src) {
      console.log('jsLoaded :', src);
      var t0;
      var HEAD = document.head;
      t0 = document.createElement('script');
      t0.onload = check;
      t0.onerror = rejectFunction;
      t0.src = src, HEAD.appendChild(t0);
    };

    if (urlList.length) makeScriptNode(urlList[checkedNum]);else resolveFunction(); // let failRes;
    // Promise.all([...urlList].map(src => fetch(src)))
    //     .then(response => {
    //         response.forEach(res => {
    //             if (res.ok === false) failRes = res;
    //         });
    //         if (failRes) {
    //             if (reject) reject(failRes);
    //         } else {
    //             let successInfo = []
    //             Promise.all(response.map((res, index) => {
    //                 return res.text().then(source => {
    //                     let t0 = document.createElement('script');
    //                     t0.setAttribute('targetSRC', res.url)
    //                     t0.innerHTML = source;
    //                     successInfo[index] = t0
    //
    //                 })
    //             })).then(_ => {
    //                 successInfo.forEach(v => document.head.appendChild(v))
    //                 resolve(response)
    //             })
    //         }
    //     })
  });
}

function makeAjax() {
  var baseOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (url) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var newOption = {};

    for (var k in baseOption) {
      newOption[k] = baseOption[k];
    }

    if (option['body']) newOption.body = option['body'];
    return fetch(url, newOption);
  };
}

function getParam(searchKey, targetURL) {
  var reg, temp;
  reg = new RegExp("[\\?&]" + searchKey.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") + "=([^&#]*)");
  temp = targetURL ? reg.exec(targetURL) : reg.exec(location.search);
  return temp === null ? undefined : decodeURIComponent(temp[1].replace(/\+/g, " "));
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var UUID = 1;

var ClassUUID = function ClassUUID() {
  _classCallCheck(this, ClassUUID);

  _defineProperty(this, "_uuid", void 0);

  this._uuid = UUID;
  UUID++;
};

function throwError() {
  for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
    arg[_key] = arguments[_key];
  }

  throw new Error(arg.join(' '));
}

var DETECTOR;

var navi = window['navigator'],
    agent = navi.userAgent.toLowerCase(),
    platform = navi.platform.toLowerCase(),
    app = navi.appVersion.toLowerCase(),
    device = 'pc',
    isMobile = 0,
    browser,
    bv,
    os,
    osv,
    i,
    t0,
    ie = function ie() {
  if (agent.indexOf('edge') > -1) {
    if (agent.indexOf('iemobile') > -1) os = 'winMobile';
    return browser = 'edge', bv = /edge\/([\d]+)/.exec(agent)[1];
  } else {
    if (agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0) return;
    if (agent.indexOf('iemobile') > -1) os = 'winMobile';
    return browser = 'ie', bv = agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ? -1 : agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
  }
},
    whale = function whale() {
  return agent.indexOf('whale') < 0 ? 0 : (bv = parseFloat(/whale\/([\d]+)/.exec(agent)[1]), browser = 'whale');
},
    chrome = function chrome() {
  if (agent.indexOf(i = 'chrome') < 0 && agent.indexOf(i = 'crios') < 0) return;
  return browser = 'chrome', bv = parseFloat((i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/).exec(agent)[1]);
},
    firefox = function firefox() {
  return agent.indexOf('firefox') < 0 ? 0 : (browser = 'firefox', bv = parseFloat(/firefox\/([\d]+)/.exec(agent)[1]));
},
    safari = function safari() {
  return agent.indexOf('safari') < 0 ? 0 : (browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1]));
},
    opera = function opera() {
  var i;
  return agent.indexOf(i = 'opera') < 0 && agent.indexOf(i = 'opr') < 0 ? 0 : (browser = 'opera', bv = i == 'opera' ? parseFloat(/version\/([\d]+)/.exec(agent)[1]) : parseFloat(/opr\/([\d]+)/.exec(agent)[1]));
},
    naver = function naver() {
  return agent.indexOf('naver') < 0 ? 0 : browser = 'naver';
};

if (!DETECTOR) DETECTOR = {};

if (agent.indexOf('android') > -1) {
  browser = os = 'android', device = agent.indexOf('mobile') == -1 ? (browser += 'Tablet', 'tablet') : 'mobile', osv = (i = /android ([\d.]+)/.exec(agent)) ? (i = i[1].split('.'), parseFloat(i[0] + '.' + i[1])) : 0, isMobile = 1, whale() || naver() || opera() || chrome() || firefox() || (bv = i = /safari\/([\d.]+)/.exec(agent) ? parseFloat(i[1]) : 0);
} else if (agent.indexOf(i = 'ipad') > -1 || agent.indexOf(i = 'iphone') > -1) {
  device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i, osv = (i = /os ([\d_]+)/.exec(agent)) ? (i = i[1].split('_'), parseFloat(i[0] + '.' + i[1])) : 0, isMobile = 1, whale() || naver() || opera() || chrome() || firefox() || (bv = (i = /mobile\/([\S]+)/.exec(agent)) ? parseFloat(i[1]) : 0);
} else if (platform.indexOf('win') > -1) {
  for (i in t0 = {
    '5.1': 'xp',
    '6.0': 'vista',
    '6.1': '7',
    '6.2': '8',
    '6.3': '8.1',
    '10.0': '10'
  }) {
    if (agent.indexOf('windows nt ' + i) > -1) {
      osv = t0[i];
      break;
    }
  }

  os = 'win', ie() || whale() || opera() || chrome() || firefox() || safari();
} else if (platform.indexOf('mac') > -1) {
  os = 'mac', i = /os x ([\d._]+)/.exec(agent)[1].replace('_', '.').split('.'), osv = parseFloat(i[0] + '.' + i[1]), whale() || opera() || chrome() || firefox() || safari();
} else os = app.indexOf('x11') > -1 ? 'unix' : app.indexOf('linux') > -1 ? 'linux' : 0, whale() || chrome() || firefox();

for (i in t0 = {
  device: device,
  isMobile: isMobile == 1,
  browser: browser,
  browserVer: bv,
  os: os,
  osVer: osv,
  down: isMobile ? 'touchstart' : 'mousedown',
  move: isMobile ? 'touchmove' : 'mousemove',
  up: isMobile ? 'touchend' : 'mouseup',
  click: 'click',
  over: 'mouseover',
  out: 'mouseout'
}) {
  if (t0.hasOwnProperty(i)) DETECTOR[i] = t0[i];
}

var DETECTOR$1 = DETECTOR;

var query = function () {
  var rootDom;
  return function (queryString) {
    var useNative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    rootDom = this === Rich$1 ? document : this.dom;
    rootDom = rootDom.querySelector(queryString) || null;
    return useNative ? rootDom : rootDom && Dom$1(rootDom);
  };
}();

var queryAll = function () {
  var rootDom, len;
  return function (v, useNative) {
    var result;
    rootDom = this === Rich$1 ? document : this.dom;
    result = rootDom.querySelectorAll(v);
    result = Array.prototype.slice.apply(result);
    len = result.length;
    if (!useNative) while (len--) {
      result[len] = Dom$1(result[len]);
    }
    return result;
  };
}();

var UUID_TABLE;
var Dom, DomCls, fn;
UUID_TABLE = {}, //////////////////////////////////
// 실제 클래스
DomCls = /*#__PURE__*/function (_ClassUUID) {
  _inherits(DomCls, _ClassUUID);

  function DomCls(k) {
    var _this;

    _classCallCheck(this, DomCls);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DomCls).call(this));
    (_this.dom = k).__uuid = _this._uuid;
    UUID_TABLE[_this.dom.__uuid] = _assertThisInitialized(_this);
    _this.dom.dataset ? 0 : _this.dom.dataset = {};
    return _this;
  }

  return DomCls;
}(ClassUUID), //////////////////////////////////
// 클래스 팩토리
Dom = function () {
  var result, t;
  return function (k) {
    if (k === 'body') k = document.body;
    if (k instanceof Element) result = UUID_TABLE[k.__uuid] ? UUID_TABLE[k.__uuid] : new DomCls(k);else if (k = k.trim(), k.charAt(0) === "<") {
      t = document.createElement("div"), t.innerHTML = k, result = new DomCls(t.childNodes[0]);
      t = null;
    } else if (k.charAt(0) === "#") {
      t = document.getElementById(k = k.substr(1, k.length - 1));
      if (t && UUID_TABLE[t.__uuid]) result = UUID_TABLE[t.__uuid];else if (t) result = new DomCls(t);else result = null;
    } else result = new DomCls(document.createElement(k));
    return result;
  };
}(), //////////////////////////////////
// 프로토타입 정의
fn = DomCls.prototype, // 외부 유출용 프로토타입 정의
Dom.fn = fn, //////////////////////////////////
// fn정의
fn.S = function () {
  var noPx = {
    'opacity': 1,
    'z-index': 1,
    'zIndex': 1
  };
  return function () {
    var arg = arguments;
    var max, i;
    var k, v, isAttr, tS, tD;
    k = DETECTOR$1[k] ? DETECTOR$1[k] : k, //모바일 터치이벤트 체크
    i = 0, max = arg.length, tD = this.dom, tS = tD.style;

    for (i; i < max; i++) {
      k = arg[i], isAttr = false, k.charAt(0) === "@" ? (isAttr = true, k = k.substr(1, k.length - 1)) : 0, i++, v = arg[i];

      if (v === null) {
        typeof this[k] === "function" ? this[k](v) : isAttr ? tD.removeAttribute(k) : tS[k] = "";
      } else if (i < arg.length) {
        typeof this[k] === "function" ? this[k](v) : isAttr ? tD.setAttribute(k, v) : typeof v === "number" ? tS[k] = noPx[k] ? v : v + "px" : tS[k] = v;
      } else {
        return typeof this[k] === "function" ? this[k]() : isAttr ? tD.getAttribute(k) : isNaN(parseFloat(tS[k])) ? tS[k] : tS[k].indexOf('px') > -1 ? parseFloat(tS[k]) : tS[k];
      }

      if (i === max - 1) return this;
    }
  };
}(), //////////////////////////////////
// method 기술하자.
fn['query'] = query, fn['queryAll'] = queryAll, fn['className'] = function (v) {
  if (v === null) return this.dom.removeAttribute('class');else return v !== undefined ? this.dom.className = v : this.dom.hasAttribute('class') ? this.dom.className : null;
}, fn['className+'] = function () {
  var arg, i, t;
  return function (v) {
    arg = v.split(' '), i = arg.length;

    while (i--) {
      t = arg[i], ~this.dom.className.indexOf(t) ? 0 : this.dom.className += ' ' + t;
    }

    return this.dom.className;
  };
}(), fn['className-'] = function () {
  var arg, i, t;
  return function (v) {
    arg = v.split(' '), i = arg.length;

    while (i--) {
      t = arg[i], ~this.dom.className.indexOf(t) ? this.dom.className = this.dom.className.replace(t, '') : 0;
    }

    return this.dom.className = this.dom.className.replace(/ +/g, ' ').trim();
  };
}(), fn['+html'] = function (v) {
  return v !== undefined ? this.dom.innerHTML = v + this.dom.innerHTML : this.dom.innerHTML;
}, fn['html'] = function (v) {
  return v !== undefined ? this.dom.innerHTML = v : this.dom.innerHTML;
}, // set-null 일때 set-'' 과 동일하게 처리
fn['html+'] = function (v) {
  return v !== undefined ? this.dom.innerHTML += v : this.dom.innerHTML;
}, fn['+text'] = function (v) {
  return v !== undefined ? this.dom.textContent = v + this.dom.textContent : this.dom.textContent;
}, fn['text'] = function (v) {
  return v !== undefined ? this.dom.textContent = v : this.dom.textContent;
}, // set-null 일때 set-'' 과 동일하게 처리
fn['text+'] = function (v) {
  return v !== undefined ? this.dom.textContent += v : this.dom.textContent;
}, fn['value'] = function (v) {
  return v !== undefined ? this.dom.value = v : this.dom.value;
}, fn['parent'] = fn['<'] = function (v) {
  v = v === 'body' ? document.body : v instanceof DomCls ? v.dom : v;
  if (v === undefined) return this.dom.parentNode ? Dom(this.dom.parentNode) : this.dom.parentNode;else v.appendChild(this.dom);
}, fn['remove'] = function () {
  if (this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
  return this;
}, fn['addChild'] = fn['>'] = function (v) {
  this.dom.appendChild(v instanceof DomCls ? v.dom : v);
}, fn['addChildAt'] = function (index, v) {
  var refChild = this.dom.children[index];
  if (refChild) this.dom.insertBefore(v instanceof DomCls ? v.dom : v, refChild);else this.dom.appendChild(v instanceof DomCls ? v.dom : v);
}, fn['removeChild'] = function (v) {
  this.dom.removeChild(v instanceof DomCls ? v.dom : v);
}, fn['removeChildAt'] = function (index) {
  if (this.dom.children[index]) {
    this.dom.removeChild(this.dom.children[index]);
  }
}, fn['getChildAt'] = function (index) {
  var t;
  return (t = this.dom.children[index]) ? Dom(t) : null;
}, fn['getChildNum'] = function () {
  return this.dom.children.length;
}, fn['getChildIndex'] = function (v) {
  return Array.prototype.indexOf.call(this.dom.children, v.dom ? v.dom : v);
}, fn['getSelfIndex'] = function () {
  return Array.prototype.indexOf.call(this.dom.parentNode.children, this.dom);
}; ///////////////////////////////////////////////////////////////////////////////////

(function () {
  var keys, realKeys;
  var preventKey;
  var evtUUID, event_UUID_TABLE;
  var i;
  var preventKeyFunc;
  evtUUID = 0, event_UUID_TABLE = {}, // 디텍팅과 관련된 녀석들
  // 디덱팅과 관련없는 녀석들은 여기서 허용함
  // mouse event
  keys = 'over,out,down,up,move,click,dblclick,wheel'.split(','), // TODO - safari not surpport 'wheel',
  // keyboard event
  keys.push('keydown', 'keyup', 'keypress'), // element event
  keys.push('blur', 'change', 'contextmenu', 'focus', 'input', 'invalid', 'reset', 'select', 'submit', 'search'), // TODO - safari not surpport 'invalid',
  // TODO - ie, firefox not surpport 'search',
  // drag event
  keys.push('drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll'), realKeys = {}, i = keys.length, preventKeyFunc = function preventKeyFunc(v) {
    v[preventKey]();
  }, // lX = (DETECTOR.browser === 'ie' && DETECTOR.browserVer < 10) ? 'offsetX' : 'layerX',
  // lY = (DETECTOR.browser === 'ie' && DETECTOR.browserVer < 10) ? 'offsetY' : 'layerY',
  // realX = (DETECTOR.browser === 'firefox') ? 'pageX' : 'x',
  // realY = (DETECTOR.browser === 'firefox') ? 'pageY' : 'y',
  preventKey = DETECTOR$1.browser === 'ie' ? 'preventDefault' : 'stopPropagation';
  i = keys.length;

  while (i--) {
    (function () {
      var eventKey = keys[i];
      var tDomUUID;
      realKeys[eventKey] = DETECTOR$1[eventKey] ? DETECTOR$1[eventKey] : eventKey;

      fn[eventKey] = function (handler) {
        tDomUUID = this.dom.__uuid;

        if (handler === null) {
          if (event_UUID_TABLE[tDomUUID]) {
            this.dom.removeEventListener(realKeys[eventKey], event_UUID_TABLE[tDomUUID][realKeys[eventKey]], true);
            event_UUID_TABLE[tDomUUID][realKeys[eventKey]] = undefined;
          }
        } else {
          if (handler) {
            // 기존에 등록된 이벤트는 무조건 삭제
            if (event_UUID_TABLE[tDomUUID]) {
              this.dom.removeEventListener(realKeys[eventKey], event_UUID_TABLE[tDomUUID][realKeys[eventKey]], true);
              event_UUID_TABLE[tDomUUID][realKeys[eventKey]] = undefined;
            } //console.log(event_UUID_TABLE)


            if (!event_UUID_TABLE[tDomUUID]) event_UUID_TABLE[tDomUUID] = {};

            event_UUID_TABLE[tDomUUID][realKeys[eventKey]] = function (e) {
              handler.call(UUID_TABLE[this.__uuid], {
                type: eventKey,
                target: e.target,
                // x: e[realX], y: e[realY],
                // deltaX: e.deltaX, deltaY: e.deltaY,
                // localX: e[lX], localY: e[lY],
                prevent: preventKeyFunc,
                nativeEvent: e,
                uuid: evtUUID++
              });
            };

            event_UUID_TABLE[tDomUUID][realKeys[eventKey]].originHandler = handler;
            this.dom.addEventListener(realKeys[eventKey], event_UUID_TABLE[tDomUUID][realKeys[eventKey]], true);
          } else {
            // 기존에 등록된 이벤트가 있으면 리턴
            return event_UUID_TABLE[tDomUUID][realKeys[eventKey]];
          }
        }
      };
    })();
  }
})();

var Dom$1 = Dom;

var KEY = {
  downList: {},
  upList: {},
  code2name: {},
  name2code: {}
};
var i$1, j, k, v;
var t1;
t1 = 'a,65,b,66,c,67,d,68,e,69,f,70,g,71,h,72,i,73,j,74,k,75,l,76,m,77,n,78,o,79,p,80,q,81,r,82,s,83,t,84,u,85,v,86,w,87,x,88,y,89,z,90,' + 'back,8,tab,9,enter,13,shift,16,control,17,alt,18,pause,19,caps,20,esc,27,space,32,' + 'pageUp,33,pageDown,34,end,35,home,36,left,37,up,38,right,39,down,40,insert,45,delete,46,numLock,144,scrollLock,145,' + '0,48,1,49,2,50,3,51,4,52,5,53,6,54,7,55,8,56,9,57,' + 'numPad0,96,numPad1,97,numPad2,98,numPad3,99,numPad4,100,numPad5,101,numPad6,102,numPad7,103,numPad8,104,numPad9,105,' + 'numPad*,106,numPad+,107,numPad-,109,numPad.,110,numPad/,111';
t1 = t1.split(',');
t1.push(';', 186);
t1.push('=', 187);
t1.push(',', 188);
t1.push('-', 189);
t1.push('.', 190);
t1.push('/', 191);
t1.push('`', 192);
t1.push('[', 219);
t1.push(']', 221);
t1.push("'", 222);
t1.push('\\', 220);
t1.push('altRight', 21);
t1.push('controlRight', 25);
t1.push('window', 91);
t1.push('windowRight', 92);
i$1 = 0, j = t1.length;

while (i$1 < j) {
  k = t1[i$1++], v = parseInt(t1[i$1++]), KEY.name2code[k] = v, KEY.code2name[v] = k;
}

document.addEventListener('keydown', function (e) {
  KEY.code2name[e.keyCode] ? KEY.downList[KEY.code2name[e.keyCode]] = 1 : 0;
});
document.addEventListener('keyup', function (e) {
  if (KEY.code2name[e.keyCode]) delete KEY.downList[KEY.code2name[e.keyCode]], KEY.upList[KEY.code2name[e.keyCode]] = 1;
});

KEY.resolve = function () {
  for (var k in KEY.upList) {
    delete KEY.upList[k];
  }
};

var dispatcher;

dispatcher = function dispatcher(target, type, keyName, bubble, cancelAble) {
  console.log(target, type, keyName, bubble, cancelAble);
  var t0;
  target = target === 'body' ? document.body : target;
  target = target === window || target === document || target instanceof Element ? target : target.dom;

  if (DETECTOR$1[type]) {
    // 마우스이벤트들
    t0 = document.createEvent('MouseEvents');
    t0.initMouseEvent(DETECTOR$1[type], // type
    bubble, cancelAble, target.ownerDocument.defaultView, // view
    1, // detail
    0, //screenX,
    0, //screenY,
    0, //clientX,
    0, //clientY,
    false, //ctrlKey,
    false, //altKey,
    false, //shiftKey,
    false, //.metaKey,
    0, //button 0 = left, 1 = middle, 2 = right
    null // relatedTarget
    );
  } else if (type === 'keydown' || type === 'keyup' || type === 'keypress') {
    keyName = keyName.toLowerCase();
    t0 = document.createEvent("Event");
    t0.initEvent(type, bubble, cancelAble);
    t0.keyCode = t0.which = KEY.name2code[keyName];
    t0.key = keyName;
  } else {
    // 커스텀이벤트
    t0 = document.createEvent('Event');
    t0.initEvent(type, bubble, cancelAble);
  }

  target.dispatchEvent(t0);
};

var dispatcher$1 = dispatcher;

var Css;
var CssCls;
var style, sheet, rullSet;
var UU_TABLE, UUID$1;
var fn$1;
var getIndex;
var temp;
UU_TABLE = {}, UUID$1 = 0;
style = document.createElement('style');
document.head.appendChild(style);
sheet = style.sheet || style.stylesheet;
rullSet = sheet.cssRules;

CssCls = function CssCls(k) {
  this.__key = k;

  if (!UU_TABLE[k]) {
    try {
      sheet.insertRule(k + '{}', UUID$1);
      this.rull = rullSet[UUID$1].style;
    } catch (e) {
      this.__noHasBrowser = true;
    }
  }
};

getIndex = function getIndex(k) {
  var i = sheet.cssRules.length;
  var result;

  while (i--) {
    if (sheet.cssRules[i].selectorText == k) {
      result = i;
      break;
    }
  }

  return result;
}; //////////////////////////////////
// 프로토타입 정의


fn$1 = CssCls.prototype; // 외부 유출용 프로토타입 정의

CssCls.fn = fn$1;

fn$1.S = function () {
  var isIE9 = DETECTOR$1.browser == 'ie' && DETECTOR$1.browserVer < 10;
  var exp = /-([a-z])/gi;
  var noPx = {
    'opacity': 1,
    'z-index': 1,
    'zIndex': 1,
    'content': 1
  };

  var regFunc = function regFunc(match, _char, index, str) {
    return _char.toUpperCase();
  };

  if (isIE9) {
    return function () {
      var arg = arguments;
      var max, i;
      var k, v, tS;
      i = 0, max = arg.length;
      tS = this.rull;

      for (i; i < max; i++) {
        k = arg[i], i++, v = arg[i];
        k = k.replace(exp, regFunc);

        if (i < arg.length) {
          typeof this[k] == "function" ? this[k](v) : typeof v == "number" ? tS[k] = noPx[k] ? v : v + "px" : tS[k] = v;
        } else {
          return typeof this[k] == "function" ? this[k]() : isNaN(parseFloat(tS[k])) ? tS[k] : tS[k].indexOf('px') > -1 ? parseFloat(tS[k]) : tS[k];
        }

        if (i == max - 1) return this;
      }
    };
  } else {
    return function () {
      var arg = arguments;
      var max, i;
      var k, v, tS;
      i = 0, max = arg.length;
      tS = this.rull;

      for (i; i < max; i++) {
        k = arg[i], i++, v = arg[i];

        if (i < arg.length) {
          typeof this[k] == "function" ? this[k](v) : typeof v == "number" ? tS[k] = noPx[k] ? v : v + "px" : tS[k] = v;
        } else {
          return typeof this[k] == "function" ? this[k]() : isNaN(parseFloat(tS[k])) ? tS[k] : tS[k].indexOf('px') > -1 ? parseFloat(tS[k]) : tS[k];
        }

        if (i == max - 1) return this;
      }
    };
  }
}();

fn$1.remove = function () {
  sheet.deleteRule(getIndex(this.__key));
  delete UU_TABLE[this.__key];
  UUID$1--;
};

Css = function Css(key) {
  if (!UU_TABLE[key]) {
    temp = new CssCls(key);
    if (!temp.__noHasBrowser) UU_TABLE[key] = temp, UUID$1++;
  }

  return UU_TABLE[key];
};

var Css$1 = Css;

var LOOPER;

var _tick;

var totalLoopMap = {
  beforeLoop: {
    keyMap: {},
    list: []
  },
  mainLoop: {
    keyMap: {},
    list: []
  },
  afterLoop: {
    keyMap: {},
    list: []
  }
};

_tick = function tick(time) {
  var i, len;
  var tList;
  tList = totalLoopMap.beforeLoop.list;
  i = 0;
  len = tList.length;

  for (i; i < len; i++) {
    tList[i](time);
  } //


  tList = totalLoopMap.mainLoop.list;
  i = 0;
  len = tList.length;

  for (i; i < len; i++) {
    tList[i](time);
  } //


  tList = totalLoopMap.afterLoop.list;
  i = 0;
  len = tList.length;

  for (i; i < len; i++) {
    tList[i](time);
  }

  KEY.resolve(time);
  requestAnimationFrame(_tick);
};

requestAnimationFrame(_tick);

var makeMethods = function makeMethods(title) {
  var targetMap, targetList;
  targetMap = totalLoopMap[title].keyMap;
  targetList = totalLoopMap[title].list;
  return {
    add: function add(key, handler) {
      if (typeof key != 'string') throw new Error(title + ' - key allow only sting. input value : ' + key);
      if (typeof handler != 'function') throw new Error(title + ' - handler allow only function. input value : ' + handler);
      if (targetMap[key]) throw new Error(title + ' - already defined key. input value : ' + key);
      targetMap[key] = handler;
      targetList.push(handler);
    },
    has: function has(key) {
      return targetMap.hasOwnProperty(key);
    },
    get: function get(key) {
      return targetMap[key];
    },
    getList: function getList() {
      return targetList.concat();
    },
    del: function del(key) {
      var t0;
      t0 = targetList.indexOf(targetMap[key]);

      if (t0 > -1) {
        targetList.splice(t0, 1);
        delete targetMap[key];
      }
    },
    delAll: function delAll() {
      targetMap = totalLoopMap[title].keyMap = {};
      targetList = totalLoopMap[title].list = [];
    }
  };
};

var mainLoopInfo, beforeLoopInfo, afterLoopInfo;
mainLoopInfo = makeMethods('mainLoop');
beforeLoopInfo = makeMethods('beforeLoop');
afterLoopInfo = makeMethods('afterLoop');
LOOPER = {
  addBeforeLoop: beforeLoopInfo.add,
  addMainLoop: mainLoopInfo.add,
  addAfterLoop: afterLoopInfo.add,
  //
  hasBeforeLoop: beforeLoopInfo.has,
  hasMainLoop: mainLoopInfo.has,
  hasAfterLoop: afterLoopInfo.has,
  //
  getBeforeLoop: beforeLoopInfo.get,
  getMainLoop: mainLoopInfo.get,
  getAfterLoop: afterLoopInfo.get,
  //
  getBeforeLoopList: beforeLoopInfo.getList,
  getMainLoopList: mainLoopInfo.getList,
  getAfterLoopList: afterLoopInfo.getList,
  //
  delBeforeLoop: beforeLoopInfo.del,
  delMainLoop: mainLoopInfo.del,
  delAfterLoop: afterLoopInfo.del,
  //
  delBeforeLoopAll: beforeLoopInfo.delAll,
  delMainLoopAll: mainLoopInfo.delAll,
  delAfterLoopAll: afterLoopInfo.delAll,
  //
  delAll: function delAll() {
    beforeLoopInfo.delAll();
    mainLoopInfo.delAll();
    afterLoopInfo.delAll();
  }
};
var LOOPER$1 = LOOPER;

var STORAGE;
var mode, tStore;
localStorage.type = 'localStorage';
sessionStorage.type = 'sessionStorage';
STORAGE = {
  SESSION: 'session',
  LOCAL: 'local',
  S: function () {
    var arg;
    var max, i;
    var k, v, t;
    return function () {
      console.log('tStore', tStore);
      arg = arguments;
      i = 0;
      max = arg.length;

      for (i; i < max; i++) {
        k = arg[i];
        i++;
        v = arg[i];
        if (v === null && tStore.key(k) > -1) tStore.removeItem(k);else if (i < arg.length) typeof STORAGE[k] == "function" ? STORAGE[k](v) : tStore.setItem(k, JSON.stringify(v));else {
          if (typeof STORAGE[k] == "function") return STORAGE[k]();else {
            t = tStore.getItem(k);
            return parseInt(t).toString() !== 'NaN' ? +t : JSON.parse(t);
          }
        }
        if (i === max - 1) return STORAGE;
      }
    };
  }(),
  clear: function clear(allClearYn) {
    if (allClearYn) {
      localStorage.clear();
      sessionStorage.clear();
    } else tStore.clear();

    return STORAGE;
  }
};
Object.defineProperty(STORAGE, 'mode', {
  get: function get() {
    return mode;
  },
  set: function set(v) {
    if (v === STORAGE['SESSION'] || v === STORAGE['LOCAL']) {
      mode = v;
      tStore = v === STORAGE['SESSION'] ? sessionStorage : localStorage;
    } else {
      throw new Error('올바르지않은 상수입니다.');
    }
  }
});
mode = STORAGE['LOCAL'];
tStore = localStorage;
var STORAGE$1 = STORAGE;

var W, DOC;
var DOC_EL, BODY;
var WIN;
var map = {},
    list = [];
WIN = {
  w: 0,
  h: 0,
  orientation: null,
  mouseX: 0,
  mouseY: 0,
  pageX: 0,
  pageY: 0,
  getByPoint: function getByPoint(x, y) {
    return DOC.elementFromPoint(x, y);
  },
  scroll: function () {
    var root;
    return function () {
      W = window;
      DOC = document;
      DOC_EL = DOC.documentElement;
      BODY = document.body;
      if (!root) root = BODY.scrollHeight ? BODY : DOC;

      switch (arguments.length <= 0 ? undefined : arguments[0]) {
        case 'w':
          return Math.max(root.scrollWidth, root.clientWidth);

        case 'h':
          return Math.max(root.scrollHeight, root.clientHeight);

        case 'x':
          return DOC_EL.scrollLeft || W.pageXOffset || 0;

        case 'y':
          return DOC_EL.scrollTop || W.pageYOffset || 0;
      }

      W.scrollTo(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
      return WIN;
    };
  }(),
  add: function () {
    return function (k, v) {
      if (typeof k != 'string') throw new Error("WIN key names can only be defined as strings! : " + k);
      if (typeof v != 'function') throw new Error("WIN callback function can only be defined as function! : " + v);

      if (map[k]) {
        return throwError("WIN : ".concat(k, " - \uC774\uBBF8 \uC874\uC7AC\uD558\uB294 \uD0A4\uAC12\uC785\uB2C8\uB2E4.")); // t0 = list.indexOf(map[k])
        // if (t0 > -1) list.splice(t0, 1)
      }

      map[k] = v, list.push(v);
    };
  }(),
  get: function get(k) {
    return map[k];
  },
  del: function () {
    var t0;
    return function (k) {
      t0 = list.indexOf(map[k]);
      if (t0 > -1) list.splice(t0, 1);
      delete map[k];
    };
  }(),
  has: function has(k) {
    return map[k] ? true : false;
  },
  clear: function () {
    var k;
    return function (v) {
      for (k in map) {
        delete map[k];
      }

      list.length = 0;
    };
  }()
};
window.addEventListener('mousemove', function (e) {
  // TODO 정리
  WIN['mouseX'] = e.clientX;
  WIN['mouseY'] = e.clientY;
  WIN['pageX'] = e.pageX;
  WIN['pageY'] = e.pageY;
  WIN['orientation'] = WIN['w'] > WIN['h'] ? 'landscape' : 'portrait'; // console.log(WIN.x, WIN.y)
});
window.addEventListener('resize', function () {
  var len,
      i = null;
  W = window, DOC = document;
  DOC_EL = DOC.documentElement, BODY = document.body;
  return function (e) {
    WIN['w'] = DOC_EL ? DOC_EL.clientWidth : BODY.clientWidth;
    WIN['h'] = DOC_EL ? DOC_EL.clientHeight : BODY.clientHeight;
    WIN['orientation'] = WIN['w'] > WIN['h'] ? 'landscape' : 'portrait';
    console.log('┎─resize이벤트 시작');
    len = list.length;

    for (i = 0; i < len; i++) {
      list[i](e);
    }

    console.log('┖────────────────────resize이벤트 끝끝끝~~~');
  };
}(), true);
var WIN$1 = WIN;

function getCSS() {
  for (var _len = arguments.length, urlList = new Array(_len), _key = 0; _key < _len; _key++) {
    urlList[_key] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    var startTime = performance.now();
    var checkedNum = 0;
    var check, makeScriptNode;
    var successInfo = [];

    var resolveFunction = function resolveFunction() {
      console.log(resolve);
      if (resolve) resolve({
        ok: true,
        urlList: urlList,
        successInfo: successInfo
      });
    };

    var rejectFunction = function rejectFunction(e) {
      if (reject) reject({
        ok: false,
        failInfo: {
          src: urlList[checkedNum],
          eventType: e['type'],
          time: performance.now() - startTime
        },
        urlList: urlList,
        successInfo: successInfo
      });
    };

    check = function check(e) {
      successInfo.push({
        src: urlList[checkedNum],
        eventType: e['type'],
        time: performance.now() - startTime
      });
      checkedNum++;
      if (urlList[checkedNum]) makeScriptNode(urlList[checkedNum]);else resolveFunction();
    };

    makeScriptNode = function makeScriptNode(src) {
      console.log('cssLoaded :', src);
      var t0;
      var HEAD = document.head;
      t0 = document.createElement('link');
      t0.rel = 'stylesheet';
      t0.href = src;
      t0.onload = check;
      t0.onerror = rejectFunction; // t0.src = src + '?getCssUUID=' + Math.random();

      t0.src = src;
      HEAD.appendChild(t0);
    };

    if (urlList.length) makeScriptNode(urlList[checkedNum]);else resolveFunction();
  });
}

var DEFINE_TYPE = {};
DEFINE_TYPE.NUMBER = 'NUMBER';
DEFINE_TYPE.INT = 'INT';
DEFINE_TYPE.UINT = 'UINT';
DEFINE_TYPE.STRING = 'STRING';
DEFINE_TYPE.BOOLEAN = 'BOOLEAN';
DEFINE_TYPE.FUNCTION = 'FUNCTION';
DEFINE_TYPE.ARRAY = 'ARRAY';
DEFINE_TYPE.OBJECT = 'OBJECT';

var _this = undefined;

var defineNumber = function defineNumber(target, keyName, type, option) {
  var tempDefineInfo; // 옵션 상태 체크

  var hasMin = option.hasOwnProperty('min');
  var hasMax = option.hasOwnProperty('max');
  var hasCallback = option.hasOwnProperty('callback');
  var MIN = hasMin ? option['min'] : null;
  var MAX = hasMax ? option['max'] : null;
  var CALLBACK = hasCallback ? option['callback'] : null;
  var NULLISH_ABLE = option['nullishAble']; // get/set 함수 설정

  tempDefineInfo = {
    get: function get() {
      return this['_' + keyName];
    },
    set: function set(v) {
      if (typeof v == 'number') {
        if (isNaN(v)) throwError("".concat(target.constructor.name, " - v : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        if (type !== DEFINE_TYPE.NUMBER && v !== parseInt(v)) throwError("".concat(target.constructor.name, " - v : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        if (type === DEFINE_TYPE.UINT && v < 0) throwError("".concat(target.constructor.name, " - v : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        if (hasMin && v < MIN) v = MIN;
        if (hasMax && v > MAX) v = MAX;
      } else {
        if (!(NULLISH_ABLE && (v === null || v === undefined))) {
          if (v === null || v === undefined) throwError("".concat(target.constructor.name, " - v : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(v));else throwError("".concat(target.constructor.name, " - v : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        }
      }

      this['_' + keyName] = v; // 콜백 옵션실행

      if (hasCallback) CALLBACK.call(this, v);
    }
  }; // 기본값 생성

  if (NULLISH_ABLE) {
    if (!option.hasOwnProperty('value')) option['value'] = option['value'] = null;
  }

  if (typeof option['value'] == 'number') {
    if (type !== DEFINE_TYPE.NUMBER && option['value'] !== parseInt(option['value'])) throwError("".concat(target.constructor.name, " - option['value'] : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
    if (type === DEFINE_TYPE.UINT && option['value'] < 0) throwError("".concat(target.constructor.name, " - option['value'] : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
  } else {
    if (NULLISH_ABLE && (option['value'] == null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(target.constructor.name, " - option['value'] : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  }

  if (hasMin) {
    if (typeof MIN != 'number' || isNaN(MIN)) throwError("".concat(target.constructor.name, " - option['min'] : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(MIN));
    if (type !== DEFINE_TYPE.NUMBER && MIN !== parseInt(MIN)) throwError("".concat(target.constructor.name, " - option['min'] : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(MIN));
    if (type === DEFINE_TYPE.UINT && option['min'] < 0) throwError("".concat(target.constructor.name, " - option['min'] : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(option['min']));
  }

  if (hasMax) {
    if (typeof MAX != 'number' || isNaN(MAX)) throwError("".concat(target.constructor.name, " - option['max'] : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(MAX));
    if (type !== DEFINE_TYPE.NUMBER && MAX !== parseInt(MAX)) throwError("".concat(target.constructor.name, " - option['max'] : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(MAX));
    if (type === DEFINE_TYPE.UINT && option['max'] < 0) throwError("".concat(target.constructor.name, " - option['max'] : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(option['max']));
  } // 타입형 체크


  if (typeof option['value'] == 'number') {
    if (isNaN(option['value'])) throwError("".concat(target.constructor.name, " - option['value'] : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value'])); // range 체크

    if (hasMin && option['value'] < MIN) option['value'] = MIN;
    if (hasMax && option['value'] > MAX) option['value'] = MAX;

    if (hasMin && hasMax) {
      if (MIN > MAX) throwError(target.constructor.name + ' - ' + "option['min'], option['max'] : min값은 max보다 작아야함", '입력값 : ', MIN, MAX);
    }
  } else {
    if (NULLISH_ABLE && (option['value'] == null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(target.constructor.name, " - option['value'] : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  } // 초기값 지정


  target['_' + keyName] = option['value']; // 콜백 옵션실행

  if (hasCallback) {
    if (CALLBACK instanceof Function) CALLBACK.call(_this, option['value']);else throwError("".concat(target.constructor.name, " - option['callback'] : Function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(CALLBACK));
  }

  if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
};

var _this$1 = undefined;

var defineString = function defineString(target, keyName, type, option) {
  var tempDefineInfo; // 옵션 상태 체크

  var hasCallback = option.hasOwnProperty('callback');
  var CALLBACK = hasCallback ? option['callback'] : null;
  var NULLISH_ABLE = option['nullishAble']; // get/set 함수 설정

  tempDefineInfo = {
    get: function get() {
      return this['_' + keyName];
    },
    set: function set(v) {
      if (typeof v != 'string') {
        if (!(NULLISH_ABLE && (v === null || v === undefined))) {
          if (v === null || v === undefined) throwError("".concat(target.constructor.name, " - v : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(v));else throwError("".concat(target.constructor.name, " - v : string\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        }
      }

      this['_' + keyName] = v; // 콜백 옵션실행

      if (hasCallback) CALLBACK.call(this, v);
    }
  }; // 기본값 생성

  if (!option.hasOwnProperty('value') && NULLISH_ABLE) option['value'] = null;else {
    if (!NULLISH_ABLE && option['value'] === null || option['value'] === undefined) throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. \uAE30\uBCF8\uAC12\uC774 \uD544\uC694\uD568 / \uC785\uB825\uAC12 : ").concat(option['value']));
  } // 타입형 체크

  if (typeof option['value'] != 'string') {
    if (NULLISH_ABLE && (option['value'] == null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(target.constructor.name, " - option['value'] : string\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  } // 초기값 지정


  target['_' + keyName] = option['value']; // 콜백 옵션실행

  if (hasCallback) {
    if (CALLBACK instanceof Function) CALLBACK.call(_this$1, option['value']);else throwError("".concat(target.constructor.name, " - option['callback'] : Function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(CALLBACK));
  }

  if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
};

var _this$2 = undefined;

var defineBoolean = function defineBoolean(target, keyName, type, option) {
  var tempDefineInfo; // 옵션 상태 체크

  var hasCallback = option.hasOwnProperty('callback');
  var CALLBACK = hasCallback ? option['callback'] : null;
  var NULLISH_ABLE = option['nullishAble']; // get/set 함수 설정

  tempDefineInfo = {
    get: function get() {
      return this['_' + keyName];
    },
    set: function set(v) {
      if (typeof v != 'boolean') {
        if (!(NULLISH_ABLE && (v === null || v === undefined))) {
          if (v === null || v === undefined) throwError("".concat(target.constructor.name, " - v : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(v));else throwError("".concat(target.constructor.name, " - v : boolean\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        }
      }

      this['_' + keyName] = v; // 콜백 옵션실행

      if (hasCallback) CALLBACK.call(this, v);
    }
  }; // 기본값 생성

  if (NULLISH_ABLE) {
    if (option.hasOwnProperty('value')) {
      if (typeof option['value'] != 'boolean' && !(option['value'] === null || option['value'] === undefined)) throwError("".concat(target.constructor.name, " - option['value'] : boolean or nullish\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
    } else option['value'] = null;
  } else {
    if (typeof option['value'] != 'boolean') throwError("".concat(target.constructor.name, " - option['value'] : boolean\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
  } // 타입형 체크


  if (typeof option['value'] != 'boolean') {
    if (NULLISH_ABLE && (option['value'] === null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(target.constructor.name, " - option['value'] : boolean\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  } // 초기값 지정


  target['_' + keyName] = option['value']; // 콜백 옵션실행

  if (hasCallback) {
    if (CALLBACK instanceof Function) CALLBACK.call(_this$2, option['value']);else throwError("".concat(target.constructor.name, " - option['callback'] : Function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(CALLBACK));
  }

  if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
};

var _this$3 = undefined;

var defineCustomType = function defineCustomType(target, keyName, type, option) {
  var tempDefineInfo; // 옵션 상태 체크

  var hasCallback = option.hasOwnProperty('callback');
  var CALLBACK = hasCallback ? option['callback'] : null;
  var NULLISH_ABLE = option['nullishAble']; // get/set 함수 설정

  tempDefineInfo = {
    get: function get() {
      return this['_' + keyName];
    },
    set: function set(v) {
      if (!(v instanceof type)) {
        if (!(NULLISH_ABLE && (v === null || v === undefined))) {
          if (v === null || v === undefined) throwError("".concat(target.constructor.name, " - v : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(v));else throwError("".concat(type.name, " - v ").concat(type.name, "\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        }
      }

      this['_' + keyName] = v; // 콜백 옵션실행

      if (hasCallback) CALLBACK.call(this, v);
    }
  }; // 기본값 생성

  if (NULLISH_ABLE && !option.hasOwnProperty('value')) option['value'] = null; // 타입형 체크

  if (!(option['value'] instanceof type)) {
    if (NULLISH_ABLE && (option['value'] == null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(type.name, " - option['value'] : ").concat(type.name, "\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  } // 초기값 지정


  target['_' + keyName] = option['value']; // 콜백 옵션실행

  if (hasCallback) {
    if (CALLBACK instanceof Function) CALLBACK.call(_this$3, option['value']);else throwError("".concat(target.constructor.name, " - option['callback'] : Function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(CALLBACK));
  }

  if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
};

var _this$4 = undefined;

var defineFunction = function defineFunction(target, keyName, type, option) {
  var tempDefineInfo; // 옵션 상태 체크

  var hasCallback = option.hasOwnProperty('callback');
  var CALLBACK = hasCallback ? option['callback'] : null;
  var NULLISH_ABLE = option['nullishAble']; // get/set 함수 설정

  tempDefineInfo = {
    get: function get() {
      return this['_' + keyName];
    },
    set: function set(v) {
      if (typeof v != 'function') {
        if (!(NULLISH_ABLE && (v === null || v === undefined))) {
          if (v === null || v === undefined) throwError("".concat(target.constructor.name, " - v : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(v));else throwError("".concat(target.constructor.name, " - v : function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        }
      }

      this['_' + keyName] = v; // 콜백 옵션실행

      if (hasCallback) CALLBACK.call(this, v);
    }
  }; // 기본값 생성

  if (NULLISH_ABLE) {
    if (option.hasOwnProperty('value')) {
      if (typeof option['value'] != 'function' && !(option['value'] === null || option['value'] === undefined)) throwError("".concat(target.constructor.name, " - option['value'] : function or nullish\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
    } else option['value'] = null;
  } else {
    if (typeof option['value'] != 'function') throwError("".concat(target.constructor.name, " - option['value'] : function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
  } // 타입형 체크


  if (typeof option['value'] != 'function') {
    if (NULLISH_ABLE && (option['value'] === null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(target.constructor.name, " - option['value'] : function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  } // 초기값 지정


  target['_' + keyName] = option['value']; // 콜백 옵션실행

  if (hasCallback) {
    if (CALLBACK instanceof Function) CALLBACK.call(_this$4, option['value']);else throwError("".concat(target.constructor.name, " - option['callback'] : Function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(CALLBACK));
  }

  if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
};

var _this$5 = undefined;

var defineArray = function defineArray(target, keyName, type, option) {
  var tempDefineInfo; // 옵션 상태 체크

  var hasCallback = option.hasOwnProperty('callback');
  var CALLBACK = hasCallback ? option['callback'] : null;
  var NULLISH_ABLE = option['nullishAble']; // get/set 함수 설정

  tempDefineInfo = {
    get: function get() {
      return this['_' + keyName];
    },
    set: function set(v) {
      if (!(v instanceof Array)) {
        if (!(NULLISH_ABLE && (v === null || v === undefined))) {
          if (v === null || v === undefined) throwError("".concat(target.constructor.name, " - v : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(v));else throwError("".concat(target.constructor.name, " - v : Array\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        }
      }

      this['_' + keyName] = v; // 콜백 옵션실행

      if (hasCallback) CALLBACK.call(this, v);
    }
  }; // 기본값 생성

  if (NULLISH_ABLE) {
    if (option.hasOwnProperty('value')) {
      if (!(option['value'] instanceof Array) && !(option['value'] === null || option['value'] === undefined)) throwError("".concat(target.constructor.name, " - option['value'] : Array or nullish \uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
    } else option['value'] = null;
  } else {
    if (!(option['value'] instanceof Array)) throwError("".concat(target.constructor.name, " - option['value'] : Array\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
  } // 타입형 체크


  if (!(option['value'] instanceof Array)) {
    if (NULLISH_ABLE && (option['value'] === null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(target.constructor.name, " - option['value'] : Array\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  } // 초기값 지정


  target['_' + keyName] = option['value']; // 콜백 옵션실행

  if (hasCallback) {
    if (CALLBACK instanceof Function) CALLBACK.call(_this$5, option['value']);else throwError("".concat(target.constructor.name, " - option['callback'] : Function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(CALLBACK));
  }

  if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
};

var _this$6 = undefined;

var defineObject = function defineObject(target, keyName, type, option) {
  var tempDefineInfo; // 옵션 상태 체크

  var hasCallback = option.hasOwnProperty('callback');
  var CALLBACK = hasCallback ? option['callback'] : null;
  var NULLISH_ABLE = option['nullishAble']; // get/set 함수 설정

  tempDefineInfo = {
    get: function get() {
      return this['_' + keyName];
    },
    set: function set(v) {
      if (_typeof(v) != 'object' || v instanceof Array) {
        if (!(NULLISH_ABLE && (v === null || v === undefined))) {
          if (v === null || v === undefined) throwError("".concat(target.constructor.name, " - v : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(v));else throwError("".concat(target.constructor.name, " - v : object\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
        }
      } else {
        if (!NULLISH_ABLE && v === null) throwError("".concat(target.constructor.name, " - v : object\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(v));
      }

      this['_' + keyName] = v; // 콜백 옵션실행

      if (hasCallback) CALLBACK.call(this, v);
    }
  }; // 기본값 생성

  if (NULLISH_ABLE) {
    if (option.hasOwnProperty('value')) {
      if ((option['value'] instanceof Array || _typeof(option['value']) != 'object') && !(option['value'] === null || option['value'] === undefined)) throwError("".concat(target.constructor.name, " - option['value'] : \uC21C\uC218 object or nullish\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
    } else option['value'] = null;
  } else {
    if (option['value'] instanceof Array || _typeof(option['value']) != 'object') throwError("".concat(target.constructor.name, " - option['value'] : object\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
  } // 타입형 체크


  if (_typeof(option['value']) != 'object') {
    if (NULLISH_ABLE && (option['value'] === null || option['value'] === undefined)) ; else {
      if (option['value'] == null || option['value'] === undefined) {
        throwError("".concat(target.constructor.name, " - option['value'] : nullish\uB97C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uB294 \uC138\uD305\uC0C1\uD0DC. / \uC785\uB825\uAC12 : ").concat(option['value']));
      } else {
        throwError("".concat(target.constructor.name, " - option['value'] : \uC21C\uC218 object\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(option['value']));
      }
    }
  } // 초기값 지정


  target['_' + keyName] = option['value']; // 콜백 옵션실행

  if (hasCallback) {
    if (CALLBACK instanceof Function) CALLBACK.call(_this$6, option['value']);else throwError("".concat(target.constructor.name, " - option['callback'] : Function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(CALLBACK));
  }

  if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
};

var defineProperty;

defineProperty = function defineProperty(target, keyName, type, option) {
  var isCustomType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (typeof keyName != 'string') throwError("".concat(keyName, " : keyName\uC740 \uBB38\uC790\uC5F4\uB9CC \uAC00\uB2A5\uD568"));
  if (!(target instanceof Object)) throwError("".concat(target, " : Object \uD655\uC7A5\uB9CC target\uC774 \uB420\uC218\uC788\uC74C."));
  if (!isCustomType && !DEFINE_TYPE[type]) throwError("".concat(type, " \uC740 \uC815\uC758 \uD560\uC218 \uC5C6\uB294 \uD0C0\uC785\uC784."));

  if (!(option === undefined || option === null)) {
    if (!(option instanceof Object) || option instanceof Function || option instanceof Array) throwError("".concat(option, " : option\uC740 nullish\uC640 Object\uB9CC \uD5C8\uC6A9"));
  }

  option = option || {}; // nullishAble 지정안하면 기본값 : true

  if (!option.hasOwnProperty('nullishAble')) option['nullishAble'] = true; //TODO - 오버라이드가 가능해야되는거 아닌가 -_-?
  // hasOwnProperty니 직접적인 확인이니 가능하긴한데..

  if (target.hasOwnProperty('_' + keyName)) throwError("".concat(keyName, " \uC740 \uC774\uBBF8 \uC815\uC758\uB41C \uC18D\uC131\uBA85\uC785\uB2C8\uB2E4."));

  if (isCustomType) {
    defineCustomType(target, keyName, type, option);
  } else {
    switch (type) {
      case DEFINE_TYPE.NUMBER:
      case DEFINE_TYPE.INT:
      case DEFINE_TYPE.UINT:
        defineNumber(target, keyName, type, option);
        break;

      case DEFINE_TYPE.STRING:
        defineString(target, keyName, type, option);
        break;

      case DEFINE_TYPE.BOOLEAN:
        defineBoolean(target, keyName, type, option);
        break;

      case DEFINE_TYPE.FUNCTION:
        defineFunction(target, keyName, type, option);
        break;

      case DEFINE_TYPE.ARRAY:
        defineArray(target, keyName, type, option);
        break;

      case DEFINE_TYPE.OBJECT:
        defineObject(target, keyName, type, option);
        break;

      default:
        throwError("".concat(type, " : \uC815\uC758\uD560\uC218 \uC5C6\uB294 \uD0C0\uC785"));
    }
  }

  return option;
};

Object.freeze(defineProperty);
var defineProperty$1 = defineProperty;
/*
    TODO - definePropertys(
        target,
        [
            { keyName : '키네임', type : DEFINE_TYPE.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : DEFINE_TYPE.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : DEFINE_TYPE.NUMBER, option : {옵션정보객체} },
            ....
        ]
     )
 */

/*
    TODO - 커스텀
    TODO - FUNCTION
 */
// let target = function () {
// }
// defineProperty(
//     target.prototype,
//     'keyName',
//     DEFINE_TYPE.NUMBER,
//     {
//         value: 0,
//         min: 0,
//         max: 0,
//         nullishAble: false,
//         callback: function () {
//         }
//     }
// )
// defineProperty(
//     target.prototype,
//     'keyName',
//     DEFINE_TYPE.STRING,
//     {
//         value: 0,
//         allowList : [],
//         nullishAble: false,
//         callback: function () {
//         }
//     }
// )
// defineProperty(
//     target.prototype,
//     'keyName',
//     DEFINE_TYPE.BOOLEAN,
//     {
//         value: true,
//         allowList : [],
//         nullishAble: false,
//         callback: function () {
//         }
//     }
// )

var definePropertys;

definePropertys = function definePropertys(target) {
  var defineList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  defineList.forEach(function (defineData) {
    defineProperty$1(target, defineData['keyName'], defineData['type'], defineData['option'], defineData['isCustomType']);
  });
};

Object.freeze(definePropertys);
var definePropertys$1 = definePropertys;

var checkType = function checkType(value, type, option) {
  option = option || {};
  var hasMin = option.hasOwnProperty('min');
  if (hasMin && (option['min'] === null || option['min'] === undefined)) hasMin = false;
  var hasMax = option.hasOwnProperty('max');
  if (hasMax && (option['max'] === null || option['max'] === undefined)) hasMax = false;
  var MIN = hasMin ? option['min'] : null;
  var MAX = hasMax ? option['max'] : null;
  if (!option.hasOwnProperty('nullishAble')) option['nullishAble'] = true;
  var NULLISH_ABLE = option['nullishAble'];
  var VALUE_IS_NULLISH = value === null || value === undefined;

  switch (type) {
    case DEFINE_TYPE.NUMBER:
    case DEFINE_TYPE.INT:
    case DEFINE_TYPE.UINT:
      if (typeof value == 'number') {
        // 넘버면 NaN 제외 일단 통과
        if (isNaN(value)) throwError("checkType - ".concat(type, " : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(value)); // 정수형의 경우 체크 && 음수체크

        if (type !== DEFINE_TYPE.NUMBER && value !== parseInt(value)) throwError("checkType - ".concat(type, " : value : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(value));
        if (type === DEFINE_TYPE.UINT && value < 0) throwError("checkType - ".concat(type, " : value : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(value));

        if (hasMin) {
          if (typeof MIN != 'number' || isNaN(MIN)) throwError("checkType - ".concat(type, " : option.min : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(MIN));
          if (type !== DEFINE_TYPE.NUMBER && MIN !== parseInt(MIN)) throwError("checkType - ".concat(type, " : option.min : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(MIN));
          if (type === DEFINE_TYPE.UINT && MIN < 0) throwError("checkType - ".concat(type, " : option.min : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ").concat(MIN));
          if (value < MIN) throwError("checkType - ".concat(type, " : option.min : \uCD5C\uC18C\uAC12\uBCF4\uB2E4 \uC785\uB825\uAC12\uC774 \uC791\uC74C / \uC785\uB825\uAC12 : ").concat(value));
        }

        if (hasMax) {
          if (typeof MAX != 'number' || isNaN(MAX)) throwError("option.max : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(MAX));
          if (type !== DEFINE_TYPE.NUMBER && MAX !== parseInt(MAX)) throwError("option.max : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(MAX));
          if (type === DEFINE_TYPE.UINT && MAX < 0) throwError("option.max : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(MAX));
          if (value > MAX) throwError("checkType - ".concat(type, " : option.max : \uCD5C\uB300\uAC12\uBCF4\uB2E4 \uC785\uB825\uAC12\uC774 \uD07C / \uC785\uB825\uAC12 : ").concat(value));
        }

        if (hasMin && hasMax) {
          if (MIN > MAX) throwError("checkType - ${type} : option.min, option.max : min값은 max보다 작아야함", '입력값 : ', MIN, MAX);
        }
      } else {
        if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
          // 널리쉬 불허용일때 다잡아냄
          throwError("checkType - ".concat(type, " : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(value));
        }
      }

      break;

    case DEFINE_TYPE.BOOLEAN:
      if (typeof value == 'boolean') ; else {
        if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
          // 널리쉬 불허용일때 다잡아냄
          throwError("checkType - ".concat(type, " : boolean\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(value));
        }
      }

      break;

    case DEFINE_TYPE.STRING:
      if (typeof value == 'string') ; else {
        if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
          // 널리쉬 불허용일때 다잡아냄
          throwError("checkType - ".concat(type, " : string\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(value));
        }
      }

      break;

    case DEFINE_TYPE.FUNCTION:
      if (typeof value == 'function') ; else {
        if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
          // 널리쉬 불허용일때 다잡아냄
          throwError("checkType - ".concat(type, " : function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(value));
        }
      }

      break;

    case DEFINE_TYPE.ARRAY:
      if (value instanceof Array) ; else {
        if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
          // 널리쉬 불허용일때 다잡아냄
          throwError("checkType - ".concat(type, " : ARRAY\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(value));
        }
      }

      break;

    case DEFINE_TYPE.OBJECT:
      if (value instanceof Object && !(value instanceof Array)) ; else {
        if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
          // 널리쉬 불허용일때 다잡아냄
          throwError("checkType - ".concat(type, " : \uC21C\uC218 OBJECT\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ").concat(value));
        }
      }

      break;

    default:
      throwError("\uD5C8\uC6A9\uD558\uC9C0\uC54A\uB294 \uD0C0\uC785\uC744 \uCCB4\uD06C\uD558\uB824\uACE0\uD568. / \uC785\uB825\uAC12 : ".concat(value));
      break;
  }
};

var checkTypes = function checkTypes() {
  var i = 0;
  var len = arguments.length;

  for (i; i < len; i++) {
    var tData = i < 0 || arguments.length <= i ? undefined : arguments[i];
    var value = tData[0];
    var type = tData[1];
    var option = tData[2] || {};
    var hasMin = option.hasOwnProperty('min');
    var hasMax = option.hasOwnProperty('max');
    var MIN = hasMin ? option['min'] : null;
    var MAX = hasMax ? option['max'] : null;
    if (!option.hasOwnProperty('nullishAble')) option['nullishAble'] = true;
    var NULLISH_ABLE = option['nullishAble'];
    var VALUE_IS_NULLISH = value === null || value === undefined;

    switch (type) {
      case DEFINE_TYPE.NUMBER:
      case DEFINE_TYPE.INT:
      case DEFINE_TYPE.UINT:
        if (typeof value == 'number') {
          // 넘버면 NaN 제외 일단 통과
          if (isNaN(value)) throwError("Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(value)); // 정수형의 경우 체크 && 음수체크

          if (type !== DEFINE_TYPE.NUMBER && value !== parseInt(value)) throwError("value : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(value));
          if (type === DEFINE_TYPE.UINT && value < 0) throwError("value : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(value));

          if (hasMin) {
            if (typeof MIN != 'number' || isNaN(MIN)) throwError("option['min'] : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(MIN));
            if (type !== DEFINE_TYPE.NUMBER && MIN !== parseInt(MIN)) throwError("option['min'] : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(MIN));
            if (type === DEFINE_TYPE.UINT && MIN < 0) throwError("option['min'] : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(MIN));
            if (value < MIN) throwError("option['min'] : \uCD5C\uC18C\uAC12\uBCF4\uB2E4 \uC785\uB825\uAC12\uC774 \uC791\uC74C / \uC785\uB825\uAC12 : ".concat(value));
          }

          if (hasMax) {
            if (typeof MAX != 'number' || isNaN(MAX)) throwError("option['max'] : Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(MAX));
            if (type !== DEFINE_TYPE.NUMBER && MAX !== parseInt(MAX)) throwError("option['max'] : \uC18C\uC218\uC810 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(MAX));
            if (type === DEFINE_TYPE.UINT && MAX < 0) throwError("option['max'] : \uC74C\uC218 \uD5C8\uC6A9\uC548\uD568. / \uC785\uB825\uAC12 : ".concat(MAX));
            if (value > MAX) throwError("option['max'] : \uCD5C\uB300\uAC12\uBCF4\uB2E4 \uC785\uB825\uAC12\uC774 \uD07C / \uC785\uB825\uAC12 : ".concat(value));
          }

          if (hasMin && hasMax) {
            if (MIN > MAX) throwError("option['min'], option['max'] : min값은 max보다 작아야함", '입력값 : ', MIN, MAX);
          }
        } else {
          if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
            // 널리쉬 불허용일때 다잡아냄
            throwError("Number\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(value));
          }
        }

        break;

      case DEFINE_TYPE.BOOLEAN:
        if (typeof value == 'boolean') ; else {
          if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
            // 널리쉬 불허용일때 다잡아냄
            throwError("boolean\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(value));
          }
        }

        break;

      case DEFINE_TYPE.STRING:
        if (typeof value == 'string') ; else {
          if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
            // 널리쉬 불허용일때 다잡아냄
            throwError("string\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(value));
          }
        }

        break;

      case DEFINE_TYPE.FUNCTION:
        if (typeof value == 'function') ; else {
          if (NULLISH_ABLE && VALUE_IS_NULLISH) ; else {
            // 널리쉬 불허용일때 다잡아냄
            throwError("function\uB9CC \uD5C8\uC6A9\uD568. / \uC785\uB825\uAC12 : ".concat(value));
          }
        }

        break;
    }
  }
};

var checkInstanceof = function checkInstanceof(value, type) {
  var nullishAble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (nullishAble) {
    if (value === null || value === undefined) ; else {
      if (!(value instanceof type)) throwError("\uC785\uB825\uD55C \uD0C0\uC785\uB9CC \uD5C8\uC6A9\uD568 / value : ".concat(value, " / type : ").concat(type));
    }
  } else {
    if (!(value instanceof type)) throwError("\uC785\uB825\uD55C \uD0C0\uC785\uB9CC \uD5C8\uC6A9\uD568 / value : ".concat(value, " / type : ").concat(type));
  }
};

var check;
var checkStruct;

check = function check(checkValue, structInfo) {
  var checkTYPE = structInfo['type'];

  if (DEFINE_TYPE[checkTYPE]) {
    switch (DEFINE_TYPE[checkTYPE]) {
      case DEFINE_TYPE.ARRAY:
        // 일단 배열인지 검증
        Rich.checkType(checkValue, checkTYPE, structInfo['option']);

        if (structInfo['childItem']) {
          var childItemStruct = structInfo['childItem'];
          var childItemType = childItemStruct['type'];
          checkValue.forEach(function (v) {
            console.log(v);
            Rich.checkType(v, childItemType, childItemStruct['option']); // 오브젝트일때

            if (childItemStruct['struct']) checkStruct(v, childItemStruct['struct']);

            if (childItemStruct['childItem']) {
              console.log('여기걸려야할텐데?', v, childItemStruct['childItem']);
              checkStruct(v, childItemStruct['childItem'], true);
            } // 배열일떄

          });
        }

        break;

      case DEFINE_TYPE.OBJECT:
        Rich.checkType(checkValue, checkTYPE, structInfo['option']);
        checkStruct(checkValue, structInfo['struct']);
        break;

      default:
        Rich.checkType(checkValue, checkTYPE, structInfo['option']);
        break;
    }
  } else {
    throwError("".concat(checkTYPE, "\uC740 \uAC80\uC99D\uD560\uC218 \uC5C6\uB294 \uD0C0\uC785\uC784\uAD6C\uC870\uCCB4\uC5D0 \uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uD0A4\uB97C \uAC80\uC99D\uD558\uB824\uACE0\uD568 / \uC785\uB825\uAC12 : ").concat(checkTYPE));
  }
};

checkStruct = function checkStruct(data, structInfo) {
  var isArrayTest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var k;

  if (isArrayTest) {
    data.forEach(function (v) {
      check(v, structInfo);
    });
  } else {
    for (k in data) {
      if (structInfo.hasOwnProperty(k)) {
        check(data[k], structInfo[k]);
      } else throwError("\uAD6C\uC870\uCCB4\uC5D0 \uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uD0A4\uB97C \uAC80\uC99D\uD558\uB824\uACE0\uD568 / \uC785\uB825\uAC12 : ".concat(k));
    }
  }
};

var checkSchema = function checkSchema(data, structInfo) {
  if (!data instanceof Object) throwError('checkSchema : Object만 검증가능');
  checkStruct(data, structInfo);
};

var Rich$1 = function (_) {
  var tempRich;
  var CLASS_NAME_TABLE = {};
  tempRich = {
    addMethod: function addMethod(name, method) {
      if (method instanceof Function) {
        if (tempRich[name]) throwError("".concat(name, " : \uC774\uBBF8 \uC874\uC7AC\uD558\uB294 \uBA54\uC11C\uB4DC \uB124\uC784"));else {
          var t;
          if ((t = name.charAt(0)) !== t.toLowerCase()) throwError("".concat(name, " : \uBA54\uC11C\uB4DC \uB124\uC784\uC740 \uC18C\uBB38\uC790\uB85C \uC2DC\uC791\uD574\uC57C\uD568"));else tempRich[name] = method;
        }
      } else throwError("".concat(name, " : \uD568\uC218\uB9CC \uBA54\uC11C\uB4DC\uB85C \uB4F1\uB85D\uAC00\uB2A5"));
    },
    addClass: function () {
      var checkTableAndName;

      checkTableAndName = function checkTableAndName(name) {
        var t;
        if (CLASS_NAME_TABLE[name]) throwError("".concat(name, " : \uC774\uBBF8 \uC874\uC7AC\uD558\uB294 \uD074\uB798\uC2A4 \uB124\uC784"));
        if ((t = name.charAt(0)) !== t.toUpperCase()) throwError("".concat(name, " : \uD074\uB798\uC2A4 \uB124\uC784\uC740 \uB300\uBB38\uC790\uB85C \uC2DC\uC791\uD574\uC57C\uD568"));
        return true;
      };

      return function (name, cls) {

        if (cls instanceof Function) {
          checkTableAndName(name);
          CLASS_NAME_TABLE[name] = cls; // if (isClassYn) tempRich[name] = (...arg) => {
          //     return new cls(...arg)
          // };
          // else tempRich[name] = cls;

          tempRich[name] = cls;
        } else throwError("".concat(name, " : \uD074\uB798\uC2A4\uB294 \uD568\uC218 \uD655\uC7A5\uD615\uC774\uC5B4\uC57C\uD568"));
      };
    }(),
    addStatic: function addStatic(name, staticObj) {
      if (!(staticObj instanceof Function) && staticObj instanceof Object && !(staticObj instanceof Array)) {
        if (name !== name.toUpperCase()) throwError("".concat(name, " : \uC2A4\uD0C0\uD2F1 \uC624\uBE0C\uC81D\uD2B8 \uB124\uC784\uC740 \uB300\uBB38\uC790\uB9CC \uD5C8\uC6A9\uD568"));
        if (tempRich[name]) throwError("".concat(name, " : \uC774\uBBF8 \uC874\uC7AC\uD558\uB294 \uC624\uBE0C\uC81D\uD2B8 \uB124\uC784"));else tempRich[name] = staticObj;
      } else throwError("".concat(name, " : \uC624\uBE0C\uC81D\uD2B8\uB9CC \uC2A4\uD0C0\uD2F1\uC73C\uB85C\uB85C \uB4F1\uB85D\uAC00\uB2A5"));
    },
    init: function init() {
      for (var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++) {
        urls[_key] = arguments[_key];
      }

      return new Promise(function (resolve, reject) {
        var tick = function tick(time) {
          switch (document.readyState) {
            case 'complete':
            case 'loaded':
              console.log('document.readyState :', document.readyState);
              break;

            case 'interactive':
              if (document.documentElement.doScroll) try {
                document.documentElement.doScroll('left');
              } catch (e) {
                return requestAnimationFrame(tick);
              }

            default:
              return requestAnimationFrame(tick);
          }

          console.log('초기화시간', time);

          if (urls) {
            var jsURLs = [];
            var cssURLs = [];
            urls.forEach(function (url) {
              if (url.indexOf('.css') > -1) cssURLs.push(url);else if (url.indexOf('.js') > -1) jsURLs.push(url);
            });
            var t0 = Promise.all([getJS.apply(void 0, jsURLs), getCSS.apply(void 0, cssURLs)]).then(function (_) {
              resolve(tempRich);
            });
            if (reject) t0["catch"](function (error) {
              return reject(error);
            });
          } else resolve(tempRich);

          dispatcher$1(window, 'resize');
        };

        requestAnimationFrame(tick);
      });
    }
  }; // method

  tempRich.addMethod('throwError', throwError);
  tempRich.addMethod('defineProperty', defineProperty$1);
  tempRich.addMethod('definePropertys', definePropertys$1);
  tempRich.addMethod('checkType', checkType);
  tempRich.addMethod('checkTypes', checkTypes);
  tempRich.addMethod('checkSchema', checkSchema);
  tempRich.addMethod('checkInstanceof', checkInstanceof);
  tempRich.addMethod('getParam', getParam);
  tempRich.addMethod('dispatcher', dispatcher$1);
  tempRich.addMethod('makeAjax', makeAjax);
  tempRich.addMethod('ajaxJsonGet', makeAjax({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }));
  tempRich.addMethod('ajaxJsonPost', makeAjax({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }));
  tempRich.addMethod('getJS', getJS);
  tempRich.addMethod('getCSS', getCSS);
  tempRich.addMethod('query', query);
  tempRich.addMethod('queryAll', queryAll);
  tempRich.addMethod('valueToText', function (v) {
    return v === undefined ? 'undefined' : v === null ? 'null' : v.toString() == 'NaN' ? 'NaN' : typeof v == 'function' ? v.toString() : JSON.stringify(v);
  }); // class

  tempRich.addClass('ClassUUID', ClassUUID);
  tempRich.addClass('Dom', Dom$1, false);
  tempRich.addClass('Css', Css$1, false); // static

  tempRich.addStatic('DEFINE_TYPE', DEFINE_TYPE);
  tempRich.addStatic('DETECTOR', DETECTOR$1);
  tempRich.addStatic('KEY', KEY);
  tempRich.addStatic('LOOPER', LOOPER$1);
  tempRich.addStatic('STORAGE', STORAGE$1);
  tempRich.addStatic('WIN', WIN$1);
  dispatcher$1(window, 'resize');
  return tempRich;
}();

export default Rich$1;
