"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMergeIn = exports.createConfigIn = exports.getUserConfig = void 0;
var fs_1 = __importDefault(require("fs"));
var config_1 = require("../config/config");
var log_1 = require("./log");
function getUserConfig() {
    var userConfigStr = fs_1.default.readFileSync(config_1.BASECONFIG.userConfigPath).toString();
    try {
        if (userConfigStr.trim() === '') {
            return config_1.baseUserConfig;
        }
        var userJson = JSON.parse("{".concat(userConfigStr, "}"));
        return userJson;
    }
    catch (error) {
        log_1.LOGGER.error("\u8BFB\u53D6\u7528\u6237\u81EA\u5B9A\u4E49\u6587\u4EF6\u5931\u8D25\uFF0C\u9519\u8BEF\u4FE1\u606F\u5982\u4E0B\u2193\u2193\u2193\u2193\u2193");
        log_1.LOGGER.error(error);
        (0, log_1.shutdown)(function () {
            process.exit(0);
        });
    }
}
exports.getUserConfig = getUserConfig;
function createConfigIn() {
    var exists = fs_1.default.existsSync(config_1.BASECONFIG.userConfigPath);
    if (!exists) {
        fs_1.default.writeFileSync(config_1.fileName, '');
    }
}
exports.createConfigIn = createConfigIn;
var loadMergeIn = function () {
    log_1.LOGGER.info("\u6B63\u5728\u52A0\u8F7D\u9ED8\u8BA4\u914D\u7F6E\uFF0C\u8BF7\u7A0D\u540E.....");
    createConfigIn();
    var USECONFIG = getUserConfig();
    var CURRENTDATA = Object.assign(config_1.baseUserConfig, USECONFIG);
    log_1.LOGGER.info("\u9ED8\u8BA4\u914D\u7F6E\u52A0\u8F7D\u6210\u529F\uFF0C\u5F00\u59CB\u8868\u6F14......");
    return CURRENTDATA;
};
exports.loadMergeIn = loadMergeIn;
