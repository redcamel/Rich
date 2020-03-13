"use strict";
import DEFINE_TYPE from "./defineProperty/DEFINE_TYPE";
import throwError from "./throwError";

let checkType = function (value, type, option) {
    option = option || {};
    let hasMin = option.hasOwnProperty('min');
    if(hasMin && (option['min'] === null || option['min'] === undefined)) hasMin = false
    let hasMax = option.hasOwnProperty('max');
    if(hasMax && (option['max'] === null || option['max'] === undefined)) hasMax = false
    let MIN = hasMin ? option['min'] : null;
    let MAX = hasMax ? option['max'] : null;
    if (!option.hasOwnProperty('nullishAble')) option['nullishAble'] = true;
    let NULLISH_ABLE = option['nullishAble']
    let VALUE_IS_NULLISH = (value === null || value === undefined)
    switch (type) {
        case DEFINE_TYPE.NUMBER :
        case DEFINE_TYPE.INT :
        case DEFINE_TYPE.UINT :
            if (typeof value == 'number') {
                // 넘버면 NaN 제외 일단 통과
                if (isNaN(value)) throwError(`checkType - ${type} : Number만 허용함. / 입력값 : ${value}`);
                // 정수형의 경우 체크 && 음수체크
                if ((type !== DEFINE_TYPE.NUMBER) && value !== parseInt(value)) throwError(`checkType - ${type} : value : 소수점 허용안함. / 입력값 : ${value}`);
                if (type === DEFINE_TYPE.UINT && value < 0) throwError(`checkType - ${type} : value : 음수 허용안함. / 입력값 : ${value}`);
                if (hasMin) {
                    if (typeof MIN != 'number' || isNaN(MIN)) throwError(`checkType - ${type} : option.min : Number만 허용함. / 입력값 : ${MIN}`);
                    if ((type !== DEFINE_TYPE.NUMBER) && MIN !== parseInt(MIN)) throwError(`checkType - ${type} : option.min : 소수점 허용안함. / 입력값 : ${MIN}`);
                    if (type === DEFINE_TYPE.UINT && MIN < 0) throwError(`checkType - ${type} : option.min : 음수 허용안함. / 입력값 : ${MIN}`);
                    if (value < MIN) throwError(`checkType - ${type} : option.min : 최소값보다 입력값이 작음 / 입력값 : ${value}`);
                }
                if (hasMax) {
                    if (typeof MAX != 'number' || isNaN(MAX)) throwError(`option.max : Number만 허용함. / 입력값 : ${MAX}`);
                    if ((type !== DEFINE_TYPE.NUMBER) && MAX !== parseInt(MAX)) throwError(`option.max : 소수점 허용안함. / 입력값 : ${MAX}`);
                    if (type === DEFINE_TYPE.UINT && MAX < 0) throwError(`option.max : 음수 허용안함. / 입력값 : ${MAX}`);
                    if (value > MAX) throwError(`checkType - ${type} : option.max : 최대값보다 입력값이 큼 / 입력값 : ${value}`);
                }
                if (hasMin && hasMax) {
                    if (MIN > MAX) throwError("checkType - ${type} : option.min, option.max : min값은 max보다 작아야함", '입력값 : ', MIN, MAX);
                }
            } else {
                if (NULLISH_ABLE && VALUE_IS_NULLISH) {
                    // 널리쉬 허용일경우 통과
                } else {
                    // 널리쉬 불허용일때 다잡아냄
                    throwError(`checkType - ${type} : Number만 허용함. / 입력값 : ${value}`);
                }
            }
            break;
        case DEFINE_TYPE.BOOLEAN :
            if (typeof value == 'boolean') {
            } else {
                if (NULLISH_ABLE && VALUE_IS_NULLISH) {
                    // 널리쉬 허용일경우 통과
                } else {
                    // 널리쉬 불허용일때 다잡아냄
                    throwError(`checkType - ${type} : boolean만 허용함. / 입력값 : ${value}`);
                }
            }
            break;
        case DEFINE_TYPE.STRING :
            if (typeof value == 'string') {
            } else {
                if (NULLISH_ABLE && VALUE_IS_NULLISH) {
                    // 널리쉬 허용일경우 통과
                } else {
                    // 널리쉬 불허용일때 다잡아냄
                    throwError(`checkType - ${type} : string만 허용함. / 입력값 : ${value}`);
                }
            }
            break;
        case DEFINE_TYPE.FUNCTION :
            if (typeof value == 'function') {
            } else {
                if (NULLISH_ABLE && VALUE_IS_NULLISH) {
                    // 널리쉬 허용일경우 통과
                } else {
                    // 널리쉬 불허용일때 다잡아냄
                    throwError(`checkType - ${type} : function만 허용함. / 입력값 : ${value}`);
                }
            }
            break;
        case DEFINE_TYPE.ARRAY :
            if (value instanceof Array) {
            } else {
                if (NULLISH_ABLE && VALUE_IS_NULLISH) {
                    // 널리쉬 허용일경우 통과
                } else {
                    // 널리쉬 불허용일때 다잡아냄

                    throwError(`checkType - ${type} : ARRAY만 허용함. / 입력값 : ${value}`);
                }
            }
            break;
        case DEFINE_TYPE.OBJECT :
            if (value instanceof Object && !(value instanceof Array)) {
            } else {
                if (NULLISH_ABLE && VALUE_IS_NULLISH) {
                    // 널리쉬 허용일경우 통과
                } else {
                    // 널리쉬 불허용일때 다잡아냄
                    throwError(`checkType - ${type} : 순수 OBJECT만 허용함. / 입력값 : ${value}`);
                }
            }
            break;
        default :
            throwError(`허용하지않는 타입을 체크하려고함. / 입력값 : ${value}`);
            break;
    }
}

export default checkType;