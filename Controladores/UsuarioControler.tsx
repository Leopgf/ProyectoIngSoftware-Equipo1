import Usuario from '../Modelos/Usuario';
import { Alert } from 'react-native';

import * as firebase from 'firebase';

// FUNCION AUMENTAR LA PORCION DE LA RECETA
export async function registerUsuario(usuario: Usuario, password: string, password2: string) {

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
      await firebase
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
                      Alert.alert('Su usuario ha sido creado con éxito. Proceda a iniciar sesión.');
                      firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          return true;
                        });
                    })
                    .catch((error) => {
                      Alert.alert(error.message);
                      return false;
                    });
                })
                .catch((error) => {
                  Alert.alert(error.message);
                  return false;
                });
            } catch (error) {
              Alert.alert(error.toString());
              return false;
            }
          } else {
            Alert.alert('Error, ya hay alguien con ese nombre de usuario.');
            return false;
          }
        })
        .catch();

      // MENSAJES DE ERROR
    } else {
      if (!isEmail) {
        Alert.alert('Error, email inválido.');
        return false;
      } else {
        if (password.length < 8) {
          Alert.alert('Error, la contraseña debe tener al menos 8 caracteres.');
          return false;
        } else {
          Alert.alert('Error, las contraseñas no coinciden.');
          return false;
        }
      }
    }
  } else {
    Alert.alert('Por favor rellene todos los campos.');
    return false;
  }
}

export function loginUsuario(email: string, password: string) {

  if (email !== '' && password !== '') {
    let isEmail = validarEmail(email);

    if (isEmail) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert("Bienvenido a Mixo's");
          return Promise.resolve(true);
        })
        .catch(() => {
          Alert.alert('Error, usuario y clave incorrectos.');
          return Promise.reject();
        });
    } else {
      Alert.alert('Error, email inválido.');
      return Promise.reject();
    }
  } else {
    Alert.alert('Por favor rellene todos los campos.');
    return Promise.reject();
  }
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
