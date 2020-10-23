import Receta from '../Modelos/Receta';
import CategoriaReceta from '../Modelos/CategoriaReceta';

import * as firebase from 'firebase';

export async function getRecetas(recetasRecibidas: Function) {
  let recetas: Receta[] = [];
  let snapshot = await firebase.firestore().collection('Recetas').orderBy("fecha", "desc").get();

  snapshot.forEach((doc) => {
    let receta = new Receta(doc.id, doc.data().nombre, doc.data().imagen, doc.data().fecha);
    recetas.push(receta);
  });

  recetasRecibidas(recetas);
}
