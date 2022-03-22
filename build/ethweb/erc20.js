"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashByInfo = exports.queryHistory = exports.getAvailableApiKey = exports.hashIdByHistory = void 0;
var helper_1 = require("../util/helper");
var log_1 = require("../util/log");
var superagent_1 = __importDefault(require("superagent"));
require('superagent-proxy')(superagent_1.default);
var hashIdByHistory = function (tronWeb, hashId) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, tronWeb.trx.getTransactionInfo(hashId)];
                case 1:
                    res = _a.sent();
                    if (Object.keys(res).length > 0) {
                        return [2 /*return*/, resolve((0, helper_1.sendSuccess)({
                                block: res
                            }))];
                    }
                    return [2 /*return*/, resolve((0, helper_1.sendSuccess)({
                            block: {}
                        }))];
                case 2:
                    error_1 = _a.sent();
                    log_1.LOGGER.error(error_1);
                    log_1.LOGGER.error("\u67E5\u8BE2 hash \uFF1A".concat(hashId, " \u4E0D\u5B58\u5728\uFF0C\u8BF7\u586B\u5199\u6B63\u786E\u7684hash\u5730\u5740"));
                    return [2 /*return*/, resolve((0, helper_1.sendError)({
                            msg: "".concat(hashId, " hash \u5730\u5740\u67E5\u8BE2\u5931\u8D25\uFF08#2001\uFF09")
                        }))];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.hashIdByHistory = hashIdByHistory;
var getAvailableApiKey = function (CURRENTDATA) {
    var list = CURRENTDATA.apiKey;
    for (var i = 0; i < list.length; i++) {
        var _a = list[i], usedCount = _a.usedCount, totalCount = _a.totalCount, useDate = _a.useDate, apiKey = _a.apiKey;
        if (usedCount < totalCount) {
            return apiKey;
        }
    }
    log_1.LOGGER.error("API \u79D8\u94A5\u4ECA\u65E5\u5DF2\u7ECF\u4F7F\u7528\u4E0A\u9650\uFF0C\u8BF7\u8054\u7CFB\u5F00\u53D1\u8005\uFF08#10001\uFF09");
    return '';
};
exports.getAvailableApiKey = getAvailableApiKey;
var queryHistory = function (CURRENTDATA, userRule, type) {
    var _this = this;
    if (type === void 0) { type = ''; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var res, results, diffList, i, item, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, superagent_1.default.get(CURRENTDATA.apiPath)
                            .query(__assign({}, userRule))
                        //@ts-ignore
                        // .proxy(`http://127.0.0.1:1080`)
                    ];
                case 1:
                    res = _a.sent();
                    results = res.body;
                    if (!/^OK.*/.test(results.message)) {
                        log_1.LOGGER.error(results);
                        return [2 /*return*/, resolve((0, helper_1.sendError)(__assign({}, results)))];
                    }
                    diffList = [];
                    if (type !== '') {
                        for (i = 0; i < results.result.length; i++) {
                            item = results.result[i];
                            item.value = item.value / Math.pow(10, 6);
                            if (type === 'in' && item.to === userRule.address) {
                                diffList.push(item);
                            }
                            else if (type === 'out' && item.from === userRule.address) {
                                diffList.push(item);
                            }
                        }
                    }
                    else {
                        diffList = results.result;
                    }
                    results.result = diffList;
                    return [2 /*return*/, resolve((0, helper_1.sendSuccess)(__assign({}, results)))];
                case 2:
                    error_2 = _a.sent();
                    log_1.LOGGER.error(error_2);
                    log_1.LOGGER.error("\u67E5\u8BE2 \u5730\u5740 \uFF1A".concat(userRule.address, " \u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"));
                    return [2 /*return*/, resolve((0, helper_1.sendError)({
                            msg: "".concat(userRule.address, " \u5730\u5740\u67E5\u8BE2\u5931\u8D25\uFF08#2001\uFF09")
                        }))];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.queryHistory = queryHistory;
var hashByInfo = function (CURRENTDATA, hash) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var res, results, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, superagent_1.default.get(CURRENTDATA.apiPath)
                            .query({
                            module: 'transaction',
                            action: 'gettxreceiptstatus',
                            txhash: hash
                        })];
                case 1:
                    res = _a.sent();
                    results = res.body;
                    return [2 /*return*/, resolve((0, helper_1.sendSuccess)(__assign({}, results.result)))];
                case 2:
                    error_3 = _a.sent();
                    log_1.LOGGER.error(error_3);
                    log_1.LOGGER.error("\u67E5\u8BE2 hash \uFF1A".concat(hash, " \u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"));
                    return [2 /*return*/, resolve((0, helper_1.sendError)({
                            msg: "".concat(hash, " hash\u67E5\u8BE2\u5931\u8D25\uFF08#2001\uFF09")
                        }))];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.hashByInfo = hashByInfo;
