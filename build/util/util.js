"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeOut = void 0;
var timeOut = function (time) {
    if (time === void 0) { time = 10000; }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};
exports.timeOut = timeOut;
