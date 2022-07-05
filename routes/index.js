var express = require('express');
var router = express.Router();
var indexModel = require('../models/indexModel');
var sendMail = require('./emailAPI')

/* middleware to check user details in cookie */
var cunm="";
var cpass="";
router.use(('/login',(req,res,next)=>{
  if(req.cookies.cunm!=undefined)
  {
    cunm=req.cookies.cunm
    cpass=req.cookies.cpass
  }  
  next()
}))

/* GET home page. */
router.get('/', (req, res, next)=>{
  indexModel.fetchDetails("category").then((result)=>{
    res.render('index',{"cDetails":result});
  }).catch((err)=>{
    console.log(err)
  })
});

router.get('/about', (req, res, next)=>{
  var a,b,c
  a=100
  b=200
  c=a+b

  var mks=[45,67,87,65,40]

  var empDetails={'eno':1001,'enm':'jarvis','esal':10000.67}

  res.render('about',{'a':a,'b':b,'c':c,'mks':mks,'empDetails':empDetails});
});

router.get('/contact', (req, res, next)=>{
  var empDetails=[{'eno':1001,'enm':'jarvis','esal':10000.67},{'eno':1002,'enm':'jany','esal':22000.61},{'eno':1003,'enm':'john','esal':11000}]
  res.render('contact',{'empDetails':empDetails});
});

router.get('/service', (req, res, next)=>{
  res.render('service');
});

router.get('/register', (req, res, next)=>{
  res.render('register',{"output":""});
});

router.post('/register', (req, res, next)=>{
  indexModel.registerUser(req.body).then((result)=>{
    sendMail(req.body.username,req.body.password);    
    res.render('register',{"output":"User register successfully...."});  
  }).catch((err)=>{
    res.render('register',{"output":err});
  })
});

router.get('/verifyUser', (req, res, next)=>{
  var username=req.query.uid
  indexModel.verifyUser(username).then((result)=>{
    res.redirect('/login')  
  }).catch((err)=>{
    console.log(err)  
  })
});

router.get('/login', (req, res, next)=>{
  if(req.session.sunm!=undefined)
  {
    req.session.sunm=undefined
    req.session.srole=undefined
  }
  res.render('login',{"output":"","cunm":cunm,"cpass":cpass});
});

router.post('/login', (req, res, next)=>{
  indexModel.userLogin(req.body).then((result)=>{
    //to set user details in session
    if(result.length!=0)
    {
      req.session.sunm=result[0].username
      req.session.srole=result[0].role 

      if(req.body.chk!=undefined)
      {
        res.cookie('cunm',result[0].username, { maxAge: 900000});
        res.cookie('cpass',result[0].password, { maxAge: 900000});
      }
      
    }

    result.length==0 ? res.render('login',{"output":"Invalid user or verify your account","cunm":cunm,"cpass":cpass}) 
                     :(result[0].role=="admin"?res.redirect('/admin'):res.redirect('/users'));  
  }).catch((err)=>{
    console.log(err)  
  })    
});

module.exports = router;
