import Receta from '../Modelos/Receta';
import CategoriaReceta from '../Modelos/CategoriaReceta';

import * as firebase from 'firebase';

// FUNCION PARA RECUPERAR LAS RECETAS PARA LA FEED
export async function getRecetas(recetasRecibidas: Function, limit: number) {
  let recetas: Receta[] = [];
  let snapshot = await firebase.firestore().collection('Recetas').orderBy("fecha", "desc").limit(limit).get();  

  snapshot.forEach((doc) => {
    
    const id = doc.id;
    let receta = { recetaID: id, ...(doc.data() as Receta) };
    receta.fecha = new Date(doc.data().fecha);
    receta.descripcion = doc.data().descripcion.substring(0,200)+'. . .';
    
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
    //@ts-ignore
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
export async function getCategoriaReceta(categoriaRecetas: Function, detallesRecetas: Receta, id: string, index: number) {

  let snapshot = await firebase.firestore().collection('Categoria').doc(id).get();
//@ts-ignore
    detallesRecetas.categorias[index] = snapshot.data().nombre;

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
//@ts-ignore
  snapshot.forEach((doc) => {
    const id = doc.id;
    let receta = { recetaID: id, ...(doc.data() as Receta) };
    recetas.push(receta);
  });

  recetasRecibidas(recetas);
}

// FUNCION PARA RECUPERAS RECETAS DEL BUSCADOR DE TEXTO
 export async function getRecetasTexto(recetaBuscada: Function, textoReceta: string){
    let recetas : Object [] = [];
    let snapshot = {};

    if(textoReceta !== null || textoReceta !== ''){
      
      snapshot = await firebase.firestore().collection('Recetas').get();
//@ts-ignore
      snapshot.forEach((doc) => {
        const id = doc.id;
        let receta = { recetaID: id, ...(doc.data() as Receta) };
        recetas.push(receta);
      });
//@ts-ignore
      recetas = recetas.filter((receta) => receta.nombre.includes(textoReceta.toUpperCase()));
      
    } else{

      snapshot = await firebase.firestore().collection('Recetas').orderBy("fecha", "desc").get();
//@ts-ignore
      snapshot.forEach((doc) => {
        const id = doc.id;
        let receta = { recetaID: id, ...(doc.data() as Receta) };
        recetas.push(receta);
      });
    }

    recetaBuscada(recetas);
 }

 // FUNCION PARA RECUPERAR LAS RECETAS DE LA BIBLIOTECA DE UN USUARIO 
 export async function getRecetasBiblioteca(biblioteca : string[] ){
  let recetas: Receta[] = [];
  

  if(biblioteca.length === 0){
    return [];
    
  }else {
    biblioteca.forEach(async recetaId => {
      await firebase.firestore().collection('Recetas').doc(recetaId).get().then((doc) => {
        
        const id = doc.id;
        let receta = { recetaID: id, ...(doc.data() as Receta) };
        
      //@ts-ignore
        receta.fecha = new Date(doc.data().fecha);
        recetas.push(receta);
      });
    })
  
    return recetas;
  }
}  
 