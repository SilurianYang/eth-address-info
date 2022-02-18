import {  Erc20ContractAddress, Erc20RuleKey, historyApiDefaultRule, userConfigRule } from './config/config';
import {  loadMergeIn } from './util/assertIn';
import {  getAvailableApiKey, hashByInfo,  queryHistory } from './ethweb/erc20';
import express from 'express';
import bodyParser from 'body-parser';
import { LOGGER } from './util/log';

const app:express.Application = express();
let urlencodedParser = bodyParser.urlencoded({ extended: true })

const CURRENTDATA:userConfigRule=loadMergeIn();

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

app.post('/history',urlencodedParser,async(req,res)=>{
    const {contractaddress,...info}=req.body;
    const dafaultData={
        contractaddress:Erc20ContractAddress[(contractaddress || 'USDT') as Erc20RuleKey],
        address:'',
        page:1,
        offset:10,
        startblock:0,
        endblock:27025780,
        sort:'desc',
    }
    const fiexdData={
        module:'account',
        action:'tokentx',
        apikey:getAvailableApiKey(CURRENTDATA)
    }
    const userRule={...dafaultData,...info,...fiexdData} as historyApiDefaultRule;

    const results=await queryHistory(CURRENTDATA,userRule,info.type);

    res.json(results)
})


app.post('/hashByStatus',urlencodedParser,async(req,res)=>{
    const {hash}=req.body;
    const results=await hashByInfo(CURRENTDATA,hash);
    res.json(results)
})


app.listen(CURRENTDATA.port,()=>{
    LOGGER.info(`接口已开启成功，请访问 http://127.0.0.1:${CURRENTDATA.port}/ 加接口地址，开始你的表演......`);
})