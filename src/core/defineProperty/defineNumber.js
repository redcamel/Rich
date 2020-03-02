"use strict";
import throwError from "../throwError";
import DEFINE_TYPE from "./DEFINE_TYPE";


let defineNumber = (target, keyName, type, option) => {
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
                if (type !== DEFINE_TYPE.NUMBER && v !== parseInt(v)) throwError(`${target.constructor.name} - v : 소수점 허용안함. / 입력값 : ${v}`);
                if (type === DEFINE_TYPE.UINT && v < 0) throwError(`${target.constructor.name} - v : 음수 허용안함. / 입력값 : ${v}`);
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

    if (NULLISH_ABLE) {
        if (!option.hasOwnProperty('value')) option['value'] = option['value'] = null;
    } else {
        if (!option.hasOwnProperty('value')) throwError(`${target.constructor.name} - option['value'] : nullish 허용안한 상태에서는 초기값을 반드시 지정해야합니다.. / 입력값 : ${option['value']}`);
    }

    if (!NULLISH_ABLE && type !== DEFINE_TYPE.NUMBER && option['value'] !== parseInt(option['value'])) throwError(`${target.constructor.name} - v : 소수점 허용안함. / 입력값 : ${option['value']}`);
    if (!NULLISH_ABLE && type === DEFINE_TYPE.UINT && option['value'] < 0) throwError(`${target.constructor.name} - option['value'] : 음수 허용안함. / 입력값 : ${option['value']}`);
    // 타입형 체크
    if (typeof option['value'] == 'number') {
        if (isNaN(option['value'])) throwError(`${target.constructor.name} - option['value'] : Number만 허용함. / 입력값 : ${option['value']}`);
        // range 체크
        if (hasMin) {
            if (typeof MIN != 'number' || isNaN(MIN)) throwError(`${target.constructor.name} - option['min'] : Number만 허용함. / 입력값 : ${MIN}`);
            if (!NULLISH_ABLE && type !== DEFINE_TYPE.NUMBER && MIN !== parseInt(MIN)) throwError(`${target.constructor.name} - option['min'] : 소수점 허용안함. / 입력값 : ${MIN}`);
            if (!NULLISH_ABLE && type === DEFINE_TYPE.UINT && option['min'] < 0) throwError(`${target.constructor.name} - option['min'] : 음수 허용안함. / 입력값 : ${option['min']}`);
            if (option['value'] < MIN) option['value'] = MIN
        }
        if (hasMax) {
            if (typeof MAX != 'number' || isNaN(MAX)) throwError(`${target.constructor.name} - option['max'] : Number만 허용함. / 입력값 : ${MAX}`);
            if (!NULLISH_ABLE && type !== DEFINE_TYPE.NUMBER && MAX !== parseInt(MAX)) throwError(`${target.constructor.name} - option['max'] : 소수점 허용안함. / 입력값 : ${MAX}`);
            if (!NULLISH_ABLE && type === DEFINE_TYPE.UINT && option['max'] < 0) throwError(`${target.constructor.name} - option['max'] : 음수 허용안함. / 입력값 : ${option['max']}`);
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
    if (hasCallback) {
        if (CALLBACK instanceof Function) CALLBACK.call(this, option['value']);
        else throwError(`${target.constructor.name} - option['callback'] : Function만 허용함. / 입력값 : ${CALLBACK}`);
    }
    if (tempDefineInfo) Object.defineProperty(target, keyName, tempDefineInfo);
}
export default defineNumber