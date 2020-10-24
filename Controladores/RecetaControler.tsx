import Receta from '../Modelos/Receta';
import CategoriaReceta from '../Modelos/CategoriaReceta';

import * as firebase from 'firebase';
import DetallesReceta from '../Vista/screens/DetallesReceta';

// FUNCION PARA RECUPERAR LAS RECETAS PARA LA FEED
export async function getRecetas(recetasRecibidas: Function) {
  let recetas: Receta[] = [];
  let snapshot = await firebase.firestore().collection('Recetas').orderBy("fecha", "desc").get();

  snapshot.forEach((doc) => {
    let receta = new Receta(doc.id, doc.data().nombre, doc.data().imagen, doc.data().fecha);
    recetas.push(receta);
  });

  recetasRecibidas(recetas);
}

// FUNCION PARA RECUPERAR LOS DETALLES DE LAS RECETAS
export async function getDetallesReceta(detallesRecetas: Function, id: string) {
  let detalles: Receta[] = [];
  let snapshot = await firebase.firestore().collection('Recetas').doc(id).get();

  snapshot((campo) =>{
    let detalle = new Receta(campo.id, campo.data().nombre, campo.data().descripcion, campo.data().porcionDefecto, campo.data().unidadProcion, campo.data().pasos, campo.data().imagen, campo.data().ingredientes);
     detalles.push(detalle);
  });

  detallesRecetas(detalles);
}
