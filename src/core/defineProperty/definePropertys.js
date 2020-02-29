"use strict";
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
