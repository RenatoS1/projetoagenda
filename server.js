// Server.js

require('dotenv').config(); 
// Isso é referente às nossas variáveis de ambiente que estão configuradas no arquivo .env. 
// O módulo 'dotenv' carrega as variáveis de ambiente desse arquivo para o processo.

const express = require('express'); 
// Importa o framework Express, que é usado para criar um servidor web em Node.js.

const app = express(); 
// Cria uma instância do Express, que será usada para configurar o servidor.

const mongoose = require('mongoose'); 
// Importa o Mongoose, que é uma biblioteca ODM (Object Data Modeling) para MongoDB. 
// Ele facilita a interação com o banco de dados MongoDB.

mongoose.connect(process.env.CONNECTIONSTRING)

  // Conecta ao banco de dados MongoDB usando a string de conexão armazenada na variável de ambiente CONNECTIONSTRING.
  .then(() => {
    app.emit('Pronto'); 
    // Quando a conexão com o banco de dados for bem-sucedida, o evento 'Pronto' é emitido.
  })
  .catch(e => console.log(e)); 
  // Caso ocorra algum erro durante a conexão, ele será exibido no console.

const session = require('express-session'); 
// Importa o middleware 'express-session', que é usado para gerenciar sessões de usuário no servidor.

const MongoStore = require('connect-mongo'); 
// Importa o 'connect-mongo', que é usado para armazenar as sessões no MongoDB.

const flash = require('connect-flash'); 
// Importa o 'connect-flash', que é um middleware usado para exibir mensagens flash (mensagens temporárias).

const routes = require('./routes'); 
// Importa as rotas da aplicação, que estão definidas no arquivo './routes'.

const path = require('path'); 
// Importa o módulo 'path', que é usado para manipular caminhos de arquivos e diretórios.

const helmet = require('helmet'); 
// Importa o 'helmet', que é um middleware usado para aumentar a segurança do aplicativo adicionando cabeçalhos HTTP.

const csrf = require('csurf'); 
// Importa o 'csurf', que é um middleware usado para proteger contra ataques CSRF (Cross-Site Request Forgery).

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middlewares'); 
// Importa middlewares personalizados que estão definidos no arquivo './src/middlewares/middlewares'.

app.use(helmet()); 
// Aplica o middleware 'helmet' para aumentar a segurança do aplicativo.

app.use(express.urlencoded({ extended: true })); 
// Configura o Express para interpretar dados enviados via formulários HTML (POST requests) como objetos JavaScript.

app.use(express.json());
// Configura o Express para interpretar dados enviados via JSON.

app.use(express.static(path.resolve(__dirname, 'public'))); 
// Define a pasta 'public' como a pasta de arquivos estáticos (CSS, imagens, scripts, etc.).

const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()', 
  // Chave secreta usada para assinar a sessão. Deve ser uma string única e segura.
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), 
  // Configura o armazenamento da sessão no MongoDB usando a string de conexão.
  resave: false, 
  // Evita que a sessão seja salva novamente se não houver modificações.
  saveUninitialized: false, 
  // Evita que sessões não inicializadas sejam salvas no armazenamento.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    // Define o tempo de vida do cookie da sessão (7 dias em milissegundos).
    httpOnly: true 
    // Garante que o cookie só possa ser acessado via HTTP, não via JavaScript no navegador.
  }
});
app.use(sessionOptions); 
// Aplica as configurações de sessão ao aplicativo.

app.use(flash()); 
// Aplica o middleware 'connect-flash' para habilitar mensagens flash.

app.set('views', path.resolve(__dirname, 'src', 'views')); 
// Define o diretório onde os arquivos de visualização (views) estão localizados.

app.set('view engine', 'ejs'); 
// Define o motor de visualização (template engine) como EJS, que será usado para renderizar as views.

app.use(csrf()); 
// Aplica o middleware 'csurf' para proteger contra ataques CSRF.

// Nossos próprios middlewares
app.use(middlewareGlobal); 
// Aplica o middleware global personalizado, que pode ser usado para tarefas como log ou validações.

app.use(checkCsrfError); 
// Aplica o middleware para verificar erros relacionados ao CSRF.

app.use(csrfMiddleware); 
// Aplica o middleware para injetar tokens CSRF nas views.

app.use(routes); 
// Aplica as rotas da aplicação.

app.on('Pronto', () => { 
  // Quando o evento 'Pronto' for emitido (após a conexão com o banco de dados), o servidor será iniciado.
    const PORT = 3000; 
    // Define a porta onde o servidor irá rodar.
    app.listen(PORT, () => {
        console.log(`=================================`); 
        // Exibe uma mensagem formatada no console indicando que o servidor está rodando.
        console.log(` Servidor rodando na porta ${PORT}`); 
        console.log(` Acesse: http://localhost:${PORT}`); 
        console.log(`=================================`); 
    });
});






