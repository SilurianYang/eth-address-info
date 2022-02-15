"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToDayTime = void 0;
var moment_1 = __importDefault(require("moment"));
var getToDayTime = function (format) {
    if (format === void 0) { format = 'DD/MM/YYYY'; }
    return (0, moment_1.default)().format(format);
};
exports.getToDayTime = getToDayTime;
