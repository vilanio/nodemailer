var express = require('express');
var app = express();

const nodemailer = require('nodemailer')


app.use(express.static(__dirname));

app.get('*', function(req, res){
  res.redirect('/');
});

var port = 3000;
app.listen(port);

app.post('/send', (req, res) => {

  const user = req.body.user
  const pass = req.body.pass
  const host = req.body.host
  const port = req.body.port

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: false,
      auth: {
        user: user,
        pass: pass
		  },
      tls: {rejectUnauthorized: false,}
      })

    var mailOptions = {

        from: user,
        to: req.body.email,
        replyTo: req.body.reply,
        subject: req.body.subject,
        html: req.body.html,
    }

    transporter.sendMail(mailOptions, function(error, response){
		if(error){
			console.log("Message Not Send", error);
            res.status(400).send(error)
            transporter.close() 
		}else{
			console.log("Message sent!",response);
            res.status(200).send("1")
            transporter.close() 
		}
	});
	//
}) 

















console.log('Umbler - Express server started on port %s', port);
