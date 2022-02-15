import {resolve} from 'path'


export const rootPath:string=process.cwd();
export const fileName:string='USERCONFIG.in';


export type baseConfigRule={
    userConfigPath:string;
}

export const BASECONFIG:baseConfigRule= {
    userConfigPath:resolve(rootPath,`./${fileName}`),
}

export type typeErc20Rule='USDT';

export type Erc20Rule={
    USDT:'0xdac17f958d2ee523a2206206994597c13d831ec7'
}
export type Erc20RuleKey='USDT';

export  const Erc20ContractAddress:Erc20Rule={
    USDT:'0xdac17f958d2ee523a2206206994597c13d831ec7'
}

export type historyApiDefaultRule={
    module:'account';
    action:'tokentx';
    contractaddress:string;
    address:string;
    page:number;
    offset:number;
    startblock:number;
    endblock:number;
    sort:'desc'|'asc';
    apikey:string;
}


export type userConfigRule={
    port:number;
    apiPath:string;
    apiKey:Array<{
        apiKey:string;
        totalCount:number;
        usedCount:number;
        useDate:string;
    }>
}

export const baseUserConfig:userConfigRule={
    port:8888,
    apiPath:'https://api.etherscan.io/api',
    apiKey:[{
        apiKey:'XTEXXWMAFYDFJ7G6XUFDRJR91E44RKKIP1',
        totalCount:100000,
        usedCount:0,
        useDate:'',
    }]
}



