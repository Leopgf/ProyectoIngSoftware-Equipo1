import Usuario from '../Modelos/Usuario';
import { Alert } from 'react-native';
import { getRecetasBiblioteca } from '../Controladores/RecetaControler';

import * as firebase from 'firebase';


// FUNCION AUMENTAR LA PORCION DE LA RECETA
export function registerUsuario(usuario: Usuario, password: string, password2: string) {
  return new Promise(function(resolve, reject) {
  // VALIDAR FORMULARIO
  if (
    usuario.nombre !== '' &&
    usuario.apellido !== '' &&
    usuario.usuario !== '' &&
    usuario.email !== '' &&
    password !== '' &&
    password2 !== ''
  ) {
    let isEmail = validarEmail(usuario.email);
    let isPass = validarClave(password, password2);

    // SI PASA VALIDACION REGISTRA AL USUARIO
    if (isEmail && isPass) {
      // REVISAR QUE NO HAYA OTRO USUARIO CON EL MISMO USERNAME
      firebase
        .firestore()
        .collection('Usuarios')
        .where('usuario', '==', usuario.usuario)
        .get()
        .then((usuarios) => {
          if (usuarios.docs.length === 0) {
            try {
              firebase
                .auth()
                .createUserWithEmailAndPassword(usuario.email, password)
                .then((user) => {
                  usuario.usuarioID = user.user?.uid;
                  firebase
                    .firestore()
                    .collection('Usuarios')
                    .add(usuario)
                    .then(() => {
                      firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          resolve('Su usuario ha sido creado con éxito. Proceda a iniciar sesión.');
                        });
                    })
                    .catch((error) => {
                      reject('Error, compruebe los datos ingresados e intente nuevamente.');
                    });
                })
                .catch((error) => {
                  reject('Error, compruebe los datos ingresados e intente nuevamente.');
                });
            } catch (error) {
              reject('Error, compruebe su conexión a internet o los datos ingresados e intente nuevamente.');
            }
          } else {
            reject('Error, ya hay alguien con ese nombre de usuario.');
          }
        })
        .catch(() => {
          reject('Error, compruebe su conexión a internet o los datos ingresados e intente nuevamente.')
        });

      // MENSAJES DE ERROR
    } else {
      if (!isEmail) {
        reject('Error, email inválido.');
      } else {
        if (password.length < 8) {
          reject('Error, la contraseña debe tener al menos 8 caracteres.');
        } else {
          reject('Error, las contraseñas no coinciden.');
        }
      }
    }
  } else {
    reject('Por favor rellene todos los campos.');
  }
  });
}

export function loginUsuario(email: string, password: string) {
  return new Promise(function(resolve, reject) {
  if (email !== '' && password !== '') {
    let isEmail = validarEmail(email);

    if (isEmail) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve("Bienvenido a Mixo's");
        })
        .catch(() => {
          reject('Error, usuario y clave incorrectos.');
        });
    } else {
      Alert.alert('Error, email inválido.');
    }
  } else {
    reject('Por favor rellene todos los campos.');
  }
});
}

export function validarClave(clave: string, clave2: string) {
  if (clave.length >= 8) {
    if (clave === clave2) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function validarEmail(email: string) {
  let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
}

// FUNCION PARA AGREGAR UNA RECETA A LA BIBLIOTECA
export function recuperarContrasena(email: string) {
  return new Promise(function(resolve, reject) {
  
  let isEmail = validarEmail(email);

  if(isEmail){
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      resolve('Estimado usuario, se le ha enviado un email para proceder con el cambio de clave.')
    }).catch(() => {
      reject('Error, ese email no tiene ningún usuario registrado.');
    });
  }else {
    reject('Por favor instroduzca un email válido.');
  }
});
}

export async function getPerfil(pasarPerfil: Function) {
  let snapshot = await firebase.firestore().collection('Usuarios').where('usuarioID', '==', firebase.auth().currentUser?.uid).get();
  let usuario = {};

  snapshot.forEach((doc) => {
    usuario = {
      ...doc.data() as Usuario
    };
  });
  
  pasarPerfil(usuario);
}

//FUNCION PARA RECUPERAR LA BIBLIOTECA DEL USUARIO 
export async function getBiblioteca(recetasGuardadas: Function){
// let id = firebase.auth().currentUser?.uid;
// let snapshot= await firebase.firestore().collection('Usuarios').where('usuarioID', '==', id).get();
// let biblioteca = snapshot.data().biblioteca;
// let recetas = getRecetasBiblioteca(biblioteca);
// recetasGuardadas(recetas);
}

// FUNCION PARA COMPARAR SI UNA RECETA ESTA GUARDADA EN LA BIBLIOTECA O NO 
export async function esFavorito(idRecibido : string){
  // let userId = firebase.auth().currentUser?.uid;
  // let snapshot= await firebase.firestore().collection('Usuarios').where('usuarioID', '==', userId).get();
  // let biblioteca = snapshot.data().biblioteca;
  // biblioteca.forEach(idReceta => {
  //   if(idReceta == idRecibido){
  //     return true
  //   }else{

  //   }
  // });
  // return false
 
}

// FUNCION PARA AGREGAR UNA RECETA A LA BIBLIOTECA
export async function agregarEnBiblioteca(recetaId : string){
  // let userId = firebase.auth().currentUser?.uid;
  // let snapshot= await firebase.firestore().collection('Usuarios').where('usuarioID', '==', userId).get();
  // let biblioteca = snapshot.data().biblioteca;
  // biblioteca.push(recetaId);
  // esFavorito(recetaId);
}

// FUNCION PARA ELIMINAR UNA RECETA DE LA BIBLIOTECA
export async function eliminarEnBiblioteca(recetaId : string){
  // let userId = firebase.auth().currentUser?.uid;
  // let snapshot= await firebase.firestore().collection('Usuarios').where('usuarioID', '==', userId).get();
  // let biblioteca = snapshot.data().biblioteca;
  // biblioteca.delete(recetaId);
  // esFavorito(recetaId);
}