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
            tempDefineInfo = {
                get: function () {
                    return this['_' + keyName]
                },
                set: function (v) {
                    if (typeof v != 'number' || isNaN(v)) throwError(`${target.constructor.name} - ${keyName} : Number만 허용함. / 입력값 : ${v}`);
                    if (hasMin && v < MIN) v = MIN
                    if (hasMax && v > MAX) v = MAX
                    this['_' + keyName] = v
                    // 콜백 옵션실행
                    if (hasCallback) CALLBACK.call(this, v)
                }
            }
            //TODO - nullishAble을 포함해서 동적 작성하고 싶은데...귀찮네..
            // 기본값 생성
            option['value'] = option['value'] || 0
            // 타입형 체크
            if (typeof option['value'] != 'number' || isNaN(option['value'])) throwError(`${target.constructor.name} - option['value'] : Number만 허용함. / 입력값 : ${option['value']}`);
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