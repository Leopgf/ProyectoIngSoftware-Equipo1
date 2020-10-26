import Receta from '../Modelos/Receta';
import CategoriaReceta from '../Modelos/CategoriaReceta';

import * as firebase from 'firebase';

// FUNCION PARA RECUPERAR LAS RECETAS PARA LA FEED
export async function getRecetas(recetasRecibidas: Function) {
  let recetas: Receta[] = [];
  let snapshot = await firebase.firestore().collection('Recetas').orderBy("fecha", "desc").get();

  snapshot.forEach((doc) => {
    const id = doc.id;
    const { nombre, imagen, fecha } = doc.data();
    let receta = { recetaID: id, ...(doc.data() as Receta) };
    receta.fecha = new Date(doc.data().fecha);
    recetas.push(receta);
  });

  recetasRecibidas(recetas);
}

// FUNCION PARA RECUPERAR LOS DETALLES DE LAS RECETAS
export async function getDetallesReceta(detallesRecetas: Function, id: string) {

  let snapshot = await firebase.firestore().collection('Recetas').doc(id).get();

    let detalle: Receta = {
        ...snapshot.data() as Receta,
        recetaID: snapshot.id
    }

    detalle.fecha = snapshot.data().fecha.toDate().toString();

  detallesRecetas(detalle);
}

// FUNCION PARA RECUPERAR LAS CATEGORIAS PARA EL FILTRO
export async function getCategoriasHome(categoriasRecibidas: Function) {
  let categorias: Object[] = [{ 
    id: '0',
    title: 'Todas'
   }];
  let snapshot = await firebase.firestore().collection('Categoria').get();

  snapshot.forEach((doc) => {
    const id = doc.id;
    let categoria = { 
      id: doc.id,
      title: doc.data().nombre
     };
    categorias.push(categoria);
  });

  categoriasRecibidas(categorias);
}

// FUNCION PARA RECUPERAR UNA CATEGORIA
export async function getCategoriaReceta(categoriaRecetas: Function, detallesRecetas: Receta, id: string) {

  let snapshot = await firebase.firestore().collection('Categoria').doc(id).get();

    detallesRecetas.categorias[0] = snapshot.data().nombre;

  categoriaRecetas(detallesRecetas);
}

// FUNCION PARA RECUPERAR LAS RECETAS DE UNA CATEGORIAS
export async function getRecetasFiltroCategoria(recetasRecibidas: Function, idCategoria: string) {
  let recetas: Object[] = [];
  let snapshot= {};
  if(idCategoria !== '0'){
     snapshot = await firebase.firestore().collection('Recetas').where('categorias', 'array-contains', idCategoria).get();
  } else{
     snapshot = await firebase.firestore().collection('Recetas').orderBy("fecha", "desc").get();
  }

  snapshot.forEach((doc) => {
    const id = doc.id;
    let receta = { recetaID: id, ...(doc.data() as Receta) };
    recetas.push(receta);
  });

  recetasRecibidas(recetas);
}