"use strict";
export default function throwError(...arg) {

    throw new Error(arg.join(' '))
}