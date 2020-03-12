"use strict";
//TODO - 여기 정리해야겠다... 아호..
import throwError from "./throwError";
import DEFINE_TYPE from "./defineProperty/DEFINE_TYPE";

let check;
let checkStruct;
check = function(checkValue, structInfo){
    let checkTYPE = structInfo['type']
    if (DEFINE_TYPE[checkTYPE]) {
        switch (DEFINE_TYPE[checkTYPE]) {
            case  DEFINE_TYPE.ARRAY :
                // 일단 배열인지 검증
                Rich.checkType(checkValue, checkTYPE, structInfo['option'])
                if (structInfo['childItem']) {
                    let childItemStruct = structInfo['childItem']
                    let childItemType = childItemStruct['type']
                    checkValue.forEach(function (v) {
                        console.log(v)
                        Rich.checkType(v, childItemType, childItemStruct['option'])
                        // 오브젝트일때
                        if (childItemStruct['struct']) checkStruct(v, childItemStruct['struct'])
                        if (childItemStruct['childItem']) {
                            console.log('여기걸려야할텐데?',v,childItemStruct['childItem'])
                            checkStruct(v, childItemStruct['childItem'],true)
                        }
                        // 배열일떄
                    })
                }
                break
            case  DEFINE_TYPE.OBJECT :
                Rich.checkType(checkValue, checkTYPE, structInfo['option'])
                checkStruct(checkValue, structInfo['struct'])
                break
            default :
                Rich.checkType(checkValue, checkTYPE, structInfo['option'])
                break
        }

    } else {
        throwError(`${checkTYPE}은 검증할수 없는 타입임구조체에 존재하지 않는 키를 검증하려고함 / 입력값 : ${checkTYPE}`)
    }
}
checkStruct = function (data, structInfo,isArrayTest=false) {
    let k;
    if(isArrayTest){
        data.forEach(function(v){
            check(v, structInfo)
        })
    }else{
        for (k in data) {
            if (structInfo.hasOwnProperty(k)) {
                check(data[k], structInfo[k])
            } else throwError(`구조체에 존재하지 않는 키를 검증하려고함 / 입력값 : ${k}`)
        }
    }

}
let checkSchema = function (data, structInfo) {
    let result = true;
    if (!data instanceof Object) throwError('checkSchema : Object만 검증가능')
    checkStruct(data, structInfo)
}
export default checkSchema;
