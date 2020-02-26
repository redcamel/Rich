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
    if (target.hasOwnProperty(['_' + keyName])) throwError(`${keyName} 은 이미 정의된 속성명입니다.`)
    let tempDefineInfo;
    switch (type) {
        case defineProperty.NUMBER :
            // get/set 함수 설정
            tempDefineInfo = {
                get: function () {
                    return this['_' + keyName]
                },
                set: function (v) {
                    if (typeof v != 'number' || isNaN(v)) throwError(target.constructor.name + ' - ' + keyName + ' : 숫자만 허용함.', '입력값 : ' + v);
                    this['_' + keyName] = v
                }
            }
            // 기본값 생성
            option['value'] = option['value'] || 0
            // 타입형 체크
            if (typeof option['value'] != 'number' || isNaN(option['value'])) throwError(target.constructor.name + ' - ' + keyName + ' : 초기값은 Number만 허용함.', '입력값 : ' + option['value']);
            // 초기값 지정
            target['_' + keyName] = option['value'];
            break
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
//     range: [0, 10],
//     step: 0.1,
//     nullishAble: false,
//     callback: function () {
//     }
// })