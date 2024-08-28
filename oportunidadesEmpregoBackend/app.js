require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors=require('cors')
const app = express();
const PORT = process.env.PORT ;
const CHAVE_SEGURA= process.env.CHAVE_SEGURA
const crypto = require('crypto');
const session = require('express-session');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const mpesa = require('mpesa-node-api');
const multer = require('multer');
const path = require('path');

// Gere uma chave aleatória segura



// Middleware para analisar solicitações com o corpo JSON
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());


// Conexão com o banco de dados MongoDB

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@oportunidadesempregoapi.yqusxux.mongodb.net/?retryWrites=true&w=majority&appName=oportunidadesempregoapi`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mpesa.initializeApi({
  baseUrl: "api.sandbox.vm.co.mz",
  apiKey: "pmptkzyqgg88nny0bsxirn621vzma2z2",
  publicKey: "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==",
  origin: "developer.mpesa.vm.co.mz",
  serviceProviderCode: "171717"
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Token não fornecido

  jwt.verify(token, process.env.CHAVE_SEGURA, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido
    req.user = user;
    next(); // Chama o próximo middleware
  });
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db=client.db("oportunidadesEmprego");
    const jobsCollections=db.collection("oportunidades");

    // Create separate databases for recruiters and applicants
    const recruiterDb = client.db("recrutadores"); // Database for recruiters
    const applicantDb = client.db("candidatos");   // Database for applicants
    const applicationsDb = client.db("candidaturas");
    const preRecruiterCollection = db.collection('preRecruiter'); 
    const preApplicantCollection = db.collection('pre_applicants');

    const recruiterCollection = recruiterDb.collection("usuarios"); // Collection for recruiters
    const applicantCollection = applicantDb.collection("usuarios"); // Collection for applicants
    const applicationsCollection=applicationsDb.collection("candidaturas");
    // Endpoint for recruiter account creation
   
    app.get("/candidatos", async (req, res) => {
      try {
          const applicants = await applicantCollection.find().toArray();
          res.json(applicants);
      } catch (err) {
          console.error("Error fetching applicants:", err);
          res.status(500).json({ message: "Internal Server Error" });
      }
  });
  
  app.post('/processar-pagamento', (req, res) => {
    const { amount, msisdn, transactionRef,thirdPartyRef } = req.body;

    mpesa.initiate_c2b(amount, msisdn, transactionRef,thirdPartyRef)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.error('Error initiating C2B transaction:', error);
            res.status(500).json({ error: 'Failed to initiate C2B transaction' });
        });
});


const sendVerificationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
      
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  


  const verificationLink = `http://localhost:5173/verificar-email/${token}`;

  const mailOptions = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: email,
    subject: "Confirmação de Criação de Conta",
    html: `<p>Obrigado por criar uma conta. Por favor, verifique seu e-mail clicando no link abaixo:</p>
           <a href="${verificationLink}">Verificar Email</a>`
  };

  return transporter.sendMail(mailOptions);
};
// Criar conta de recrutador
app.post("/criar-conta/recrutador", async (req, res) => {
  try {
    const { recruterName, recruterEmail, recruterPassword, companyLogotipo } = req.body;

    // Verificar se o email já está em uso
    const existingRecruiter = await recruiterCollection.findOne({ recruterEmail });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(recruterPassword, 10);

    // Gerar token de verificação
    const verificationToken = generateVerificationToken();

    // Armazenar dados temporários na coleção de pré-registro
    await preRecruiterCollection.insertOne({
      recruterName,
      recruterEmail,
      recruterPassword: hashedPassword,
      companyLogotipo,
      verificationToken,
      createdAt: new Date()
    });

    // Enviar e-mail de verificação
    await sendVerificationEmail(recruterEmail, verificationToken);

    return res.status(201).json({ messageSuccess: "Verifique seu e-mail para concluir o cadastro" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});
const generateVerificationToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  return `rec-${token}`; // Adiciona o prefixo 'rec-'
};
// Verificar e-mail do recrutador
app.get("/verificar-email/recrutador/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Verificar o token na coleção de pré-registro
    const preRecruiter = await preRecruiterCollection.findOne({ verificationToken: token });
    if (!preRecruiter) {
      return res.status(400).json({ message: "Token de verificação inválido" });
    }

    // Inserir o recrutador na coleção principal
    await recruiterCollection.insertOne({
      recruterName: preRecruiter.recruterName,
      recruterEmail: preRecruiter.recruterEmail,
      recruterPassword: preRecruiter.recruterPassword,
      companyLogotipo: preRecruiter.companyLogotipo
    });

    // Remover o registro da coleção de pré-registro
    await preRecruiterCollection.deleteOne({ verificationToken: token });

    return res.status(200).json({ messageSuccess: "Conta verificada e criada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao verificar o email" });
  }
});

// Criar conta de candidato
app.post("/criar-conta/candidato", async (req, res) => {
  try {
    const { 
      candidatoFirstName, candidatoLastName, candidatoEmail, candidatoPassword, candidatoGenero, candidatoSobreMim,
      candidatoProfissao, candidatoNacionalidade, candidatoProvincia, candidatoDataNascimento, candidatoNumero,
      candidatoAnosExperiencia, candidatoFormacaoAcademica, candidatoCV, candidatoFotoPerfil
    } = req.body;

    // Verificar se o email já está em uso
    const existingApplicant = await applicantCollection.findOne({ candidatoEmail });
    if (existingApplicant) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(candidatoPassword, 10);

    // Gerar token de verificação
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Armazenar dados temporários na coleção de pré-registro
    await preApplicantCollection.insertOne({
      candidatoFirstName, candidatoLastName, candidatoEmail, candidatoPassword: hashedPassword,
      candidatoGenero, candidatoSobreMim, candidatoProfissao, candidatoNacionalidade, candidatoProvincia,
      candidatoDataNascimento, candidatoNumero, candidatoAnosExperiencia, candidatoFormacaoAcademica,
      candidatoCV, candidatoFotoPerfil, verificationToken, createdAt: new Date()
    });

    // Enviar e-mail de verificação
    await sendVerificationEmail(candidatoEmail, verificationToken);

    return res.status(201).json({ messageSuccess: "Verifique seu e-mail para concluir o cadastro" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Verificar e-mail do candidato
app.get("/verificar-email/candidato/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Verificar o token na coleção de pré-registro
    const preApplicant = await preApplicantCollection.findOne({ verificationToken: token });
    if (!preApplicant) {
      return res.status(400).json({ message: "Token de verificação inválido" });
    }

    // Inserir o candidato na coleção principal
    await applicantCollection.insertOne({
      candidatoFirstName: preApplicant.candidatoFirstName,
      candidatoLastName: preApplicant.candidatoLastName,
      candidatoEmail: preApplicant.candidatoEmail,
      candidatoPassword: preApplicant.candidatoPassword,
      candidatoGenero: preApplicant.candidatoGenero,
      candidatoSobreMim: preApplicant.candidatoSobreMim,
      candidatoProfissao: preApplicant.candidatoProfissao,
      candidatoNacionalidade: preApplicant.candidatoNacionalidade,
      candidatoProvincia: preApplicant.candidatoProvincia,
      candidatoDataNascimento: preApplicant.candidatoDataNascimento,
      candidatoNumero: preApplicant.candidatoNumero,
      candidatoAnosExperiencia: preApplicant.candidatoAnosExperiencia,
      candidatoFormacaoAcademica: preApplicant.candidatoFormacaoAcademica,
      candidatoCV: preApplicant.candidatoCV,
      candidatoFotoPerfil: preApplicant.candidatoFotoPerfil
    });

    // Remover o registro da coleção de pré-registro
    await preApplicantCollection.deleteOne({ verificationToken: token });

    return res.status(200).json({ messageSuccess: "Conta verificada e criada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao verificar o email" });
  }
});


   
 

app.post("/loginCandidato", async (req, res) => {
  const {  candidatoEmail, candidatoPassword } = req.body;
 

  try {
      // 2. Verificar se o usuário existe no banco de dados
      const candidatoExistente = await applicantCollection.findOne({candidatoEmail});
   
      if (!candidatoExistente) {
          return res.status(404).json({ erro: "Email ou senha incorrectos" });
      }

      // 3. Comparar a senha fornecida com o hash de senha armazenado
      const senhaCorreta = await bcrypt.compare(candidatoPassword, candidatoExistente.candidatoPassword);

      if (!senhaCorreta) {
          return res.status(401).json({ erro: "Email ou senha incorrectos" });
      }
      const secret = process.env.CHAVE_SEGURA;
        
      const token = jwt.sign({ userId: candidatoExistente._id },  secret , { expiresIn: '1000' })
   
      
    res.status(200).json({ mensagem:"Login bem sucecido", usuário: candidatoExistente,data:{token}});      
      
  } catch (erro) {
      console.error("Erro durante o login:", erro);
      res.status(500).json({ erro: "Erro interno do servidor" });
  }
});


    app.get("/recrutadores",async(req,res)=>{
      const recruiters=await recruiterCollection.find().toArray();
      res.send(recruiters);
  })

    // Endpoint for applicant account creation
    

    app.post("/login", async (req, res) => {
      const {  recruterEmail, recruterPassword } = req.body;
    
      try {
          // 2. Verificar se o usuário existe no banco de dados
          const recrutadorExistente = await recruiterCollection.findOne({recruterEmail});
       
          if (!recrutadorExistente) {
              return res.status(404).json({ erro: "Email ou senha incorrectos" });
          }
    
          // 3. Comparar a senha fornecida com o hash de senha armazenado
          const senhaCorreta = await bcrypt.compare(recruterPassword, recrutadorExistente.recruterPassword);
    
          if (!senhaCorreta) {
              return res.status(401).json({ erro: "Email ou senha incorrectos" });
          }

          
         
            const secret = process.env.CHAVE_SEGURA;
            
            const token = jwt.sign({ userId: recrutadorExistente._id },  secret , { expiresIn: '1000' });
         
            
          res.status(200).json({ mensagem:"Login bem sucecido" ,usuário: recrutadorExistente,data:{token}});
          
      } catch (erro) {
          console.error("Erro durante o login:", erro);
          res.status(500).json({ erro: "Erro interno do servidor" });
      }
    });
    app.post('/forgot-password', async (req, res) => {
  const { recruterEmail } = req.body;
  
  try {
    
    const user = await recruiterCollection.findOne({recruterEmail});
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const secret = process.env.CHAVE_SEGURA;
    const token = jwt.sign({id: user._id}, secret, {expiresIn: "1h"}) 
    
    const transporter = nodemailer.createTransport({
      
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    
   
    const mailOptions = {
      to: user.recruterEmail,
      from: process.env.EMAIL_ADDRESS,
      subject: 'Redefinição de Senha',
      text: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n` +
            `Clique no link a seguir ou cole no seu navegador para completar o processo:\n\n` +
            `http://${req.headers.host}/reset-password/${user._id}/${token}\n\n` +
            `Se você não solicitou isso, por favor ignore este e-mail e sua senha permanecerá inalterada.\n`,
    };
   

    transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar solicitação de redefinição de senha'});
  }
});

app.post('/forgot-password-candidato', async (req, res) => {
  const { candidatoEmail } = req.body;
  
  try {
    
    const user = await applicantCollection.findOne({candidatoEmail});
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const secret = process.env.CHAVE_SEGURA;
    const token = jwt.sign({id: user._id}, secret, {expiresIn: "1h"}) 
    
    const transporter = nodemailer.createTransport({
      
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      to: user.candidatoEmail,
      from: process.env.EMAIL_ADDRESS,
      subject: 'Redefinição de Senha',
      text: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n` +
            `Clique no link a seguir ou cole no seu navegador para completar o processo:\n\n` +
            `http://${req.headers.host}/reset-password-candidato/${user._id}/${token}\n\n` +
            `Se você não solicitou isso, por favor ignore este e-mail e sua senha permanecerá inalterada.\n`,
    };
   

    transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar solicitação de redefinição de senha'});
  }
});

app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { recruterPassword } = req.body;
  const secret = process.env.CHAVE_SEGURA;

  try {
    // Verifique o token
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'Token inválido ou expirado' });
      }

      // Hash a nova senha
      const hash = await bcrypt.hash(recruterPassword, 10);
      
      // Atualize a senha do usuário no banco de dados
      const user = await recruiterCollection.findOne({ _id: new ObjectId(id) });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Atualize a senha no banco de dados
      await recruiterCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { recruterPassword: hash } }
      );

      res.status(200).json({ message: 'Senha redefinida com sucesso' });
    });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    res.status(500).json({ error: 'Erro ao redefinir a senha' });
  }
});

app.post('/reset-password-candidato/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { candidatoPassword } = req.body;
  const secret = process.env.CHAVE_SEGURA;

  try {
    // Verifique o token
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'Token inválido ou expirado' });
      }

      // Hash a nova senha
      const hash = await bcrypt.hash(candidatoPassword, 10);
      
      // Atualize a senha do usuário no banco de dados
      const user = await applicantCollection.findOne({ _id: new ObjectId(id) });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Atualize a senha no banco de dados
      await applicantCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { candidatoPassword: hash } }
      );


      res.status(200).json({ message: 'Senha redefinida com sucesso' });
    });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    res.status(500).json({ error: 'Erro ao redefinir a senha' });
  }
});


    app.post("/publicar-vaga",async(req,res)=>{
        const body = req.body;
        body.createAt=new Date();
        
        const result = await jobsCollections.insertOne(body);
        if(result.insertedId){
            return res.status(200).send(result);

        }
        else{
            return res.status(404).send({
                message:"Nao pode inserir, insira depois",
                status:false
            })
        }
    })
    app.post("/googleRecrutador",async (req,res) => {
      const {  recruterEmail } = req.body;
      try {
        const user = await recruiterCollection.findOne({ recruterEmail });
        if (user) {
          const secret = process.env.CHAVE_SEGURA;
            
          const token = jwt.sign({ userId: user._id },  secret , { expiresIn: '1h' });
       
          
         return res.status(200).json({ mensagem:"Login bem sucecido" ,usuário: user,data:{token}});
        } else {
          // Usuário não encontrado, retornar uma mensagem de erro
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
      } catch (error) {
        // Lidar com erros de forma adequada
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
    })
    app.post("/googleCandidato",async (req,res) => {
      const {  candidatoEmail } = req.body;
      try {
        const user = await applicantCollection.findOne({ candidatoEmail });
        if (user) {
          const secret = process.env.CHAVE_SEGURA;
            
          const token = jwt.sign({ userId: user._id },  secret , { expiresIn: '1h' });
       
          
         return res.status(200).json({ mensagem:"Login bem sucecido" ,usuário: user,data:{token}});
        } else {
          // Usuário não encontrado, retornar uma mensagem de erro
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
      } catch (error) {
        // Lidar com erros de forma adequada
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
    })

    app.get("/todasvagas",async(req,res)=>{
        const jobs=await jobsCollections.find().toArray();
        res.send(jobs);
    })
    app.get("/all-jobs/:id", async (req, res) => {
      
      const jobs = await jobsCollections.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(jobs);
    });

    app.get("/minhasVagas/:email",async(req,res)=>{
        const jobs = await jobsCollections.find({postedBy: req.params.email}).toArray() ;
        res.send(jobs);
    })
    app.delete("/vaga/:id",async(req,res)=>{
        const id = req.params.id;
        const filter ={_id:new ObjectId(id)}
        const result =await jobsCollections.deleteOne(filter);
        res.send(result);

    })
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
            ...jobData
        },
      };
      const options = { upsert: true };
      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    app.get ("/signout",async (req, res) => {
      res.clearCookie('access_token').status(200).json('Signout com successo!');
    });
    app.patch("/updateRecrutador/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const recruiterData = req.body;
    
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            ...recruiterData
          },
        };
        const options = { upsert: true };
    
        const result = await recruiterCollection.updateOne(filter, updateDoc, options);
    
        if (result.matchedCount === 0) {
          res.status(404).send({ message: "Recruiter not found" });
        } else {
          // Encontrar o recrutador atualizado
          const updatedRecruiter = await recruiterCollection.findOne(filter);
          
          if (!updatedRecruiter) {
            res.status(404).send({ message: "Recruiter not found after update" });
            return;
          }
    
          // Atualizar a coleção de vagas com os novos dados do recrutador
          const vagasFilter = { postedBy: updatedRecruiter.recruiterEmail };
          const vagasUpdateDoc = {
            $set: {
              companyName: updatedRecruiter.recruiterName, // exemplo de campo a ser atualizado
              companyLogo: updatedRecruiter.companyLogotipo,
            },
          };
    
          await jobsCollections.updateMany(vagasFilter, vagasUpdateDoc);
    
          const { recruiterPassword, ...rest } = updatedRecruiter; // Remove o campo de senha
          res.status(200).json(rest);
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });
    
    app.patch("/updateCandidato/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const applicantData = req.body;
    
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            ...applicantData
          },
        };
        const options = { upsert: true };
    
        const result = await applicantCollection.updateOne(filter, updateDoc, options);
    
        if (result.matchedCount === 0) {
          res.status(404).send({ message: "Candidato nao encontrado!" });
        } else {
          const updatedApplicant = await applicantCollection.findOne(filter);
          const { candidatoPassword, ...rest } = updatedApplicant; // Remove o campo de senha
          res.status(200).json(rest);
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });
    app.post("/candidatar-se", async (req, res) => {
      const { candidatoId, vagaId} = req.body;

      try {
        // Verificar se a candidatura já foi feita pelo mesmo candidato para a mesma vaga
        const candidaturaExistente = await applicationsCollection.findOne({
          candidatoId: new ObjectId(candidatoId),
          vagaId: new ObjectId(vagaId)
        });

        if (candidaturaExistente) {
          return res.status(400).json({ message: "Você já se candidatou a esta vaga" });
        }

        // Criar nova candidatura
        const novaCandidatura = await applicationsCollection.insertOne({
          candidatoId: new ObjectId(candidatoId),
          vagaId: new ObjectId(vagaId),
          dataCandidatura: new Date()
        });

        res.status(201).json({ message: "Candidatura realizada com sucesso", candidatura: novaCandidatura });
      } catch (error) {
        console.error("Erro ao candidatar-se:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    });

app.get('/candidaturas/:idVaga', async (req, res) => {
    const { idVaga } = req.params;

    try {
        // Converter idVaga para ObjectId
        const vagaId = new ObjectId(idVaga);

        // Consultar o banco de dados para obter o número de candidaturas para a vaga específica
        const numCandidaturas = await applicationsCollection.countDocuments({ vagaId });

        res.status(200).json({ numCandidaturas });
    } catch (error) {
        console.error("Erro ao buscar o número de candidaturas:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

  app.get('/todas-candidaturas', async (req, res) => {
    try {
        // Consultar o banco de dados para obter todas as candidaturas
        const candidaturas = await applicationsCollection.find({}).toArray();

        res.status(200).json({ candidaturas });
    } catch (error) {
        console.error("Erro ao buscar todas as candidaturas:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.get('/candidatos-vaga/:idVaga', async (req, res) => {
  const { idVaga } = req.params;
  

  try {
    const vagaId = new ObjectId(idVaga);
      // Consulte o banco de dados para obter as candidaturas para a vaga específica
      const candidaturas = await applicationsCollection.find({vagaId}).toArray();
     
      // Array para armazenar os dados dos candidatos
      const dadosCandidatos = [];

      // Para cada candidatura, busque os dados do candidato e adicione ao array
      for (const candidatura of candidaturas) {
          const candidato = await applicantCollection.findOne({_id: candidatura.candidatoId});
          if (candidato) {
              dadosCandidatos.push(candidato);
          }
      }                
      
     
      res.status(200).json(dadosCandidatos);
  } catch (error) {
      console.error("Erro ao buscar dados dos candidatos:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.get('/candidato/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const candidato = await applicantCollection.findOne({ _id: new ObjectId(id) });
    if (!candidato) {
      return res.status(404).json({ message: 'Candidato não encontrado' });
    }
    res.status(200).json(candidato);
  } catch (error) {
    console.error('Erro ao buscar dados do candidato:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});
   // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);

app.post('/send-email', 
  [
      check('name').notEmpty().withMessage('Nome é obrigatório'),
      check('email').isEmail().withMessage('Email é inválido'),
      check('subject').notEmpty().withMessage('Assunto é obrigatório'),
      check('message').notEmpty().withMessage('Mensagem é obrigatório')
  ], 
  (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'oportunidade.co.mz@gmail.com',
              pass: 'fhvy sxzq nfcq rjqc'
          }
      });

      const mailOptions = {
          from: req.body.email,
          to: 'oportunidade.co.mz@gmail.com',
          subject: req.body.subject,
          text: `Nome: ${req.body.name}\nEmail: ${req.body.email}\nMensagem: ${req.body.message}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return res.status(500).json({ error: error.toString() });
          }
          res.status(200).json({ message: 'Email enviado com sucesso!' });
      });
  }
);

const upload = multer({ dest: 'uploads/' });

app.post('/enviar-cv-email', upload.single('file'), async (req, res) => {
    const { name, email, valorPago } = req.body;
    const file = req.file;

    if (!file || !name || !email) {
        return res.status(400).json({ message: 'Arquivo, nome e e-mail são necessários.' });
    }

    // Configuração do Nodemailer para enviar e-mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'oportunidade.co.mz@gmail.com',
            pass: 'fhvy sxzq nfcq rjqc'
        }
    });

    const mailOptions = {
        from: 'oportunidade.co.mz@gmail.com',
        to: 'info@oportunidade.co.mz',
        subject: 'Novo CV Enviado',
        text: `Nome: ${name}\nE-mail: ${email}\nValor Pago: ${valorPago}`,
        attachments: [
            {
                filename: file.originalname,
                path: file.path
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'CV enviado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar o CV.' });
    }
});

// Endpoint de cadastro de usuário
app.get('/', (req, res) => {
    res.send("helllllooo");
});


// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
