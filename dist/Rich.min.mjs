function getJS(...urlList) {
  return new Promise((resolve, reject) => {
    Promise.all([...urlList].map(src => fetch(src))).then(response => {
      let failRes;
      response.forEach(res => {
        console.log(res);
        if (res.ok === false) failRes = res;
      });

      if (failRes) {
        reject(failRes);
      } else {
        Promise.all(response.map(res => {
          return res.text().then(source => {
            let t0 = document.createElement('script');
            t0.innerHTML = source;
            document.head.appendChild(t0);
          });
        })).then(_ => {
          resolve(response);
        });
      }
    });
  });
}

function makeAjax(option = {}) {
  return function (url, body) {
    let newOption = {};

    for (const k in option) newOption[k] = option[k];

    if (body) newOption.body = body;
    return fetch(url, newOption);
  };
}

function getParam(searchKey, targetURL) {
  let reg, temp;
  reg = new RegExp("[\\?&]" + searchKey.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") + "=([^&#]*)");
  temp = targetURL ? reg.exec(targetURL) : reg.exec(location.search);
  return temp === null ? undefined : decodeURIComponent(temp[1].replace(/\+/g, " "));
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

let UUID = 1;
class ClassUUID {
  constructor() {
    _defineProperty(this, "_uuid", void 0);

    this._uuid = UUID;
    UUID++;
  }

}

function throwError(...arg) {
  throw new Error(...arg);
}

function isClass(func) {
  return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

let DETECTOR;

let navi = window['navigator'],
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
    ie = function () {
  if (agent.indexOf('edge') > -1) {
    if (agent.indexOf('iemobile') > -1) os = 'winMobile';
    return browser = 'edge', bv = /edge\/([\d]+)/.exec(agent)[1];
  } else {
    if (agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0) return;
    if (agent.indexOf('iemobile') > -1) os = 'winMobile';
    return browser = 'ie', bv = agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ? -1 : agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
  }
},
    whale = function () {
  return agent.indexOf('whale') < 0 ? 0 : (bv = parseFloat(/whale\/([\d]+)/.exec(agent)[1]), browser = 'whale');
},
    chrome = function () {
  if (agent.indexOf(i = 'chrome') < 0 && agent.indexOf(i = 'crios') < 0) return;
  return browser = 'chrome', bv = parseFloat((i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/).exec(agent)[1]);
},
    firefox = function () {
  return agent.indexOf('firefox') < 0 ? 0 : (browser = 'firefox', bv = parseFloat(/firefox\/([\d]+)/.exec(agent)[1]));
},
    safari = function () {
  return agent.indexOf('safari') < 0 ? 0 : (browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1]));
},
    opera = function () {
  let i;
  return agent.indexOf(i = 'opera') < 0 && agent.indexOf(i = 'opr') < 0 ? 0 : (browser = 'opera', bv = i == 'opera' ? parseFloat(/version\/([\d]+)/.exec(agent)[1]) : parseFloat(/opr\/([\d]+)/.exec(agent)[1]));
},
    naver = function () {
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
}) if (t0.hasOwnProperty(i)) DETECTOR[i] = t0[i];

var DETECTOR$1 = DETECTOR;

var UUID_TABLE, UUID$1;
var Dom, DomCls, fn;
UUID$1 = 0;
UUID_TABLE = {}, //////////////////////////////////
// 실제 클래스
DomCls = class extends ClassUUID {
  constructor(k) {
    super();
    (this.dom = k).__uuid = UUID$1++;
    UUID_TABLE[this.dom.__uuid] = this;
    this.dom.dataset ? 0 : this.dom.dataset = {};
  }

}, //////////////////////////////////
// 클래스 팩토리
Dom = function () {
  var result, t;
  return function (k) {
    if (k == 'body') k = document.body;
    if (k instanceof Element) result = UUID_TABLE[k.__uuid] ? UUID_TABLE[k.__uuid] : new DomCls(k);else if (k = k.trim(), k.charAt(0) == "<") {
      t = document.createElement("div"), t.innerHTML = k, result = new DomCls(t.childNodes[0]);
      t = null;
    } else if (k.charAt(0) == "#") {
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
      k = arg[i], isAttr = false, k.charAt(0) == "@" ? (isAttr = true, k = k.substr(1, k.length - 1)) : 0, i++, v = arg[i];

      if (v === null) {
        typeof this[k] == "function" ? this[k](v) : isAttr ? tD.removeAttribute(k) : tS[k] = "";
      } else if (i < arg.length) {
        typeof this[k] == "function" ? this[k](v) : isAttr ? tD.setAttribute(k, v) : typeof v == "number" ? tS[k] = noPx[k] ? v : v + "px" : tS[k] = v;
      } else {
        return typeof this[k] == "function" ? this[k]() : isAttr ? tD.getAttribute(k) : isNaN(parseFloat(tS[k])) ? tS[k] : tS[k].indexOf('px') > -1 ? parseFloat(tS[k]) : tS[k];
      }

      if (i == max - 1) return this;
    }
  };
}(), //////////////////////////////////
// method 기술하자.
fn['className'] = function (v) {
  if (v === null) return this.dom.removeAttribute('class');else return v != undefined ? this.dom.className = v : this.dom.hasAttribute('class') ? this.dom.className : null;
}, fn['className+'] = function () {
  var arg, i, t;
  return function (v) {
    arg = v.split(' '), i = arg.length;

    while (i--) t = arg[i], ~this.dom.className.indexOf(t) ? 0 : this.dom.className += ' ' + t;

    return this.dom.className;
  };
}(), fn['className-'] = function () {
  var arg, i, t;
  return function (v) {
    arg = v.split(' '), i = arg.length;

    while (i--) t = arg[i], ~this.dom.className.indexOf(t) ? this.dom.className = this.dom.className.replace(t, '') : 0;

    return this.dom.className = this.dom.className.replace(/ +/g, ' ').trim();
  };
}(), fn['+html'] = function (v) {
  return v != undefined ? this.dom.innerHTML = v + this.dom.innerHTML : this.dom.innerHTML;
}, fn['html'] = function (v) {
  return v !== undefined ? this.dom.innerHTML = v : this.dom.innerHTML;
}, // set-null 일때 set-'' 과 동일하게 처리
fn['html+'] = function (v) {
  return v != undefined ? this.dom.innerHTML += v : this.dom.innerHTML;
}, fn['+text'] = function (v) {
  return v != undefined ? this.dom.textContent = v + this.dom.textContent : this.dom.textContent;
}, fn['text'] = function (v) {
  return v !== undefined ? this.dom.textContent = v : this.dom.textContent;
}, // set-null 일때 set-'' 과 동일하게 처리
fn['text+'] = function (v) {
  return v != undefined ? this.dom.textContent += v : this.dom.textContent;
}, fn['value'] = function (v) {
  return v != undefined ? this.dom.value = v : this.dom.value;
}, fn['parent'] = fn['<'] = function (v) {
  v = v == 'body' ? document.body : v instanceof DomCls ? v.dom : v;
  if (v == undefined) return this.dom.parentNode ? Dom(this.dom.parentNode) : this.dom.parentNode;else v.appendChild(this.dom);
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
  keys.push('drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll'), realKeys = {}, i = keys.length, preventKeyFunc = function (v) {
    v[preventKey]();
  }, // lX = (DETECTOR.browser == 'ie' && DETECTOR.browserVer < 10) ? 'offsetX' : 'layerX',
  // lY = (DETECTOR.browser == 'ie' && DETECTOR.browserVer < 10) ? 'offsetY' : 'layerY',
  // realX = (DETECTOR.browser == 'firefox') ? 'pageX' : 'x',
  // realY = (DETECTOR.browser == 'firefox') ? 'pageY' : 'y',
  preventKey = DETECTOR$1.browser == 'ie' ? 'preventDefault' : 'stopPropagation';
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

let dispatcher;

dispatcher = function (target, type, keyName, bubble, cancelAble) {
  let t0;
  target = target === 'body' ? document.body : target;
  target = target === document || target instanceof Element ? target : target.dom;

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
  } else if (type === 'keydown' || type === 'keyup' || type === 'keypress') ; else {
    // 커스텀이벤트
    t0 = document.createEvent('Event');
    t0.initEvent(type, bubble, cancelAble);
  }

  target.dispatchEvent(t0);
};

var dispatcher$1 = dispatcher;

let Css;
let CssCls;
let style, sheet, rullSet;
let UU_TABLE, UUID$2;
let fn$1;
let getIndex;
let temp;
UU_TABLE = {}, UUID$2 = 0;
style = document.createElement('style');
document.head.appendChild(style);
sheet = style.sheet || style.stylesheet;
rullSet = sheet.cssRules;

CssCls = function (k) {
  this.__key = k;

  if (!UU_TABLE[k]) {
    try {
      sheet.insertRule(k + '{}', UUID$2);
      this.rull = rullSet[UUID$2].style;
    } catch (e) {
      this.__noHasBrowser = true;
    }
  }
};

getIndex = function (k) {
  let i = sheet.cssRules.length;
  let result;

  while (i--) {
    if (sheet.cssRules[i].selectorText == k) {
      result = i;
      break;
    }
  }

  return result;
}, //////////////////////////////////
// 프로토타입 정의
fn$1 = CssCls.prototype; // 외부 유출용 프로토타입 정의

CssCls.fn = fn$1;

fn$1.S = function () {
  let isIE9 = DETECTOR$1.browser == 'ie' && DETECTOR$1.browserVer < 10;
  let exp = /-([a-z])/gi;
  let noPx = {
    'opacity': 1,
    'z-index': 1,
    'zIndex': 1
  };

  let regFunc = function (match, char, index, str) {
    return char.toUpperCase();
  };

  if (isIE9) {
    return function () {
      let arg = arguments;
      let max, i;
      let k, v, tS;
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
      let arg = arguments;
      let max, i;
      let k, v, tS;
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
  UUID$2--;
};

Css = function (key) {
  if (!UU_TABLE[key]) {
    temp = new CssCls(key);
    if (!temp.__noHasBrowser) UU_TABLE[key] = temp, UUID$2++;
  }

  return UU_TABLE[key];
};

var Css$1 = Css;

const Rich = (_ => {
  let tempRich;
  let CLASS_NAME_TABLE = {};
  tempRich = {
    addMethod: (name, method) => {
      if (method instanceof Function) {
        if (tempRich[name]) throwError(`${name} : 이미 존재하는 메서드 네임`);else tempRich[name] = method;
      } else throwError(`${name} : 함수만 메서드로 등록가능`);
    },
    addClass: (name, cls, isClassYn = true) => {
      if (cls instanceof Function) {
        if (isClassYn) {
          if (isClass(cls)) {
            console.log(cls);
            if (CLASS_NAME_TABLE[name]) throwError(`${name} : 이미 존재하는 클래스 네임`);else {
              CLASS_NAME_TABLE[name] = cls;

              tempRich[name] = (...args) => new cls(...args);
            }
          } else {
            throwError(`${name} : Class 가 아님`);
          }
        } else {
          if (CLASS_NAME_TABLE[name]) throwError(`${name} : 이미 존재하는 클래스 네임`);else {
            CLASS_NAME_TABLE[name] = cls;
            tempRich[name] = cls;
          }
        }
      } else throwError(`${name} : 클래스는 함수 확장형이어야함`);
    },
    addStatic: (name, staticObj) => {
      if (!(staticObj instanceof Function) && staticObj instanceof Object) {
        if (tempRich[name]) throwError(`${name} : 이미 존재하는 오브젝트 네임`);else tempRich[name] = staticObj;
      } else throwError(`${name} : 오브젝트만 스타틱으로로 등록가능`);
    },
    init: () => {
      return new Promise((resolve, reject) => {
        let tick = time => {
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

          resolve(tempRich);
        };

        requestAnimationFrame(tick);
      });
    }
  }; // method

  tempRich.addMethod('isClass', isClass);
  tempRich.addMethod('throwError', throwError);
  tempRich.addMethod('getParam', getParam);
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
  tempRich.addMethod('dispatcher', dispatcher$1); // class

  tempRich.addClass('ClassUUID', ClassUUID);
  tempRich.addClass('Dom', Dom$1, false);
  tempRich.addClass('Css', Css$1, false); // static

  tempRich.addStatic('DETECTOR', DETECTOR$1);
  return tempRich;
})();

var Rich$1 = {
  init: Rich.init,
  addMethod: Rich.addMethod,
  addClass: Rich.addClass,
  addStatic: Rich.addStatic,
  // method
  isClass: Rich.isClass,
  throwError: Rich.throwError,
  getParam: getParam,
  ajaxJsonGet: Rich.ajaxJsonGet,
  ajaxJsonPost: Rich.ajaxJsonPost,
  getJS: Rich.getJS,
  dispatcher: Rich.dispatcher,
  // class
  ClassUUID: Rich.ClassUUID,
  Dom: Rich.Dom,
  Css: Rich.Css,
  // static
  DETECTOR: Rich.DETECTOR
}; // export default result

export default Rich$1;
