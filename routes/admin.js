var express = require('express');
var router = express.Router();
var path = require('path')
var adminModel = require('../models/adminModel')

/* Middleware function to apply security at admin router */
/*router.use((req,res,next)=>{
 if(req.session.sunm==undefined  || req.session.srole!="admin")
 {
   res.redirect('/login')
 }
 next()           
})*/


/* GET users listing. */
router.get('/',(req, res, next)=>{
 res.render('adminhome',{"sunm":req.session.sunm})
});

router.get('/manageusers',(req, res, next)=>{
 adminModel.fetchUsers().then((result)=>{
    res.render('manageusers',{"result":result,"sunm":req.session.sunm})
 }).catch((err)=>{
    console.log(err)
 })    
});

router.get('/manageuserstatus',(req, res, next)=>{
   adminModel.manageUserStatus(req.query).then((result)=>{
      res.redirect('/admin/manageusers')
   }).catch((err)=>{
      console.log(err)
   })    
});

router.get('/addcategory',(req, res, next)=>{
   res.render('addcategory',{"sunm":req.session.sunm,"output":""})
});

router.post('/addcategory',(req, res, next)=>{
   var caticonnm=Date.now()+"-"+req.files.caticon.name
   adminModel.addCategory(req.body.catnm,caticonnm).then((result=>{
      var uploadpath=path.join(__dirname,"../public/uploads/categoryicons",caticonnm)
      req.files.caticon.mv(uploadpath)
      res.render('addcategory',{"sunm":req.session.sunm,"output":"Category added successfully...."})      
   })).catch((err)=>{
      res.render('addcategory',{"sunm":req.session.sunm,"output":err})   
   })
});

module.exports = router;
