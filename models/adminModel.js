var db = require('./connection');
var CategorySchemaModel = require('../schema/categoryschema')

function adminModel()
{
 this.addCategory=(catnm,caticonnm)=>{
    return new Promise((resolve,reject)=>{
        
        db.collection("category").find().sort({_id:-1}).toArray((err,result)=>{
            if(err)
             reject(err)
            else
             var _id = result.length==0 ? 1 : result[0]._id+1;
            
            var cDetails={"_id":_id,"catnm":catnm,"caticonnm":caticonnm} 
            
            // a document instance
            var obj = new CategorySchemaModel(cDetails);
 
            // save model to database
            obj.save((err,result)=>{
                err ? reject(err) : resolve(result);            
            });             
        })
    }) 
 }    

 this.fetchUsers=()=>{
  return new Promise((resolve,reject)=>{
    db.collection('register').find({role:'user'}).toArray((err,result)=>{
        err ? reject(err) : resolve(result);
    })        
  })    
 }

 this.manageUserStatus=(urlData)=>{
    return new Promise((resolve,reject)=>{
      if(urlData.s=="block")
      {
       db.collection('register').updateOne({_id:parseInt(urlData._id)},{$set:{status:0}},(err,result)=>{
          err ? reject(err) : resolve(result);
       })
      } 
      else if(urlData.s=="verify")         
      {
        db.collection('register').updateOne({_id:parseInt(urlData._id)},{$set:{status:1}},(err,result)=>{
          err ? reject(err) : resolve(result);
        })
      }
      else
      {
        db.collection('register').remove({_id:parseInt(urlData._id)},(err,result)=>{
          err ? reject(err) : resolve(result);
        })
      }
    })    
  }

}

module.exports = new adminModel()