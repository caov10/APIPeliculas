const basedatos= require('../../database/conection');

async function crearUsuario(nuevoUsuario){
          let db= basedatos.obtenerConexion();

          return await db.collection("usuariosc").insertOne(nuevoUsuario);
}

async function buscarPorUsuario(usuario){
          let db=basedatos.obtenerConexion();

          return await db.collection("usuariosc").findOne({"usuario":usuario});
}

module.exports.crearUsuario= crearUsuario;
module.exports.buscarPorUsuario=buscarPorUsuario;