var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel')

/* Middleware function to apply security at user router */
/*router.use((req,res,next)=>{
  if(req.session.sunm==undefined || req.session.srole!="user")
  {
    res.redirect('/login')
  }
  next()           
 })*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userhome',{"sunm":req.session.sunm})
});

router.get('/funds', function(req, res, next) {
  paypalURL="https://www.sandbox.paypal.com/cgi-bin/webscr"
  paypalID="sb-osmp313509313@business.example.com"
  //sb-40q43s16099650@personal.example.com
  price=100
  res.render('funds',{"price":price,"paypalURL":paypalURL,"paypalID":paypalID,"sunm":req.session.sunm})
});

router.get('/payment', function(req, res, next) {
  var price=req.query.price
  var uid = req.query.uid
  userModel.payment(price,uid).then((result)=>{
    res.redirect('/users/success')  
  }).catch((err)=>{
    console.log(err)  
  })
});

router.get('/success', function(req, res, next) {
  res.render('success',{"sunm":req.session.sunm})    
});

router.get('/cancel', function(req, res, next) {
  res.render('cancel',{"sunm":req.session.sunm})    
});

router.get('/cpuser', function(req, res, next) {
  res.render('cpuser',{"sunm":req.session.sunm,"output":""})    
});

router.post('/cpuser', function(req, res, next) {
  userModel.cpUser(req.body,).then((result)=>{
    res.render('cpuser',{"sunm":req.session.sunm,"output":result.msg})  
  }).catch((err)=>{
    console.log(err)  
  })
});

module.exports = router;
