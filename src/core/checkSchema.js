"use strict";

import throwError from "./throwError";
import DEFINE_TYPE from "./defineProperty/DEFINE_TYPE";

let check;
check = function (data, structInfo) {
    var k;
    for (k in data) {
        if (structInfo.hasOwnProperty(k)) {
            let tStruct = structInfo[k];
            let tValue = data[k];
            if(DEFINE_TYPE[tStruct['type']]){
                // console.log(tValue, tStruct['type'], tStruct['option'])
                Rich.checkType(tValue, tStruct['type'], tStruct['option'])
            }else{
                throwError(`${tStruct['type']}은 검증할수 없는 타입임구조체에 존재하지 않는 키를 검증하려고함 / 입력값 : ${tStruct['type']}`)
            }

        } else throwError(`구조체에 존재하지 않는 키를 검증하려고함 / 입력값 : ${k}`)
    }
}
let checkSchema = function (data, structInfo) {
    let result = true;
    if (!data instanceof Object) throwError('checkSchema : Object만 검증가능')
    check(data, structInfo)
}
export default checkSchema;
