"use strict";
let DETECTOR
let navi = window['navigator'],
    agent = navi.userAgent.toLowerCase(),
    platform = navi.platform.toLowerCase(),
    app = navi.appVersion.toLowerCase(),
    device = 'pc',
    isMobile = 0,
    browser, bv, os, osv,
    i, t0,
    ie = _ => {
        if (agent.indexOf('edge') > -1) {
            if (agent.indexOf('iemobile') > -1) os = 'winMobile';
            return browser = 'edge', bv = (/edge\/([\d]+)/.exec(agent)[1]);
        } else {
            if (agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0) return;
            if (agent.indexOf('iemobile') > -1) os = 'winMobile';
            return browser = 'ie', bv = agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ? -1 : agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
        }
    },
    whale = _ => agent.indexOf('whale') < 0 ? 0 : (bv = parseFloat(/whale\/([\d]+)/.exec(agent)[1]), browser = 'whale'),
    chrome = _ => {
        if (agent.indexOf(i = 'chrome') < 0 && agent.indexOf(i = 'crios') < 0) return;
        return browser = 'chrome', bv = parseFloat((i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/).exec(agent)[1]);
    },
    firefox = _ => agent.indexOf('firefox') < 0 ? 0 : (browser = 'firefox', bv = parseFloat(/firefox\/([\d]+)/.exec(agent)[1])),
    safari = _ => agent.indexOf('safari') < 0 ? 0 : (browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1])),
    opera = _ => {
        let i;
        return (agent.indexOf(i = 'opera') < 0 && agent.indexOf(i = 'opr') < 0) ? 0 : (browser = 'opera', bv = (i == 'opera') ? parseFloat(/version\/([\d]+)/.exec(agent)[1]) : parseFloat(/opr\/([\d]+)/.exec(agent)[1]));
    },
    naver = _ => agent.indexOf('naver') < 0 ? 0 : browser = 'naver';
if (!DETECTOR) DETECTOR = {};
if (agent.includes('android')) {
    browser = os = 'android',
        device = agent.indexOf('mobile') == -1 ? (browser += 'Tablet', 'tablet') : 'mobile',
        osv = (i = /android ([\d.]+)/.exec(agent)) ? (i = i[1].split('.'), parseFloat(i[0] + '.' + i[1])) : 0,
        isMobile = 1,
    whale() || naver() || opera() || chrome() || firefox() || (bv = i = /safari\/([\d.]+)/.exec(agent) ? parseFloat(i[1]) : 0);
} else if (agent.includes(i = 'ipad') || agent.includes(i = 'iphone')) {
    device = i === 'ipad' ? 'tablet' : 'mobile',
        browser = os = i,
        osv = (i = /os ([\d_]+)/.exec(agent)) ? (i = i[1].split('_'), parseFloat(i[0] + '.' + i[1])) : 0,
        isMobile = 1,
    whale() || naver() || opera() || chrome() || firefox() || (bv = (i = /mobile\/([\S]+)/.exec(agent)) ? parseFloat(i[1]) : 0);
} else if (platform.includes('win')) {
    for (i in t0 = {
        '5.1': 'xp',
        '6.0': 'vista',
        '6.1': '7',
        '6.2': '8',
        '6.3': '8.1',
        '10.0': '10'
    }) {
        if (agent.includes('windows nt ' + i)) {
            osv = t0[i];
            break;
        }
    }
    os = 'win', ie() || whale() || opera() || chrome() || firefox() || safari();
} else if (platform.indexOf('mac') > -1) {
    os = 'mac',
        i = /os x ([\d._]+)/.exec(agent)[1].replace('_', '.').split('.'),
        osv = parseFloat(i[0] + '.' + i[1]), whale() || opera() || chrome() || firefox() || safari();
} else os = app.includes('x11') ? 'unix' : app.includes('linux') ? 'linux' : 0, whale() || chrome() || firefox();
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
})
    if (t0.hasOwnProperty(i)) DETECTOR[i] = t0[i];

export default DETECTOR;