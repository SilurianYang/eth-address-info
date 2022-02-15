"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUserConfig = exports.Erc20ContractAddress = exports.BASECONFIG = exports.fileName = exports.rootPath = void 0;
var path_1 = require("path");
exports.rootPath = process.cwd();
exports.fileName = 'USERCONFIG.in';
exports.BASECONFIG = {
    userConfigPath: (0, path_1.resolve)(exports.rootPath, "./".concat(exports.fileName)),
};
exports.Erc20ContractAddress = {
    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7'
};
exports.baseUserConfig = {
    port: 8888,
    apiPath: 'https://api.etherscan.io/api',
    apiKey: [{
            apiKey: 'XTEXXWMAFYDFJ7G6XUFDRJR91E44RKKIP1',
            totalCount: 100000,
            usedCount: 0,
            useDate: '',
        }]
};
