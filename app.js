/*
Importar los modulos
*/
const express= require('express');
const bodyParser= require('body-parser');
const morgan= require('morgan');
const cors= require('cors');
const helmet= require('helmet');
const path= require('path');
const compression=require('compression')
const controladorPeliculas= require('./api/peliculas/controller');
const controladorUsuarios= require('./api/usuarios/controller');
const basedatos= require('./database/conection');
require('dotenv').config();
/* 
Iniciar la configuracion
*/
const app= express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
//FormData y lo pasa-convierte a formato JSON (FORMDATA =>JSON)
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(process.env.MORGAN_MODE));
const port= process.env.PORT;

/* 
Iniciar las Rutas
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

/* 
    CONFIGURAR LA CARPETA PUBLICA
*/
const publicPath= path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.get("/", function(req, res){
    res.sendFile( path.join(__dirname + "./index.html"));
})


/*
Configurar Donde el API va a estar monitoreando peticiones.
*/
basedatos.conectar()
          .then(function(){
                    app.listen(port, function(){
                    console.log("API Ejecutandose en el PUERTO" + port);
                    //console.log(basedatos.obtenerConexion());  
                    //Muestra que realmente se conecto a nuestra base de datos si le quito los slas
              });
          })
          .catch(function(error){
                    console.log("Se presento un error al conrctar a la base de datos");
                    console.log(error);
          });





