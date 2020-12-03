import Usuario from '../Modelos/Usuario';
import Receta from '../Modelos/Receta';
import { Alert } from 'react-native';
import { getRecetasBiblioteca } from '../Controladores/RecetaControler';

import * as firebase from 'firebase';

// FUNCION AUMENTAR LA PORCION DE LA RECETA
export function registerUsuario(usuario: Usuario, password: string, password2: string) {
  return new Promise(function (resolve, reject) {
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
                            resolve(
                              'Su usuario ha sido creado con éxito. Proceda a iniciar sesión.'
                            );
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
                reject(
                  'Error, compruebe su conexión a internet o los datos ingresados e intente nuevamente.'
                );
              }
            } else {
              reject('Error, ya hay alguien con ese nombre de usuario.');
            }
          })
          .catch(() => {
            reject(
              'Error, compruebe su conexión a internet o los datos ingresados e intente nuevamente.'
            );
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
  return new Promise(function (resolve, reject) {
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
  return new Promise(function (resolve, reject) {
    let isEmail = validarEmail(email);

    if (isEmail) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(
            'Estimado usuario, se le ha enviado un email para proceder con el cambio de clave. Verifique su carpeta de spam.'
          );
        })
        .catch(() => {
          reject('Error, ese email no tiene ningún usuario registrado.');
        });
    } else {
      reject('Por favor instroduzca un email válido.');
    }
  });
}

export async function getPerfil(pasarPerfil: Function) {
  let snapshot = await firebase
    .firestore()
    .collection('Usuarios')
    .where('usuarioID', '==', firebase.auth().currentUser?.uid)
    .get();
  let usuario = {};

  snapshot.forEach((doc) => {
    usuario = {
      ...(doc.data() as Usuario),
    };
  });

  pasarPerfil(usuario);
}

//FUNCION PARA RECUPERAR LA BIBLIOTECA DEL USUARIO
export async function getBiblioteca(bibliotecaRecibida: Function) {
  let id = firebase.auth().currentUser?.uid;
  let snapshot = await firebase
    .firestore()
    .collection('Usuarios')
    .where('usuarioID', '==', id)
    .get();
  let biblioteca: string[] = [];

  snapshot.forEach((doc) => {
    biblioteca = doc.data().biblioteca;
  });

  biblioteca = biblioteca.reverse();
  
  
  bibliotecaRecibida(biblioteca);
}

// FUNCION PARA COMPARAR SI UNA RECETA ESTA GUARDADA EN LA BIBLIOTECA O NO
export async function esFavorito(idRecibido: string, onFavoritoRecibido: Function) {
  let userId = firebase.auth().currentUser?.uid;
  if (userId) {
    let snapshot = await firebase
      .firestore()
      .collection('Usuarios')
      .where('usuarioID', '==', userId)
      .get();

    let biblioteca: string[] = [];

    snapshot.forEach((doc) => {
      biblioteca = doc.data().biblioteca;
    });

    let flag = false;

    biblioteca.forEach((idReceta) => {
      if (idReceta == idRecibido) {
        flag = true;
      }
    });

    if (flag) {
      onFavoritoRecibido(true);
    } else {
      onFavoritoRecibido(false);
    }
  }
}

// FUNCION PARA AGREGAR UNA RECETA A LA BIBLIOTECA
export async function agregarEnBiblioteca(recetaId: string, onFavoritoRecibido: Function) {
  let userId = firebase.auth().currentUser?.uid;
  let snapshot = await firebase
    .firestore()
    .collection('Usuarios')
    .where('usuarioID', '==', userId)
    .get();

  let biblioteca: string[] = [];
  let id: string = '';

  snapshot.forEach((doc) => {
    biblioteca = doc.data().biblioteca;
    id = doc.id;
  });

  biblioteca.push(recetaId);

  firebase
    .firestore()
    .collection('Usuarios')
    .doc(id)
    .update({
      biblioteca: biblioteca,
    })
    .then(() => {
      esFavorito(recetaId, onFavoritoRecibido);
    })
    .catch((error) => console.log(error));
}

// FUNCION PARA ELIMINAR UNA RECETA DE LA BIBLIOTECA
export async function eliminarEnBiblioteca(recetaId: string, onFavoritoRecibido: Function) {
  let userId = firebase.auth().currentUser?.uid;
  let snapshot = await firebase
    .firestore()
    .collection('Usuarios')
    .where('usuarioID', '==', userId)
    .get();

  let biblioteca: string[] = [];
  let id: string = '';

  snapshot.forEach((doc) => {
    biblioteca = doc.data().biblioteca;
    id = doc.id;
  });

  biblioteca = biblioteca.filter((id) => id !== recetaId);

  firebase
    .firestore()
    .collection('Usuarios')
    .doc(id)
    .update({
      biblioteca: biblioteca,
    })
    .then(() => {
      esFavorito(recetaId, onFavoritoRecibido);
    })
    .catch((error) => console.log(error));
}

//FUNCION PARA QUE EL USUARIO PUEDA AGREGAR UNA RECETA
export async function agregarReceta(receta: Receta) {
  let userId = firebase.auth().currentUser?.uid;

  return new Promise(function (resolve, reject) {
    if (
      receta.nombre !== '' &&
      receta.descripcion !== '' &&
      receta.porcionDefecto !== 0 &&
      receta.unidadPorcion !== '' &&
      receta.categorias[0] !== '' &&
      receta.pasos !== [] &&
      receta.imagen !== '' &&
      receta.ingredientes !== []
    ) {

      receta.pasos.forEach((paso) => {
        if (paso === '') {
          reject('Por favor rellene todos los campos correctamente.');
        }
      });

      receta.ingredientes.forEach((ingrediente) => {
        // @ts-ignore
        if (ingrediente.ingrediente === '') {
          reject('Por favor rellene todos los campos correctamente.');
        }
        // @ts-ignore
        if (ingrediente.alGusto === false && ingrediente.cantidad === 0) {
          reject('Por favor rellene todos los campos correctamente.');
        }
        // @ts-ignore
        if (ingrediente.alGusto === false && ingrediente.cantidad === '') {
          reject('Por favor rellene todos los campos correctamente.');
        }
      });

      receta.usuarioID = userId;
      firebase
        .firestore()
        .collection('Recetas')
        .add(receta)
        .then(() => {
          console.log('Publicado');
          resolve('Receta creada con exito.');
        })
        .catch((error) => console.log(error));
    } else {
      reject('Por favor rellene todos los campos correctamente.');
    }
  });
}

// BORRAR RECETAS
export async function eliminarReceta(recetaId: string) {
  await firebase
    .firestore()
    .collection('Recetas')
    .doc(recetaId)
    .delete()
    .then(() => {
      Alert.alert('Receta eliminada.');
    });
}

//FUNCION PARA RECUPERAR LAS RECETAS DEL USUSARIO
export async function getRecetasUsuarios(recetasRecibidas: Function) {
  let userId = firebase.auth().currentUser?.uid;
  let recetas: Receta[] = [];
  let snapshot = await firebase
    .firestore()
    .collection('Recetas')
    .where('usuarioID', '==', userId)
    .orderBy('fecha', 'desc')
    .get();

  snapshot.forEach((doc) => {
    const id = doc.id;
    let receta = { recetaID: id, ...(doc.data() as Receta) };
    receta.fecha = new Date(doc.data().fecha);
    receta.descripcion = doc.data().descripcion.substring(0, 200) + '. . .';

    recetas.push(receta);
  });

  recetasRecibidas(recetas);
}
