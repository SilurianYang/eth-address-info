import fs from 'fs'
import {BASECONFIG,baseUserConfig,fileName, userConfigRule} from '../config/config';
import {LOGGER,shutdown} from './log'

export function getUserConfig():undefined|userConfigRule{
    const userConfigStr  =fs.readFileSync(BASECONFIG.userConfigPath).toString();
    try {
        if(userConfigStr.trim()===''){
            return baseUserConfig;
        }
        const userJson = JSON.parse(`{${userConfigStr}}`) as userConfigRule;
        return userJson;
    } catch (error) {
        LOGGER.error(`读取用户自定义文件失败，错误信息如下↓↓↓↓↓`);
        LOGGER.error(error);
        shutdown(function(){
            process.exit(0);
        });
    }
}

export function createConfigIn():void{
    const exists= fs.existsSync(BASECONFIG.userConfigPath);
    if(!exists){
       fs.writeFileSync(fileName,'');
    }
}

export const loadMergeIn= function ():userConfigRule{
    LOGGER.info(`正在加载默认配置，请稍后.....`);
    createConfigIn();
    const USECONFIG=getUserConfig();
    const  CURRENTDATA=Object.assign(baseUserConfig,USECONFIG);
    LOGGER.info(`默认配置加载成功，开始表演......`);
    return CURRENTDATA
}