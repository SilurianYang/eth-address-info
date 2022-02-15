import superagent from 'superagent';
import { parentPort,workerData } from 'worker_threads';


export const workerTimeOut=function(
    time:number|undefined=10000
):Promise<void>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
};

(({path,interTime})=>{

    async function setInterCallBack(
        path:string,
        interTime:number
    ):Promise<void>{
        try {
            await superagent.get(path);
            // @ts-ignore
            parentPort.postMessage({
                msg1:`访问远程回调接口成功，${interTime/1000} 秒后继续支持回调`,
                type:'info'
            })
        } catch (error) {
            // @ts-ignore
            parentPort.postMessage({
                msg1:'访问远程回调接口失败，失败类型如下：',
                msg2:error,
                type:'error'
            })
        }
        await workerTimeOut(interTime);
        return setInterCallBack(path,interTime);
    }

    setInterCallBack(path,interTime);

})(workerData)
