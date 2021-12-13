/*
BCRYPT
          =>  SALT_ROUND => #NUMERO DE VECES DE LA ENCRIPCION
          => SALT =>
          => CLAVE => ENCRIPCION

=> HASH
*/

const bcrypt= require('bcrypt');
require('dotenv').config();
const modeloUsuarios= require('./model');
const crearToken= require('../aut/jwt').crearToken;

async function crearUsuario(nuevoUsuario){
          let resultado ={};
          if(nuevoUsuario && nuevoUsuario.usuario && nuevoUsuario.clave &&Object.keys(nuevoUsuario).length > 0){
                     let contrasenaEncriptada= bcrypt.hashSync(nuevoUsuario.clave, parseInt(process.env.ENC_SALT_ROUNDS) )
                     nuevoUsuario.clave= contrasenaEncriptada;
                     let resultadoCrear= await modeloUsuarios.crearUsuario(nuevoUsuario);
                     if(resultadoCrear && resultadoCrear.acknowledged){
                               resultado.mensaje= "Usuario creado correctamente";
                               resultado.datos= resultadoCrear;
                     }
                     else{
                               resultado.mensaje= "Error al crear el Usuario";
                               resultado.datos= nuevoUsuario;
                     }
          }
          else{
                    resultado.mensaje="Datos Invalidos";
                    resultado.datos= nuevoUsuario;
          }
          return resultado;
         
}

async function iniciarSesion(usuario){
          let resultado = {};
          if(usuario && usuario.usuario && usuario.clave && Object.keys(usuario).length > 0){
                    let busquedaUsuario = await modeloUsuarios.buscarPorUsuario(usuario.usuario);
                    if(busquedaUsuario){
                              let contrasenaEncriptada= busquedaUsuario.clave;
                              let esValida= bcrypt.compareSync(usuario.clave, contrasenaEncriptada);
                              if(esValida){
                                        const token= crearToken(busquedaUsuario);
                                        resultado.mensaje= "Inicio de Sesion Correcto";
                                        delete busquedaUsuario.clave;
                                        resultado.datos= busquedaUsuario;
                                        resultado.token=token;
                              }
                              else{
                                        resultado.mensaje="Contraseña Invalida";
                                        resultado.datos= usuario;
                              }
                    }   
                    else{
                              resultado.mensaje= "Usuario no existe";
                              resultado.datos= usuario;
                    }    
          }
          else{
                    resultado.mensaje= "Datos INValidos";
                    resultado.datos= usuario;
          }
          return resultado;

}


module.exports.crearUsuario= crearUsuario;
module.exports.iniciarSesion=iniciarSesion;