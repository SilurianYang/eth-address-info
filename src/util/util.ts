export const timeOut=function(
    time:number|undefined=10000
):Promise<void>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
}