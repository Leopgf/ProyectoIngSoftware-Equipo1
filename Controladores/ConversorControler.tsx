import Receta from '../Modelos/Receta';

import * as firebase from 'firebase';

// FUNCION AUMENTAR LA PORCION DE LA RECETA
export function aumentarPorcion(id: string, porciones: number, porcionCambiada: Function) {

  firebase.firestore().collection('Recetas').doc(id).get().then(receta => {
    
    let detalle: Receta = {
      ...(receta.data() as Receta),
    };

    if (porciones < 100) {
      detalle.ingredientes.forEach((ingrediente) => {
        if (ingrediente.alGusto == false) {
          ingrediente.cantidad =
            Math.round((((porciones + 1) * ingrediente.cantidad) / detalle.porcionDefecto) * 10) / 10;
        }
      });
      porcionCambiada(detalle.ingredientes, porciones + 1);
    }

  }).catch(error => console.log(error));


}

// FUNCION DISMINUIR LA PORCION DE LA RECETA
export function disminuirPorcion(id: string, porciones: number, porcionCambiada: Function) {
  firebase.firestore().collection('Recetas').doc(id).get().then(receta => {
    
    let detalle: Receta = {
      ...(receta.data() as Receta),
    };

    if (porciones > 1) {
      detalle.ingredientes.forEach((ingrediente) => {
        if (ingrediente.alGusto == false) {
          ingrediente.cantidad =
            Math.round((((porciones - 1) * ingrediente.cantidad) / detalle.porcionDefecto) * 10) / 10;
        }
      });
      porcionCambiada(detalle.ingredientes, porciones - 1);
    }

  }).catch(error => console.log(error));
}
