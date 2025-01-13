const express = require('express');
const app = express();
const port = 3000; //porta padrão
const mysql = require('mysql2');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var cors = require('cors');
app.use(express.static("public"));
app.use(cors());

app.use(express.json());	
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

const jwt = require("jsonwebtoken"); 
const privateKey = "xxxyyyzzz123";

const middlewareValidarJWT = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
  
    jwt.verify(jwtToken, privateKey, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        req.userInfo = userInfo;
        next();
    });
};

const db ={
    host     : '54.173.126.116',
    port     : 3001,
    user     : 'vinicius',
    password : 'vinicius',
    database : 'vinicius'
  }

const  execSQLQuery = (sqlQry, id, res) =>{
  const connection = mysql.createConnection(db);
  
  connection.query(sqlQry, id, (error, results, fields) => {
    
      if(error) 
        res.json(error);
      else
        res.json(results);
    
      connection.end();
      console.log('executou!');
  });
}


async function resultSQLQuery(sqlQry, id) {
  const connection = await mysql.createConnection(db);
  
  let [result] = await connection.promise().query(sqlQry, id);
  try {
    return result;
  } catch (error) {
    console.log("error"+error);
    throw error;
  }  
}

// --------------------------- USUARIOS -----------------------------------------
//segundo parametro - middlewareValidarJWT
app.get('/usuarios', (req, res) => {
    console.log(req);
    const id = [];
    execSQLQuery('SELECT * FROM users', id, res);
})

app.get('/usuariosInformacoes', middlewareValidarJWT, async (req, res) => {
  const {email} = req.query;
  // console.log(data.email)
  var [result] = await resultSQLQuery('SELECT * FROM users WHERE email=?',[email]);
  console.log(result)
  return res.json(result);
})

app.post('/login', async (req, res) => {
    const data = req.body;
    const id = [data.email, data.password];
    // console.log(data)
    var [result] = await resultSQLQuery('SELECT * FROM users WHERE email=? and password=?',id);
    // console.log(result);
    if(result){
      jwt.sign(req.body, privateKey, (err, token) => {
                if (err) {
                    res
                        .status(500)
                        .json({ mensagem: "Erro ao gerar o JWT" });

                    return;
                }
                // res.set("x-access-token", token);
                res.json({"menssagem": "sucesso!", token});
                res.end();
            });
    }
    else
    res.send({"menssagem": false})
  
});
app.post('/usuarios', (req, res) => {
  const data = req.body;
  // console.log(req.body)
  const id = [data.email, data.password, data.name_user, data.genero, data.idade, data.cep, data.cidade, data.estado, data.numero, data.rua, data.bairro];
  execSQLQuery('INSERT INTO users(email, password, name_user, cep, genero, idade, cidade, estado, numero, rua, bairro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', id, res);
})
app.put('/usuarios', (req, res) =>{
  const data = req.body;
  console.log(data)
  const id = [data.name_user, data.cep, data.genero, data.idade, data.cidade, data.estado, data.numero, data.rua, data.bairro, data.email];
  execSQLQuery('UPDATE users SET name_user=?, cep=?, genero=?, idade=?, cidade=?, estado=?, numero=?, rua=?, bairro=? WHERE email=?', id, res)
})
app.delete('/usuarios', (req, res) =>{
  const data = req.body;
  const id = [data.id];
  execSQLQuery('DELETE FROM users WHERE id=?', id, res)
})

// --------------------------- EVENTOS -----------------------------------------
app.get('/events', middlewareValidarJWT, (req, res) => {
  console.log(req);
  const id = [];
  execSQLQuery('SELECT * FROM events', id, res);
})

app.post('/events', (req, res) => {
  const data = req.body;
  const id = [data.event_date, data.description, data.time, data.title, data.email_user, data.bairro, data.cep, data.cidade, data.complemento, data.estado, data.numero, data.rua];
  console.log(id)
  
  execSQLQuery('INSERT INTO events(event_date, description, time, title, email_user, bairro, cep, cidade, complemento, estado, numero, rua) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', id, res);
})
app.put('/events', (req, res) =>{
  const data = req.body;
  const id = [data.event_date, data.description, data.time, data.title, data.email_user, data.bairro, data.cep, data.cidade, data.complemento, data.estado, data.numero, data.rua, data.id]

  execSQLQuery('UPDATE events SET event_date=?, description=?, time=?, title=?, email_user=?, bairro=?, cep=?, cidade=?, complemento=?, estado=?, numero=?, rua=? WHERE id=?', id, res)
})
app.delete('/events', (req, res) =>{
  const data = req.body;
  const id = [data.id];
  execSQLQuery('DELETE FROM events WHERE id=?', id, res)
})


//inicia o servidor
app.listen(port);
console.log('API funcionando!');