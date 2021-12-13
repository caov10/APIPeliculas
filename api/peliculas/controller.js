const express= require('express');
const controladorPeliculas= express.Router();
const servicioPeliculas= require('./service');
const rutaProtegida= require('../aut/jwt').validarToken;

/*
GET => OBTENER TODAS LAS PELICULAS
GET => OBTENER UNA PELICULA POR EL ID
GET => BUSCAR PELICULAS POR EL TITULO
POST => CREAR PELICULAS
PUT => ACTUALIZAR PELICULAS
DELETE => ELIMINAR PELICULAS
*/

/* 
Controlador => Entrada /salida al sistema
        => Recibe datos de entrada => request
        => Envia el servicio las entradas.
        => Recibe del servicio DATOS TRANSFORMADOS.
        =>ENVIA RESPUESTAS AL CLIENTE.
*/

controladorPeliculas.get("/obtenerPeliculas", rutaProtegida, async function(req, res){
        let peliculas = await servicioPeliculas.obtenerPeliculas();
        res.send({
                  "mensaje": "listado de peliculas",
                  "data": peliculas
        });
});

/* 
CONTROLADOR PARA BUSCAR UNA PELICULA POR ID
*/
controladorPeliculas.get("/obtenerPelicula/:id", async function(req, res){
        let id= req.params.id;
        let pelicula = await servicioPeliculas.obtenerPelicula(id);
        res.send({
                "mensaje": "Detalle de la pelicula",
                "data": pelicula
        });
})

/*
CONTROLADOR PARA BUSCAR PELICULA POR NOMBRE
*/
controladorPeliculas.get("/buscarPeliculasTitulo/:nombre", async function(req,res){
     let nombre=req.params.nombre;
     let peliculas=await servicioPeliculas.buscarPeliculasTitulo(nombre);
     res.send({
          "mensaje": "Resultado de Busqueda",
          "busqueda": nombre,
          "datos": peliculas
     });
})

controladorPeliculas.post("/crearPelicula", async function(req,res){
        let pelicula= req.body;
        let resultado= await servicioPeliculas.crearPelicula(pelicula);
        res.send(resultado);

});
/* 

*/

controladorPeliculas.put("/actualizarPelicula/:id" ,rutaProtegida, async function(req,res){
        let id= req.params.id;
        let nuevoDatos= req.body;
        let resultado= await servicioPeliculas.actualizarPelicula(id, nuevoDatos);
        res.send(resultado);
})
//http://localhost:3300/api/peliculas/eliminarPelicula?id=xxxyyyzzz
//Eliminar Pelicula por ID

controladorPeliculas.delete("/eliminarPelicula",rutaProtegida, async function(req, res){
        let id= req.query.id;
        let  resultado = await servicioPeliculas.eliminarPelicula(id);
        res.send(resultado);
})


module.exports = controladorPeliculas;