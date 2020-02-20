"use strict"

let UUID = 1
export default class ClassUUID {
    _uuid;
    constructor() {
        this._uuid = UUID;
        UUID++
    }
}