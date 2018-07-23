// Dependencias
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
const sql = require('mssql')
require('events').EventEmitter.defaultMaxListeners = Infinity;

// Importacion
//
//Configuración
let config = require('./config')

//Controllers 
let proyetos = require('./controllers/proyectosController')

// Inicialización de la aplicación
var app = express()

// Configuración de la API y Header
app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));
app.use(cors())
app.set('port', config.puerto)

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', config.domain)
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET')
  res.setHeader('Content-Type', 'application/json')
  next()
});

// Iniciamos las rutas de nuestro servidor/API
let rutas = express.Router()

// Ruta de bienvenida
rutas.get('/', function(req, res) {
  res.send({
    'Mensaje': 'Bienvenido a la API REST de Gestion'
  })
})

//****** API 
//-------- rutas-------------------------------------
rutas.route('/Eventos/:id?')
.get()
//-------- rutas-------------------------------------

app.use(rutas)

async function conectar(){
  try {
    pool = await sql.connect(config["dbconexion"])
    console.log('Servidor de base de datos conectado');
  } catch (err) {
    console.log(`Error en la conexion servidor de base de datos, error ${err}`);
  }
}

// Inicialización del servicio
app.listen(config.puerto, function() {
  console.log(`Node server ejecutandose en http://localhost:${config.puerto}`)
  conectar();
})
