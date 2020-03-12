"use strict";

import throwError from "./throwError";
import DEFINE_TYPE from "./defineProperty/DEFINE_TYPE";

let check;
check = function (data, structInfo) {
    console.log('check',data, structInfo)
    var k;
    for (k in data) {
        if (structInfo.hasOwnProperty(k)) {
            let tStruct = structInfo[k];
            let tValue = data[k];
            let checkTYPE = tStruct['type']
            if (DEFINE_TYPE[checkTYPE]) {
                switch (DEFINE_TYPE[checkTYPE]) {
                    case  DEFINE_TYPE.ARRAY :
                        console.log('배열 데이터 검증', k, tValue, tStruct)
                        // 일단 배열인지 검증
                        Rich.checkType(tValue, checkTYPE, tStruct['option'])
                        // childItem이 정의 되어 있으면 어떻게 순환 할까...
                        if(tStruct['childItem']){
                            let childItemStruct = tStruct['childItem']
                            let childItemType = childItemStruct['type']
                            tValue.forEach(function(v){
                                console.log(v)
                                Rich.checkType(v, childItemType, childItemStruct['option'])
                                check(v,childItemStruct['struct'] )
                            })
                        }
                        break
                    case  DEFINE_TYPE.OBJECT :
                        console.log('오브젝트 데이터 검증', k, tValue, tStruct)
                        Rich.checkType(tValue, checkTYPE, tStruct['option'])
                        check(tValue, tStruct['struct'])
                        break
                    default :
                        console.log('단일 데이터 검증', k, tValue, tStruct)
                        Rich.checkType(tValue, checkTYPE, tStruct['option'])
                        break
                }

            } else {
                throwError(`${checkTYPE}은 검증할수 없는 타입임구조체에 존재하지 않는 키를 검증하려고함 / 입력값 : ${checkTYPE}`)
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
