"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdown = exports.LOGGER = void 0;
var log4js_1 = require("log4js");
Object.defineProperty(exports, "shutdown", { enumerable: true, get: function () { return log4js_1.shutdown; } });
(0, log4js_1.configure)({
    appenders: {
        // 定义输出到哪
        console: {
            type: 'stdout',
        },
        runtime: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            daysToKeep: 10,
            filename: './logs/runtime.log',
            keepFileExt: false,
            compress: true,
        }
    },
    categories: {
        // 定义两个分类，外部实例化的时候可以任选其一
        default: { appenders: ['console', 'runtime'], level: 'debug' },
    },
});
var LOGGER = (0, log4js_1.getLogger)();
exports.LOGGER = LOGGER;
