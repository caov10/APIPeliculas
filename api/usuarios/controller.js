const express = require('express');
const controladorUsuarios = express.Router();
const servicioUsuarios= require('./service');


/*
GET => LOGIN
GET=> OBTENER USUARIO ID
*/

controladorUsuarios.get("/iniciarSesion", async function(req, res){
          let datos= req.query;
          let resultado = await servicioUsuarios.iniciarSesion(datos);
          res.send(resultado);
});

/*
nuevoUsuario={
          "nombre": "xxxxxxxxxx"
          "usuario": "yyyyyyyyy"
          "clave": "zzzzzzzzzzz", => ENCRIPTAR
          "roles": ["A", "B"]
}

CREAR UN USUARIO
*/
controladorUsuarios.post("/crearUsuario", async function(req, res){
          let nuevoUsuario= req.body;
          let resultado= await servicioUsuarios.crearUsuario(nuevoUsuario);
          res.send(resultado);
})

module.exports= controladorUsuarios;