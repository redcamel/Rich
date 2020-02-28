"use strict";
import throwError from "../throwError";


let defineString = (target, keyName, type, option) => {
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
    if (hasCallback) {
        if (CALLBACK instanceof Function) CALLBACK.call(this, option['value']);
        else throwError(`${target.constructor.name} - option['callback'] : Function만 허용함. / 입력값 : ${CALLBACK}`);
    }
    if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
}
export default defineString