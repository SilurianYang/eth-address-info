"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
var sendSuccess = function (data) {
    return {
        status: 200,
        data: data
    };
};
exports.sendSuccess = sendSuccess;
var sendError = function (error) {
    return {
        status: 201,
        data: error
    };
};
exports.sendError = sendError;
