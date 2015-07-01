var nodemailer = require("nodemailer");
var pwd = "Jwmd1817*";
var $ = require("jquery");
var transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "lumichael94@gmail.com",
        pass: pwd
    }
});


module.exports = function(app){
    app.get('/', require('./views/index').init);
    app.get('/dead', function(req,res){
        $.get("http://localhost:3000/deadman");
        res.render("hello");
    });
    app.get('/send', function(req,res){
        var mailOptions={
            to : req.query.to,
            subject : req.query.subject,
            text : req.query.text
        };
        console.log(mailOptions);
        transport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }
            else{
                console.log("Message sent: " + response.message);
            }
        });
    });
}
