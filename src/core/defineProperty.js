"use strict"
import throwError from "./throwError";

let defineProperty;
defineProperty = (target, keyName, type, option) => {
    if (typeof keyName != 'string') throwError(`${keyName} : keyName은 문자열만 가능함`)
    if (!(target instanceof Object)) throwError(`${target} : Object 확장만 target이 될수있음.`)
    if (!defineProperty[type]) throwError(`${type} 은 정의 할수 없는 타입임.`)
    if (!(option == undefined && option == null)) {
        console.log('걸린다고?', option)
        if (!(option instanceof Object) || option instanceof Function) throwError(`${option} : option은 nullish와 Object만 허용`)
    }
    option = option || {};
    if (target.hasOwnProperty('_' + keyName)) throwError(`${keyName} 은 이미 정의된 속성명입니다.`)
    let tempDefineInfo;
    switch (type) {
        case defineProperty.NUMBER : {
            // get/set 함수 설정
            let hasMin = option.hasOwnProperty('min');
            let hasMax = option.hasOwnProperty('max');
            let hasCallback = option.hasOwnProperty('callback');
            let MIN = hasMin ? option['min'] : null;
            let MAX = hasMax ? option['max'] : null;
            let CALLBACK = hasCallback ? option['callback'] : null;
            let NULLISH_ABLE = option['nullishAble']
            tempDefineInfo = {
                get: function () {
                    return this['_' + keyName]
                },
                set: function (v) {
                    if (typeof v == 'number') {
                        if (isNaN(v)) throwError(`${target.constructor.name} - v : Number만 허용함. / 입력값 : ${v}`);
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
            // 타입형 체크
            if (typeof option['value'] == 'number') {
                if (isNaN(option['value'])) throwError(`${target.constructor.name} - option['value'] : Number만 허용함. / 입력값 : ${option['value']}`);
                // range 체크
                if (hasMin) {
                    if (typeof MIN != 'number' || isNaN(MIN)) throwError(`${target.constructor.name} - option['min'] : Number만 허용함. / 입력값 : ${MIN}`);
                    if (option['value'] < MIN) option['value'] = MIN
                }
                if (hasMax) {
                    if (typeof MAX != 'number' || isNaN(MAX)) throwError(`${target.constructor.name} - option['max'] : Number만 허용함. / 입력값 : ${MAX}`);
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
            if (hasCallback) CALLBACK.call(this, option['value'])
        }
            break;
    }
    if (tempDefineInfo) {
        Object.defineProperty(target, keyName, tempDefineInfo)
    }
}
defineProperty.NUMBER = 'NUMBER';
defineProperty.INT = 'INT';
defineProperty.UINT = 'UINT';
defineProperty.STRING = 'STRING';
defineProperty.BOOLEAN = 'BOOLEAN';
Object.freeze(defineProperty)
export default defineProperty;

// defineProperty('number', {
//     value: 0,
//     min: 0,
//     max : 0,
//     step: 0.1,
//     nullishAble: false,
//     callback: function () {
//     }
// })