function sendMail(username,password)
{
 var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'batchcontent2020@gmail.com',
    pass: '123@@123'
  }
});

var mailOptions = {
  from: 'batchcontent2020@gmail.com',
  to: username,
  subject: 'Verification Mail PostKrde.com',
  html: "<h1>Welcome to PostKrde.com</h1><p>You have successfully registered on our application , your login credentials are attached below</p><h3>Username = "+username+"</h3><h3>Password = "+password+"</h3><h2>Click on the link below to verify your account</h2>http://localhost:3000/verifyUser?uid="+username
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = sendMail
