"use strict";

import throwError from "./throwError";

let check;
check = function (data, structInfo) {
    var k;
    for (k in data) {
        if (structInfo.hasOwnProperty(k)) {
            console.log(data[k], structInfo[k].type, structInfo[k]['option'])
            Rich.checkType(data[k], structInfo[k].type, structInfo[k]['option'])
        } else throwError(`구조체에 존재하지 않는 키를 검증하려고함 / 입력값 : ${k}`)
    }
}
let checkSchema = function (data, structInfo) {
    let result = true;
    if (!data instanceof Object) throwError('checkSchema : Object만 검증가능')
    check(data, structInfo)
}
export default checkSchema;
