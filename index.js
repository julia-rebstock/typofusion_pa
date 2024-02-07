const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importieren Sie das CORS-Middleware


const app = express();
const port = 5502;  

const config = {
  origin: ["*"],
  default: "*"
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// app.all('*', function(req, res, next) {
//   const origin = config.origin.includes(req.header('origin').toLowerCase()) ? req.headers.origin : config.default;
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors(config));  // Aktivieren Sie CORS für alle Routen


app.get('/', (req, res) => {
  //res.send('Hello World!');
  console.log('works');
});

// app.get('/test', (req, res) => {
//   console.log('GET request received at /test');
//   // res.send('Test route response');
// });

// Middleware für das Parsen von JSON-Anfragen
app.use(bodyParser.json());

// Endpunkt für das Senden von E-Mails
app.post('/send-email', (req, res) => {
  const { content } = req.body;

  // E-Mail-Konfiguration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // auth: {
    //   user: 'your@gmail.com', // Hier Ihre Gmail-Adresse eintragen
    //   pass: 'your-password'   // Hier Ihr Gmail-Passwort eintragen oder ein App-Passwort erstellen
    // }
  });

  const mailOptions = {
    from: 'julia.rebstock@t-online.de',   // Hier Ihre Gmail-Adresse eintragen
    to: 'rebstock.julia@gmx.de',        // Empfänger-E-Mail-Adresse
    subject: 'Test Email',
    text: content
  };

  // Senden der E-Mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
