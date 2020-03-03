"use strict"
import throwError from "./throwError";

let checkInstanceof = function (value, type, nullishAble = true) {
    if (nullishAble) {
        if (value === null || value === undefined) {

        } else {
            if (!(value instanceof type)) throwError(`입력한 타입만 허용함 / value : ${value} / type : ${type}`);
        }

    } else {
        if (!(value instanceof type)) throwError(`입력한 타입만 허용함 / value : ${value} / type : ${type}`);
    }

}
export default checkInstanceof;