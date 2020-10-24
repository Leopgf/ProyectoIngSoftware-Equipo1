import Receta from '../Modelos/Receta';
import CategoriaReceta from '../Modelos/CategoriaReceta';

import * as firebase from 'firebase';
import DetallesReceta from '../Vista/screens/DetallesReceta';

// FUNCION PARA RECUPERAR LAS RECETAS PARA LA FEED
export async function getRecetas(recetasRecibidas: Function) {
  let recetas: Receta[] = [];
  let snapshot = await firebase.firestore().collection('Recetas').orderBy("fecha", "desc").get();

  snapshot.forEach((doc) => {
    const id = doc.id;
    const { nombre, imagen, fecha } = doc.data();
    let receta = { recetaID: id, ...(doc.data() as Receta) };
    recetas.push(receta);
  });

  recetasRecibidas(recetas);
}

// FUNCION PARA RECUPERAR LOS DETALLES DE LAS RECETAS
export async function getDetallesReceta(detallesRecetas: Function, id: string) {
//   let detalles: Receta[] = [];
  let snapshot = await firebase.firestore().collection('Recetas').doc(id).get();
//   const docId = snapshot.id;

//   snapshot((campo) =>{
    let detalle: Receta = {
        ...snapshot.data() as Receta,
        recetaID: snapshot.id
    }
    //  detalles.push(detalle);
//   });

  detallesRecetas(detalle);
}
