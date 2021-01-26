export const NativePromise = fetch("https://api.github.com/users/websos")
    .then(resp=>{
        return resp.json();
    })
    .then(resp=> console.log(resp) )
    .catch(err=> console.error(err))
 

export default function(amount){
    return new Promise((resolve, reject)=>{
        if(amount < 500){
            reject("This is a value smaller than 500");
        }
        setTimeout(()=>{
            resolve(`Done for ${amount} ms`)
        }, amount)
    })
}