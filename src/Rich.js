"use strict";
import getJS from "./network/getJS";
import makeAjax from "./network/makeAjax";
import getParam from "./network/getParam";
import ClassUUID from "./core/ClassUUID";
import throwError from "./core/throwError";
import Dom from "./display/Dom";
import DETECTOR from "./ditector/DETECTOR";
import dispatcher from "./core/dispatcher";
import Css from "./css/Css";
import LOOPER from "./looper/LOOPER";
import KEY from "./keyboard/KEY";
import STORAGE from "./storage/STORAGE";
import WIN from "./window/WIN";
import getCSS from "./network/getCSS";
import defineProperty from "./core/defineProperty/defineProperty";
import definePropertys from "./core/defineProperty/definePropertys";
import queryAll from "./display/queryAll";
import query from "./display/query";
import DEFINE_TYPE from "./core/defineProperty/DEFINE_TYPE";
import checkType from "./core/checkType";
import checkTypes from "./core/checkTypes";
import checkInstanceof from "./core/checkInstanceof";
import checkSchema from "./core/checkSchema";


const Rich = (_ => {
    let tempRich;
    let CLASS_NAME_TABLE = {};

    tempRich = {
        addMethod: (name, method) => {
            if (method instanceof Function) {
                if (tempRich[name]) throwError(`${name} : 이미 존재하는 메서드 네임`);
                else {
                    let t;
                    if ((t = name.charAt(0)) !== t.toLowerCase()) throwError(`${name} : 메서드 네임은 소문자로 시작해야함`);
                    else tempRich[name] = method;

                }
            } else throwError(`${name} : 함수만 메서드로 등록가능`);
        },

        addClass: (function () {
            let checkTableAndName;
            checkTableAndName = name => {
                let t;
                if (CLASS_NAME_TABLE[name]) throwError(`${name} : 이미 존재하는 클래스 네임`);
                if ((t = name.charAt(0)) !== t.toUpperCase()) throwError(`${name} : 클래스 네임은 대문자로 시작해야함`);
                return true
            }
            return (name, cls, isClassYn = true) => {
                if (cls instanceof Function) {
                    checkTableAndName(name)
                    CLASS_NAME_TABLE[name] = cls;
                    // if (isClassYn) tempRich[name] = (...arg) => {
                    //     return new cls(...arg)
                    // };
                    // else tempRich[name] = cls;
                    tempRich[name] = cls

                } else throwError(`${name} : 클래스는 함수 확장형이어야함`);
            }
        })(),
        addStatic: (name, staticObj) => {
            if (!(staticObj instanceof Function) && staticObj instanceof Object) {
                if (name !== name.toUpperCase()) throwError(`${name} : 스타틱 오브젝트 네임은 대문자만 허용함`);
                if (tempRich[name]) throwError(`${name} : 이미 존재하는 오브젝트 네임`);
                else tempRich[name] = staticObj;
            } else throwError(`${name} : 오브젝트만 스타틱으로로 등록가능`);
        },
        init: (...urls) => {
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

                    console.log('초기화시간', time);

                    if (urls) {
                        let jsURLs = [];
                        let cssURLs = [];
                        urls.forEach(url => {
                            if (url.indexOf('.css') > -1) cssURLs.push(url)
                            else if (url.indexOf('.js') > -1) jsURLs.push(url)
                        });
                        let t0 = Promise.all(
                            [
                                getJS(...jsURLs),
                                getCSS(...cssURLs)
                            ]
                        ).then(_ => {
                            resolve(tempRich)
                        });
                        if (reject) t0.catch(error => reject(error))
                    } else resolve(tempRich);
                    dispatcher(window, 'resize')


                }
                requestAnimationFrame(tick)
            })
        }
    }
    // method
    tempRich.addMethod('throwError', throwError);
    tempRich.addMethod('defineProperty', defineProperty);
    tempRich.addMethod('definePropertys', definePropertys);
    tempRich.addMethod('checkType', checkType);
    tempRich.addMethod('checkTypes', checkTypes);
    tempRich.addMethod('checkSchema', checkSchema);
    tempRich.addMethod('checkInstanceof', checkInstanceof);
    tempRich.addMethod('getParam', getParam);
    tempRich.addMethod('dispatcher', dispatcher);
    tempRich.addMethod('makeAjax', makeAjax);
    tempRich.addMethod('ajaxJsonGet', makeAjax({method: 'GET', headers: {'Content-Type': 'application/json'}}));
    tempRich.addMethod('ajaxJsonPost', makeAjax({method: 'POST', headers: {'Content-Type': 'application/json'}}));
    tempRich.addMethod('getJS', getJS);
    tempRich.addMethod('getCSS', getCSS);
    tempRich.addMethod('query', query);
    tempRich.addMethod('queryAll', queryAll);
    // class
    tempRich.addClass('ClassUUID', ClassUUID);
    tempRich.addClass('Dom', Dom, false);
    tempRich.addClass('Css', Css, false);
    // static
    tempRich.addStatic('DEFINE_TYPE', DEFINE_TYPE);
    tempRich.addStatic('DETECTOR', DETECTOR);
    tempRich.addStatic('KEY', KEY);
    tempRich.addStatic('LOOPER', LOOPER);
    tempRich.addStatic('STORAGE', STORAGE);
    tempRich.addStatic('WIN', WIN);
    dispatcher(window, 'resize')
    return tempRich
})();
export default Rich;