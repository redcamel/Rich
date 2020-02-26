"use strict"
import throwError from "./throwError";

let defineProperty;
defineProperty = (target, type, option) => {
    if (!(target instanceof Object)) throwError(`${target} : 오브젝트 확장만 target이 될수있음.`)
    if (!defineProperty[type]) throwError(`${type} 은 정의 할수 없는 타입임.`)
    if (!(option == undefined && option == null)) {
        console.log('걸린다고?', option)
        if (!(option instanceof Object) || option instanceof Function) throwError(`${option} : option은 nullish와 Object만 허용`)
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
//     nullish: false,
//     callback: function () {
//     }
// })