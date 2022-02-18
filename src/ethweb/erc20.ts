import { sendError, sendSuccess } from "../util/helper";
import { LOGGER } from "../util/log";
import superagent from 'superagent';
import { historyApiDefaultRule, userConfigRule } from "../config/config";
// require('superagent-proxy')(superagent)

export const hashIdByHistory=function(
    tronWeb:any,
    hashId:string
){
    return new Promise(async resolve=>{
        try {
            const res= await tronWeb.trx.getTransactionInfo(hashId);
            if(Object.keys(res).length>0){
                return resolve(sendSuccess({
                    block:res
                }))
            }
            return resolve(sendSuccess({
                block:{}
            }));
        } catch (error) {
            LOGGER.error(error)
            LOGGER.error(`查询 hash ：${hashId} 不存在，请填写正确的hash地址`);
            return resolve(sendError({
                msg:`${hashId} hash 地址查询失败（#2001）`
            }));
        }
    })
}

export const getAvailableApiKey=function(
    CURRENTDATA:userConfigRule
):string{
    const list=CURRENTDATA.apiKey;
    for(let i=0;i<list.length;i++){
        const {usedCount,totalCount,useDate,apiKey}=list[i];
        if(usedCount<totalCount){
            return apiKey
        }
    }
    LOGGER.error(`API 秘钥今日已经使用上限，请联系开发者（#10001）`);
    return ''
}

export const queryHistory=function(
    CURRENTDATA:userConfigRule,
    userRule:historyApiDefaultRule,
    type:'in'|'out'|''|undefined=''
):Promise<{
    status:200|201,
    data:object
}>{
    return new Promise(async resolve=>{
        try {
            const res=  await superagent.get(CURRENTDATA.apiPath)
            .query({
                ...userRule
            })

            const results=res.body;

            if(results.message!=='OK'){
                LOGGER.error(results)
                return resolve(sendError({
                    ...results
                }));
            }
            let diffList:Array<any>=[];
            if(type!==''){
                for(let i=0;i<results.result.length;i++){
                    const item =results.result[i];
                    item.value=item.value/10**6;
                    if(type==='in'&&item.to===userRule.address){
                        diffList.push(item)
                    }else if(type==='out'&&item.from===userRule.address){
                        diffList.push(item)
                    }
                }
            }else{
                diffList=results.result
            }
            results.result=diffList;
            return resolve(sendSuccess({
                ...results
            }));
        } catch (error) {
            LOGGER.error(error)
            LOGGER.error(`查询 地址 ：${userRule.address} 失败，请稍后重试`);
            return resolve(sendError({
                msg:`${userRule.address} 地址查询失败（#2001）`
            }));
        }
    })
}

export const hashByInfo=function(
    CURRENTDATA:userConfigRule,
    hash:string
):Promise<{
    status:200|201,
    data:object
}>{
    return new Promise(async resolve=>{
        try {
            const res=  await superagent.get(CURRENTDATA.apiPath)
            .query({
                module:'transaction',
                action:'gettxreceiptstatus',
                txhash:hash
            })
            
            const results=res.body;

            return resolve(sendSuccess({
                ...results.result
            }));
        } catch (error) {
            LOGGER.error(error)
            LOGGER.error(`查询 hash ：${hash} 失败，请稍后重试`);
            return resolve(sendError({
                msg:`${hash} hash查询失败（#2001）`
            }));
        }
    })
}