var db = require('./connection');
var PaymentSchemaModel = require('../schema/paymentschema')

function userModel()
{

  this.payment=(price,uid)=>{
    return new Promise((resolve,reject)=>{
        
        db.collection("payment").find().sort({_id:-1}).toArray((err,result)=>{
            if(err)
             reject(err)
            else
             var _id = result.length==0 ? 1 : result[0]._id+1;
            
            var pDetails={"_id":_id,"uid":uid,"amt":price,"info":Date()} 
            
            // a document instance
            var obj = new PaymentSchemaModel(pDetails);
 
            // save model to database
            obj.save((err,result)=>{
                err ? reject(err) : resolve(result);            
            });             
        })
    }) 
 }    

 this.cpUser=(pDetails)=>{
     return new Promise((resolve,reject)=>{
        db.collection("register").find({"username":pDetails.username,"password":pDetails.opass}).toArray((err,result)=>{
            if(err)
                reject(err)
            else
            {
                if(result.length==0)
                    resolve({"msg":"Invalid old password"})
                else
                {
                    if(pDetails.npass==pDetails.cnpass)
                    {
                        db.collection("register").updateOne({"username":pDetails.username},{$set:{"password":pDetails.cnpass}},(err,result)=>{
                            err ? reject(err) : resolve({'msg':'Password changed successfully...'});        
                        })    
                    }   
                    else
                        resolve({"msg":"New & confirm new password mismatch"})     
                }            
            }                
        })      
     })
 }

}

module.exports = new userModel()
