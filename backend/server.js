const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luanamessiasestudante@gmail.com',      // coloque seu e-mail aqui
    pass: 'bsgwkmteohlaiyvk'          // senha de app do Gmail
  }
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const mailOptions = {
    from: email,
    to: 'luanamessiasestudante@gmail.com',  // e-mail que vai receber a mensagem
    subject: `Nova mensagem de ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao enviar e-mail' });
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.json({ message: 'Mensagem enviada com sucesso!' });
    }
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
