"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableEronWeb = exports.privateKeyGetAddress = exports.initTronWeb = void 0;
var tronweb_1 = __importDefault(require("tronweb"));
var helper_1 = require("../util/helper");
var log_1 = require("../util/log");
var moment_1 = require("../util/moment");
var initTronWeb = function (apiPath, apiKey, privateKey) {
    try {
        var HttpProvider = tronweb_1.default.providers.HttpProvider;
        var fullNode = new HttpProvider(apiPath);
        var solidityNode = new HttpProvider(apiPath);
        var eventServer = new HttpProvider(apiPath);
        var tronWeb = new tronweb_1.default(fullNode, solidityNode, eventServer, privateKey);
        tronWeb.setHeader({ "TRON-PRO-API-KEY": apiKey });
        return tronWeb;
    }
    catch (error) {
        log_1.LOGGER.error('初始化失败，错误信息如下：');
        log_1.LOGGER.error(error);
        return false;
    }
};
exports.initTronWeb = initTronWeb;
var privateKeyGetAddress = function (tronWeb, privateKey) {
    return tronWeb.address.fromPrivateKey(privateKey);
};
exports.privateKeyGetAddress = privateKeyGetAddress;
var getAvailableEronWeb = function (CURRENTDATA, privateKey) {
    var apiKey = CURRENTDATA.apiKey;
    for (var i = 0; i < apiKey.length; i++) {
        var item = apiKey[i];
        if (item.useDate === '') { //当前 key未使用过， 直接返回
            return item.apiKey;
        }
        if (item.usedCount > item.totalCount) {
            var toDay = (0, moment_1.getToDayTime)();
            if (toDay != item.useDate) { //已经隔天 可以重置
                item.usedCount = 0;
                item.useDate = (0, moment_1.getToDayTime)();
                var tronWeb = (0, exports.initTronWeb)(CURRENTDATA.apiPath, item.apiKey, privateKey);
                if (tronWeb === false) {
                    var errText_1 = '秘钥信息不正确，请使用正确的秘钥信息（#2002）';
                    log_1.LOGGER.error(errText_1);
                    return (0, helper_1.sendError)({
                        msg: errText_1
                    });
                }
                item.TRONWEB = tronWeb;
                return item.TRONWEB;
            }
        }
        else {
            item.usedCount++;
            if (item.usedCount < item.totalCount) {
                return item.TRONWEB;
            }
        }
    }
    var errText = '所有的KEY已经使用上限，今日无法继续再使用API';
    log_1.LOGGER.error(errText);
    return (0, helper_1.sendError)({
        msg: errText
    });
};
exports.getAvailableEronWeb = getAvailableEronWeb;
