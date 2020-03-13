"use strict"
import throwError from "../throwError";
import DEFINE_TYPE from "./DEFINE_TYPE";
import defineNumber from "./defineNumber";
import defineString from "./defineString";
import defineBoolean from "./defineBoolean";
import defineCustomType from "./defineCustomType";
import defineFunction from "./defineFunction";
import defineArray from "./defineArray";
import defineObject from "./defineObject";

let defineProperty;
defineProperty = (target, keyName, type, option, isCustomType = false) => {
    if (typeof keyName != 'string') throwError(`${keyName} : keyName은 문자열만 가능함`)
    if (!(target instanceof Object)) throwError(`${target} : Object 확장만 target이 될수있음.`)
    if (!isCustomType && !DEFINE_TYPE[type]) throwError(`${type} 은 정의 할수 없는 타입임.`)
    if (!(option === undefined || option === null)) {
        if (!(option instanceof Object) || option instanceof Function || option instanceof Array) throwError(`${option} : option은 nullish와 Object만 허용`)
    }
    option = option || {};
    // nullishAble 지정안하면 기본값 : true
    if (!option.hasOwnProperty('nullishAble')) option['nullishAble'] = true;
    //TODO - 오버라이드가 가능해야되는거 아닌가 -_-?
    // hasOwnProperty니 직접적인 확인이니 가능하긴한데..
    if (target.hasOwnProperty('_' + keyName)) throwError(`${keyName} 은 이미 정의된 속성명입니다.`)
    if (isCustomType) {
        defineCustomType(target, keyName, type, option);
    } else {
        switch (type) {
            case DEFINE_TYPE.NUMBER :
            case DEFINE_TYPE.INT :
            case DEFINE_TYPE.UINT :
                defineNumber(target, keyName, type, option);
                break;
            case DEFINE_TYPE.STRING :
                defineString(target, keyName, type, option);
                break;
            case DEFINE_TYPE.BOOLEAN :
                defineBoolean(target, keyName, type, option);
                break;
            case DEFINE_TYPE.FUNCTION :
                defineFunction(target, keyName, type, option);
                break;
            case DEFINE_TYPE.ARRAY :
                defineArray(target, keyName, type, option);
                break;
            case DEFINE_TYPE.OBJECT :
                defineObject(target, keyName, type, option);
                break;
            default :
                throwError(`${type} : 정의할수 없는 타입`)
        }
    }
    return option
}
Object.freeze(defineProperty);
export default defineProperty;

/*
    TODO - definePropertys(
        target,
        [
            { keyName : '키네임', type : DEFINE_TYPE.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : DEFINE_TYPE.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : DEFINE_TYPE.NUMBER, option : {옵션정보객체} },
            ....
        ]
     )
 */
/*
    TODO - 커스텀
    TODO - FUNCTION
 */


// let target = function () {
// }
// defineProperty(
//     target.prototype,
//     'keyName',
//     DEFINE_TYPE.NUMBER,
//     {
//         value: 0,
//         min: 0,
//         max: 0,
//         nullishAble: false,
//         callback: function () {
//         }
//     }
// )

// defineProperty(
//     target.prototype,
//     'keyName',
//     DEFINE_TYPE.STRING,
//     {
//         value: 0,
//         allowList : [],
//         nullishAble: false,
//         callback: function () {
//         }
//     }
// )

// defineProperty(
//     target.prototype,
//     'keyName',
//     DEFINE_TYPE.BOOLEAN,
//     {
//         value: true,
//         allowList : [],
//         nullishAble: false,
//         callback: function () {
//         }
//     }
// )
