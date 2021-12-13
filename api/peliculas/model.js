const basedatos= require('../../database/conection');
const objectId= require('mongodb').ObjectId;

/* 
MODELO =>GESTIONA LA BASE DE DATOS
          =>REALIZA CONSULTA DE LOS DATOS A PETICION DE LOS SERVICIOS
                    =>LECTURA =>SELECCIONA
                    =>ESCRIBE
                    =>ACTUALIZA
                    =>ELIMINA
*/

function buscarTodos(){
          let db= basedatos.obtenerConexion();

         return  db.collection("peliculasc").find({}).limit(100).toArray()
          .then(function(data){
                    return data;
          })
          .catch(function(error){
                    console.log(error);
          });
}

function buscarPorId(id){
          let db= basedatos.obtenerConexion();

          return db.collection("peliculasc").findOne({"_id": objectId(id) })
          .then(function(data){
                    return data;
          })
          .catch(function(error){
                    console.log(error);
          });
}
function buscarPorTitulo(nombre, exacta){
          let db=basedatos.obtenerConexion();
          let busqueda;
          if(exacta){
                    busqueda=nombre;
          }else{
                    busqueda = new RegExp(nombre, "i");
          }
          return db.collection("peliculasc").find({"titulo":new RegExp(nombre,"i")}).toArray()
          .then(function(datos){
                    return datos;
          })
          .catch(function(error){
                    console.log(error);
          });
}
function crearPelicula(pelicula){
          let db= basedatos.obtenerConexion();
          return db.collection("peliculasc").insertOne(pelicula)
          .then(function(resultado){
                    return resultado;
          })
          .catch(function(error){
                    console.log(error);
          });
}

function actualizarPelicula(id, nuevosDatos){
          let db= basedatos.obtenerConexion();

          return db.collection("peliculasc").updateOne(
                    {"_id":objectId(id)}, //Filtro
                    {"$set":nuevosDatos} //oPeracion de actualizacion
          )
          .then(function(resultado){
                    return resultado;
                    
          })
          .catch(function(error){
                    console.log(error);
          })
}
function eliminarPelicula(id){
          let db= basedatos.obtenerConexion();

          return db.collection("peliculasc").deleteOne({"_id":objectId(id)})
          .then(function(resultado){
                    return resultado;

          })
          .catch(function(error){
                    console.log(error)
          });
}


module.exports.buscarTodos= buscarTodos;
module.exports.buscarPorId= buscarPorId;
module.exports.buscarPorTitulo=buscarPorTitulo;
module.exports.crearPelicula=crearPelicula;
module.exports.actualizarPelicula= actualizarPelicula;
module.exports.eliminarPelicula=eliminarPelicula;
