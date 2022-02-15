export const sendSuccess=function (
    data:object
):{
    status:200,
    data:object
}{
    return {
        status:200,
        data:data
    }
}

export const sendError=function(
    error:object
):{
    status:201,
    data:object
}{
    return {
        status:201,
        data:error
    }
}