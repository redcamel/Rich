"use strict";
export default function getParam(searchKey, targetURL) {
    let reg, temp;
    reg = new RegExp("[\\?&]" + searchKey.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") + "=([^&#]*)");
    temp = targetURL ? reg.exec(targetURL) : reg.exec(location.search);
    return temp === null ? undefined : decodeURIComponent(temp[1].replace(/\+/g, " "));
}