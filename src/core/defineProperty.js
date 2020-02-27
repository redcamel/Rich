"use strict"
import throwError from "./throwError";

let defineProperty;
let defineNumber, defineString, defineBoolean;
defineNumber = (target, keyName, type, option) => {
    let tempDefineInfo;
    // 옵션 상태 체크
    let hasMin = option.hasOwnProperty('min');
    let hasMax = option.hasOwnProperty('max');
    let hasCallback = option.hasOwnProperty('callback');
    let MIN = hasMin ? option['min'] : null;
    let MAX = hasMax ? option['max'] : null;
    let CALLBACK = hasCallback ? option['callback'] : null;
    let NULLISH_ABLE = option['nullishAble'];
    // get/set 함수 설정
    tempDefineInfo = {
        get: function () {
            return this['_' + keyName]
        },
        set: function (v) {
            if (typeof v == 'number') {
                if (isNaN(v)) throwError(`${target.constructor.name} - v : Number만 허용함. / 입력값 : ${v}`);
                if ((type === defineProperty.INT || type === defineProperty.UINT) && v !== parseInt(v)) throwError(`${target.constructor.name} - v : 소수점 허용안함. / 입력값 : ${v}`);
                if (type === defineProperty.UINT && v < 0) throwError(`${target.constructor.name} - v : 음수 허용안함. / 입력값 : ${v}`);
                if (hasMin && v < MIN) v = MIN
                if (hasMax && v > MAX) v = MAX
            } else {
                if (!(NULLISH_ABLE && (v === null || v === undefined))) {
                    if (v === null || v === undefined) throwError(`${target.constructor.name} - v : nullish를 허용하지 않는 세팅상태. / 입력값 : ${v}`);
                    else throwError(`${target.constructor.name} - v : Number만 허용함. / 입력값 : ${v}`);
                }
            }
            this['_' + keyName] = v
            // 콜백 옵션실행
            if (hasCallback) CALLBACK.call(this, v)
        }
    }
    // 기본값 생성
    option['value'] = option['value'] || (NULLISH_ABLE ? null : 0);
    if (!NULLISH_ABLE && (type === defineProperty.INT || type === defineProperty.UINT) && option['value'] !== parseInt(option['value'])) throwError(`${target.constructor.name} - v : 소수점 허용안함. / 입력값 : ${option['value']}`);
    if (!NULLISH_ABLE && type === defineProperty.UINT && option['value'] < 0) throwError(`${target.constructor.name} - option['value'] : 음수 허용안함. / 입력값 : ${option['value']}`);
    // 타입형 체크
    if (typeof option['value'] == 'number') {
        if (isNaN(option['value'])) throwError(`${target.constructor.name} - option['value'] : Number만 허용함. / 입력값 : ${option['value']}`);
        // range 체크
        if (hasMin) {
            if (typeof MIN != 'number' || isNaN(MIN)) throwError(`${target.constructor.name} - option['min'] : Number만 허용함. / 입력값 : ${MIN}`);
            if (!NULLISH_ABLE && (type === defineProperty.INT || type === defineProperty.UINT) && MIN !== parseInt(MIN)) throwError(`${target.constructor.name} - option['min'] : 소수점 허용안함. / 입력값 : ${MIN}`);
            if (!NULLISH_ABLE && type === defineProperty.UINT && option['min'] < 0) throwError(`${target.constructor.name} - option['min'] : 음수 허용안함. / 입력값 : ${option['min']}`);
            if (option['value'] < MIN) option['value'] = MIN
        }
        if (hasMax) {
            if (typeof MAX != 'number' || isNaN(MAX)) throwError(`${target.constructor.name} - option['max'] : Number만 허용함. / 입력값 : ${MAX}`);
            if (!NULLISH_ABLE && (type === defineProperty.INT || type === defineProperty.UINT) && MAX !== parseInt(MAX)) throwError(`${target.constructor.name} - option['max'] : 소수점 허용안함. / 입력값 : ${MAX}`);
            if (!NULLISH_ABLE && type === defineProperty.UINT && option['max'] < 0) throwError(`${target.constructor.name} - option['max'] : 음수 허용안함. / 입력값 : ${option['max']}`);
            if (option['value'] > MAX) option['value'] = MAX
        }
        if (hasMin && hasMax) {
            if (MIN > MAX) throwError(target.constructor.name + ' - ' + "option['min'], option['max'] : min값은 max보다 작아야함", '입력값 : ', MIN, MAX);
        }
    } else {
        if (NULLISH_ABLE && (option['value'] == null || option['value'] === undefined)) {
        } else {
            if (option['value'] == null || option['value'] === undefined) {
                throwError(`${target.constructor.name} - option['value'] : nullish를 허용하지 않는 세팅상태. / 입력값 : ${option['value']}`);
            } else {
                throwError(`${target.constructor.name} - option['value'] : Number만 허용함. / 입력값 : ${option['value']}`);
            }
        }
    }

    // 초기값 지정
    target['_' + keyName] = option['value'];
    // 콜백 옵션실행
    if (hasCallback) CALLBACK.call(this, option['value']);
    if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
}
defineString = (target, keyName, type, option) => {
    let tempDefineInfo;
    // 옵션 상태 체크
    let hasCallback = option.hasOwnProperty('callback');
    let CALLBACK = hasCallback ? option['callback'] : null;
    let NULLISH_ABLE = option['nullishAble'];
    // get/set 함수 설정
    tempDefineInfo = {
        get: function () {
            return this['_' + keyName]
        },
        set: function (v) {
            if (typeof v != 'string') {
                if (!(NULLISH_ABLE && (v === null || v === undefined))) {
                    if (v === null || v === undefined) throwError(`${target.constructor.name} - v : nullish를 허용하지 않는 세팅상태. / 입력값 : ${v}`);
                    else throwError(`${target.constructor.name} - v : string만 허용함. / 입력값 : ${v}`);
                }
            }
            this['_' + keyName] = v
            // 콜백 옵션실행
            if (hasCallback) CALLBACK.call(this, v)
        }
    }
    // 기본값 생성
    if (!option.hasOwnProperty('value') && NULLISH_ABLE) option['value'] = null;
    else {
        if (!NULLISH_ABLE && option['value'] === null || option['value'] === undefined) throwError(`${target.constructor.name} - option['value'] : nullish를 허용하지 않는 세팅상태. 기본값이 필요함 / 입력값 : ${option['value']}`)
    }
    // 타입형 체크
    if (typeof option['value'] != 'string') {
        if (NULLISH_ABLE && (option['value'] == null || option['value'] === undefined)) {
        } else {
            if (option['value'] == null || option['value'] === undefined) {
                throwError(`${target.constructor.name} - option['value'] : nullish를 허용하지 않는 세팅상태. / 입력값 : ${option['value']}`);
            } else {
                throwError(`${target.constructor.name} - option['value'] : string만 허용함. / 입력값 : ${option['value']}`);
            }
        }
    }
    // 초기값 지정
    target['_' + keyName] = option['value'];
    // 콜백 옵션실행
    if (hasCallback) CALLBACK.call(this, option['value']);
    if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
}

defineBoolean = (target, keyName, type, option) => {
    let tempDefineInfo;
    // 옵션 상태 체크
    let hasCallback = option.hasOwnProperty('callback');
    let CALLBACK = hasCallback ? option['callback'] : null;
    let NULLISH_ABLE = option['nullishAble'];
    // get/set 함수 설정
    tempDefineInfo = {
        get: function () {
            return this['_' + keyName]
        },
        set: function (v) {
            if (typeof v != 'boolean') {
                if (!(NULLISH_ABLE && (v === null || v === undefined))) {
                    if (v === null || v === undefined) throwError(`${target.constructor.name} - v : nullish를 허용하지 않는 세팅상태. / 입력값 : ${v}`);
                    else throwError(`${target.constructor.name} - v : boolean만 허용함. / 입력값 : ${v}`);
                }
            }
            this['_' + keyName] = v
            // 콜백 옵션실행
            if (hasCallback) CALLBACK.call(this, v)
        }
    }
    // 기본값 생성
    if (!NULLISH_ABLE) {
        option['value'] = option['value'] ? true : false;
    } else {
        if (!option.hasOwnProperty('value')) option['value'] = null
        else {
            if (option['value'] != null) option['value'] = option['value'] ? true : false;
        }
    }
    // 타입형 체크
    if (typeof option['value'] != 'boolean') {
        if (NULLISH_ABLE && (option['value'] == null || option['value'] === undefined)) {
        } else {
            if (option['value'] == null || option['value'] === undefined) {
                throwError(`${target.constructor.name} - option['value'] : nullish를 허용하지 않는 세팅상태. / 입력값 : ${option['value']}`);
            } else {
                throwError(`${target.constructor.name} - option['value'] : boolean만 허용함. / 입력값 : ${option['value']}`);
            }
        }
    }
    // 초기값 지정
    target['_' + keyName] = option['value'];
    // 콜백 옵션실행
    if (hasCallback) CALLBACK.call(this, option['value']);
    if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
}
defineProperty = (target, keyName, type, option) => {
    if (typeof keyName != 'string') throwError(`${keyName} : keyName은 문자열만 가능함`)
    if (!(target instanceof Object)) throwError(`${target} : Object 확장만 target이 될수있음.`)
    if (!defineProperty[type]) throwError(`${type} 은 정의 할수 없는 타입임.`)
    if (!(option === undefined || option === null)) {
        if (!(option instanceof Object) || option instanceof Function) throwError(`${option} : option은 nullish와 Object만 허용`)
    }
    option = option || {};
    //TODO - 오버라이드가 가능해야되는거 아닌가 -_-?
    // hasOwnProperty니 직접적인 확인이니 가능하긴한데..
    if (target.hasOwnProperty('_' + keyName)) throwError(`${keyName} 은 이미 정의된 속성명입니다.`)

    switch (type) {
        case defineProperty.NUMBER :
        case defineProperty.INT :
        case defineProperty.UINT :
            defineNumber(target, keyName, type, option);
            break;
        case defineProperty.STRING :
            defineString(target, keyName, type, option);
            break;
        case defineProperty.BOOLEAN :
            defineBoolean(target, keyName, type, option);
            break;
        default :
            throwError('정의할수 없는 타입')
    }
}
defineProperty.NUMBER = 'NUMBER';
defineProperty.INT = 'INT';
defineProperty.UINT = 'UINT';
defineProperty.STRING = 'STRING';
defineProperty.BOOLEAN = 'BOOLEAN';
Object.freeze(defineProperty);
export default defineProperty;

/*
    TODO - definePropertys(
        target,
        [
            { keyName : '키네임', type : defineProperty.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : defineProperty.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : defineProperty.NUMBER, option : {옵션정보객체} },
            ....
        ]
     )
 */


// let target = function () {
// }
// defineProperty(
//     target.prototype,
//     'keyName',
//     defineProperty.NUMBER,
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
//     defineProperty.STRING,
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
//     defineProperty.BOOLEAN,
//     {
//         value: true,
//         allowList : [],
//         nullishAble: false,
//         callback: function () {
//         }
//     }
// )