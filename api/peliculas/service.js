const modeloPeliculas= require('./model');

/*
Servicio => Manipulacion de fdatos => LOGICA DE NEGOCIO.
          => Recibe una accion del controlado
                    =>Ejecuta la accion
                              => Consultar datos al modelo
                              =>Realizar operaciones matematicas logicas con los datos.
          => Envia los resultados de la accion al controlador

*/

async function obtenerPeliculas(){
          let peliculas = await modeloPeliculas.buscarTodos(); //dudas en este punto quite findAll los parentesis
          return peliculas;
}

async function obtenerPelicula(id){
          //VALIDAR QUE EL ID NO SEA NULO, UNDEFINED O VACIO
          if(id.length ==24){
                     let pelicula = await modeloPeliculas.buscarPorId(id);
                     if(pelicula){
                              return pelicula;
                     }else{
                          return "El ID NO existe en la base de datos";
                     }
          }
          else{
               return "Ingrese un ID por favor"
          }
}

async function buscarPeliculasTitulo(nombre, exacta= false){
     let peliculas= await modeloPeliculas.buscarPorTitulo(nombre, exacta);
     return peliculas;
}
 //pelicula =>null, undefined
     //objeto vacio => longitud es 0 => conocer las llaves

     /* 
     Objeto={
     "titulo": "The Godfather",
     "ano": "1974",
     "genero": ["Crimen", "Drama"]
     }
     object.keys(Objeto) => ["The Godfather","1974",["Crimen", "Drama"]]
     */
async function crearPelicula(pelicula){
     let resultado={}
    
     if(pelicula && Object.keys(pelicula).length >0){
          if(pelicula.titulo && pelicula.titulo !== ""){
               let busqueda= await buscarPeliculasTitulo(pelicula.titulo, true);
               if(busqueda.length === 0){
                    let crearResultado = await modeloPeliculas.crearPelicula(pelicula);

                    if(crearResultado && crearResultado.acknowledged){
                         resultado.mensaje= "Pelicula Creada Exitosamente"
                         resultado.datos= crearResultado;
                    }else{
                         resultado.mensaje= "Error al Crear Pelicula";
                         resultado.datos= pelicula;
                    }
               }else{
                    resultado.mensaje= "Pelicula YA esta Registrada",
                    resultado.datos= pelicula.titulo;
               }
          }else{
               resultado.mensaje= "Titulo no existe o esta vacio";
               resultado.data= pelicula;
          }
     }else{
          resultado.mensaje= "No hay datos para insertar";
     }
     return resultado;
}

async function actualizarPelicula(id, nuevoDatos){
     /*
     1. Longitud es exactamente igual a 24 => .legth
     2. 0-9 y A-F => /^[0-9A-F]+$/i
     */
    let resultado ={}
    if(id.length == 24 && /^[0-9A-F]+$/i.test(id)){
         //Validar los nuevos datos.
         let actualizarResultado= await modeloPeliculas.actualizarPelicula(id, nuevoDatos);
         if(actualizarResultado && actualizarResultado.acknowledged){
              resultado.mensaje= "Pelicula actualizada correctamente";
              resultado.datos= actualizarResultado;
         }else{
              resultado.mensaje="Error al actualizar la pelicula";
              resultado.datos={"id": id, "datos": nuevoDatos};
         }
    }
     else{
              resultado.mensaje="ID invalido";
              resultado.datos= id;
         }
         return resultado;
}

async function eliminarPelicula(id){
     let resultado ={};
     if(id && id.length == 24 && /^[0-9A-F]+$/i.test(id)){
          let resultadoEliminar= await modeloPeliculas.eliminarPelicula(id);
          if(resultadoEliminar && resultadoEliminar.acknowledged){
               resultado.mensaje= "Eliminada Correctamente";
               resultado.datos= resultadoEliminar;
          }else{
               resultado.mensaje= "Error al Eliminar Pelicula";
               resultado.datos= id;

          }

     }else{
          resultado.mensaje= "ID INVALIDO";
          resultado.datos= id;
     }
     return resultado;
}

         
module.exports.obtenerPeliculas= obtenerPeliculas;
module.exports.obtenerPelicula=obtenerPelicula;
module.exports.buscarPeliculasTitulo=buscarPeliculasTitulo;
module.exports.crearPelicula= crearPelicula;
module.exports.actualizarPelicula=actualizarPelicula;
module.exports.eliminarPelicula= eliminarPelicula;
