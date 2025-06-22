require('dotenv').config();

const express = require('express'); // Criando servidor HTTP
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT ||  3000; // // Porta onde o servidor vai rodar localmente.

app.use(cors({
  origin: '*'  // aceita qualquer origem, para facilitar testes
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
  user: process.env.EMAIL_USER || '8fd3f0001@smtp-brevo.com',
  pass: process.env.EMAIL_PASS || ''
  },
  logger: true,
  debug: true
});

app.post('/enviar', async (req, res) => {
  try {
    const dados = req.body;
    console.log('Dados recebidos:', dados);

    // Validação simples para garantir campos
    if (!dados.nome || !dados.email || !dados.mensagem) {
      return res.status(400).json({ mensagem: 'Campos nome, email e mensagem são obrigatórios.' });
    }

    const mailOptions = {
      from: '8fd3f0001@smtp-brevo.com',
      to: 'rosianerosa5@gmail.com',
      subject: `Mensagem de ${dados.nome}`,
      text: `Nome: ${dados.nome}\nEmail: ${dados.email}\nMensagem: ${dados.mensagem}`
    };

    console.log('Enviando email...');

    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado com sucesso:', info.response);
    res.json({ mensagem: 'Mensagem enviada com sucesso!' });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    if (error.response) {
      console.error('Resposta do servidor SMTP:', error.response);
    }
    console.log('Entrou no catch do /enviar');
    res.status(500).json({ mensagem: 'Erro ao enviar email.', erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
