const AWS = require('aws-sdk');

const uploadToS3= (data,filename)=>{
    const BUCKET_NAME=process.env.BUCKET_NAME;
    const IAM_USER_KEY=process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        
    })

        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'

        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,S3response)=>{
                if(err){
                    console.log('Something went wrong',err)
                    reject(err);
    
                }else{
                    console.log('success',S3response);  
                    resolve(S3response.Location);
                }
            })
            
        })
}

module.exports={
    uploadToS3
}