"use strict";
import DEFINE_TYPE from "./defineProperty/DEFINE_TYPE";
import throwError from "./throwError";

let checkTypes = function (...arg) {
    let i = 0;
    let len = arg.length
    for (i; i < len; i++) {
        let tData = arg[i];
        let value = tData[0];
        let type = tData[1];
        let option = tData[2] || {};
        let hasMin = option.hasOwnProperty('min');
        let hasMax = option.hasOwnProperty('max');
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
                    if (isNaN(value)) throwError(`Number만 허용함. / 입력값 : ${value}`);
                    // 정수형의 경우 체크 && 음수체크
                    if ((type !== DEFINE_TYPE.NUMBER) && value !== parseInt(value)) throwError(`value : 소수점 허용안함. / 입력값 : ${value}`);
                    if (type === DEFINE_TYPE.UINT && value < 0) throwError(`value : 음수 허용안함. / 입력값 : ${value}`);
                    if (hasMin) {
                        if (typeof MIN != 'number' || isNaN(MIN)) throwError(`option['min'] : Number만 허용함. / 입력값 : ${MIN}`);
                        if ((type !== DEFINE_TYPE.NUMBER) && MIN !== parseInt(MIN)) throwError(`option['min'] : 소수점 허용안함. / 입력값 : ${MIN}`);
                        if (type === DEFINE_TYPE.UINT && MIN < 0) throwError(`option['min'] : 음수 허용안함. / 입력값 : ${MIN}`);
                        if (value < MIN) throwError(`option['min'] : 최소값보다 입력값이 작음 / 입력값 : ${value}`);
                    }
                    if (hasMax) {
                        if (typeof MAX != 'number' || isNaN(MAX)) throwError(`option['max'] : Number만 허용함. / 입력값 : ${MAX}`);
                        if ((type !== DEFINE_TYPE.NUMBER) && MAX !== parseInt(MAX)) throwError(`option['max'] : 소수점 허용안함. / 입력값 : ${MAX}`);
                        if (type === DEFINE_TYPE.UINT && MAX < 0) throwError(`option['max'] : 음수 허용안함. / 입력값 : ${MAX}`);
                        if (value > MAX) throwError(`option['max'] : 최대값보다 입력값이 큼 / 입력값 : ${value}`);
                    }
                    if (hasMin && hasMax) {
                        if (MIN > MAX) throwError("option['min'], option['max'] : min값은 max보다 작아야함", '입력값 : ', MIN, MAX);
                    }
                } else {
                    if (NULLISH_ABLE && VALUE_IS_NULLISH) {
                        // 널리쉬 허용일경우 통과
                    } else {
                        // 널리쉬 불허용일때 다잡아냄
                        throwError(`Number만 허용함. / 입력값 : ${value}`);
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
                        throwError(`boolean만 허용함. / 입력값 : ${value}`);
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
                        throwError(`string만 허용함. / 입력값 : ${value}`);
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
                        throwError(`function만 허용함. / 입력값 : ${value}`);
                    }
                }
                break;
            default :
                break;
        }
    }

}

export default checkTypes;