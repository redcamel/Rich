"use strict"

/*
    TODO - definePropertys(
        target,
        [
            { keyName : '키네임', type : defineProperty.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : defineProperty.NUMBER, option : {옵션정보객체} },
            { keyName : '키네임', type : defineProperty.NUMBER, option : {옵션정보객체} },
            ....
        ]
     )
 */
import defineProperty from "./defineProperty";

let definePropertys;
definePropertys = (target, defineList = []) => {
    defineList.forEach(defineData => {
        defineProperty(
            target,
            defineData['keyName'],
            defineData['type'],
            defineData['option'],
            defineData['isCustomType']
        )
    })
}
Object.freeze(definePropertys);
export default definePropertys;
