var db = require('./connection');
var RegisterSchemaModel = require('../schema/registerschema')

function indexModel()
{
 this.registerUser=(userDetails)=>{
    return new Promise((resolve,reject)=>{
        
        db.collection('register').find().sort({_id:-1}).toArray((err,result)=>{
            if(err)
             reject(err)
            else
             var _id = result.length==0 ? 1 : result[0]._id+1;
            
            userDetails={...userDetails,_id,role:'user',status:0,info:Date()} 
            
            // a document instance
            var obj = new RegisterSchemaModel(userDetails);
 
            // save model to database
            obj.save((err,result)=>{
                err ? reject(err) : resolve(result);            
            });             
        })
    }) 
 }    

 this.userLogin=(userDetails)=>{
  var newuserDetails={"username":userDetails.username,"password":userDetails.password,"status":1}   
  return new Promise((resolve,reject)=>{
    db.collection('register').find(newuserDetails).toArray((err,result)=>{
        err ? reject(err) : resolve(result);
    })        
  })    
 }

 this.fetchDetails=(collection_name)=>{
    return new Promise((resolve,reject)=>{
        db.collection(collection_name).find().toArray((err,result)=>{
            err ? reject(err) : resolve(result);
        })        
      })
 }

 this.verifyUser=(username)=>{
    return new Promise((resolve,reject)=>{
        db.collection("register").updateOne({"username":username},{$set:{"status":1}},(err,result)=>{
            err ? reject(err) : resolve(result);
        })        
      })
 }

}

module.exports = new indexModel()