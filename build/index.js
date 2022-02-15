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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var assertIn_1 = require("./util/assertIn");
var erc20_1 = require("./ethweb/erc20");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var log_1 = require("./util/log");
var app = (0, express_1.default)();
var urlencodedParser = body_parser_1.default.urlencoded({ extended: true });
var CURRENTDATA = (0, assertIn_1.loadMergeIn)();
/**
 *
 * 查询某个钱包地址的转账记录
 * contractaddress：USDT
    address：查询地址
    page：页数 可空
    sort：desc|asc 可空
    startblock：开始区块码 可空
    endblock：结束区块码 可空
    type:'in'|'out'|''    可空
 */
app.post('/history', urlencodedParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, contractaddress, info, dafaultData, fiexdData, userRule, results;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, contractaddress = _a.contractaddress, info = __rest(_a, ["contractaddress"]);
                dafaultData = {
                    contractaddress: config_1.Erc20ContractAddress[(contractaddress || 'USDT')],
                    address: '',
                    page: 1,
                    offset: 10,
                    startblock: 0,
                    endblock: 27025780,
                    sort: 'desc',
                };
                fiexdData = {
                    module: 'account',
                    action: 'tokentx',
                    apikey: (0, erc20_1.getAvailableApiKey)(CURRENTDATA)
                };
                userRule = __assign(__assign(__assign({}, dafaultData), info), fiexdData);
                return [4 /*yield*/, (0, erc20_1.queryHistory)(CURRENTDATA, userRule, info.type)];
            case 1:
                results = _b.sent();
                res.json(results);
                return [2 /*return*/];
        }
    });
}); });
app.post('/hashByStatus', urlencodedParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hash = req.body.hash;
                return [4 /*yield*/, (0, erc20_1.hashByInfo)(CURRENTDATA, hash)];
            case 1:
                results = _a.sent();
                res.json(results);
                return [2 /*return*/];
        }
    });
}); });
app.listen(CURRENTDATA.port, function () {
    log_1.LOGGER.info("\u63A5\u53E3\u5DF2\u5F00\u542F\u6210\u529F\uFF0C\u8BF7\u8BBF\u95EE http://127.0.0.1:".concat(CURRENTDATA.port, "/ \u52A0\u63A5\u53E3\u5730\u5740\uFF0C\u5F00\u59CB\u4F60\u7684\u8868\u6F14......"));
});
