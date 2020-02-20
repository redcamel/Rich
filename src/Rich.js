"use strict";
import getJS from "./network/getJS";
import makeAjax from "./network/makeAjax";
import getParam from "./network/getParam";
import ClassUUID from "./core/ClassUUID";
import throwError from "./core/throwError";
import isClass from "./core/isClass";
import Dom from "./display/Dom";
import DETECTOR from "./ditector/DETECTOR";
import dispatcher from "./core/dispatcher";
import Css from "./css/Css";

const Rich = (_ => {
    let tempRich;
    let CLASS_NAME_TABLE = {};
    tempRich = {
        addMethod: (name, method) => {
            if (method instanceof Function) {
                if (tempRich[name]) throwError(`${name} : 이미 존재하는 메서드 네임`);
                else tempRich[name] = method;
            } else throwError(`${name} : 함수만 메서드로 등록가능`);
        },

        addClass: (name, cls, isClassYn = true) => {
            if (cls instanceof Function) {
                if (isClassYn) {
                    if (isClass(cls)) {
                        console.log(cls)
                        if (CLASS_NAME_TABLE[name]) throwError(`${name} : 이미 존재하는 클래스 네임`);
                        else {
                            CLASS_NAME_TABLE[name] = cls;
                            tempRich[name] = (...args) => new cls(...args)
                        }
                    } else {
                        throwError(`${name} : Class 가 아님`);
                    }
                } else {
                    if (CLASS_NAME_TABLE[name]) throwError(`${name} : 이미 존재하는 클래스 네임`);
                    else {
                        CLASS_NAME_TABLE[name] = cls;
                        tempRich[name] = cls;
                    }
                }
            } else throwError(`${name} : 클래스는 함수 확장형이어야함`);
        },
        addStatic: (name, staticObj) => {
            if (!(staticObj instanceof Function) && staticObj instanceof Object) {
                if (tempRich[name]) throwError(`${name} : 이미 존재하는 오브젝트 네임`);
                else tempRich[name] = staticObj;
            } else throwError(`${name} : 오브젝트만 스타틱으로로 등록가능`);
        },
        init: () => {
            return new Promise((resolve, reject) => {
                let tick = time => {
                    switch (document.readyState) {
                        case'complete':
                        case'loaded':
                            console.log('document.readyState :', document.readyState)
                            break;
                        case'interactive':
                            if (document.documentElement.doScroll) try {
                                document.documentElement.doScroll('left');
                            } catch (e) {
                                return requestAnimationFrame(tick)
                            }
                        default:
                            return requestAnimationFrame(tick)
                    }

                    resolve(tempRich);
                }
                requestAnimationFrame(tick)
            })
        }
    }
    // method
    tempRich.addMethod('isClass', isClass)
    tempRich.addMethod('throwError', throwError)
    tempRich.addMethod('getParam', getParam)
    tempRich.addMethod('makeAjax', makeAjax)
    tempRich.addMethod('ajaxJsonGet', makeAjax({method: 'GET', headers: {'Content-Type': 'application/json'}}))
    tempRich.addMethod('ajaxJsonPost', makeAjax({method: 'POST', headers: {'Content-Type': 'application/json'}}))
    tempRich.addMethod('getJS', getJS)
    tempRich.addMethod('dispatcher', dispatcher)
    // class
    tempRich.addClass('ClassUUID', ClassUUID)
    tempRich.addClass('Dom', Dom, false)
    tempRich.addClass('Css', Css, false)
    // static
    tempRich.addStatic('DETECTOR', DETECTOR)
    return tempRich
})();
export default {
    init: Rich.init,
    addMethod: Rich.addMethod,
    addClass: Rich.addClass,
    addStatic: Rich.addStatic,
    // method
    isClass: Rich.isClass,
    throwError: Rich.throwError,
    getParam: getParam,
    ajaxJsonGet: Rich.ajaxJsonGet,
    ajaxJsonPost: Rich.ajaxJsonPost,
    getJS: Rich.getJS,
    dispatcher: Rich.dispatcher,
    // class
    ClassUUID: Rich.ClassUUID,
    Dom: Rich.Dom,
    Css: Rich.Css,
    // static
    DETECTOR: Rich.DETECTOR

};
// export default result