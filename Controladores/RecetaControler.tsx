import Receta from '../Modelos/Receta';
import CategoriaReceta from '../Modelos/CategoriaReceta';
import Review from '../Modelos/Review';

import * as firebase from 'firebase';

// FUNCION PARA RECUPERAR LAS RECETAS PARA LA FEED
export async function getRecetas(recetasRecibidas: Function, limit: number) {
  let recetas: Receta[] = [];
  let snapshot = await firebase
    .firestore()
    .collection('Recetas')
    .orderBy('fecha', 'desc')
    .limit(limit)
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

// FUNCION PARA RECUPERAR LOS DETALLES DE LAS RECETAS
export async function getDetallesReceta(detallesRecetas: Function, id: string) {
  let snapshot = await firebase.firestore().collection('Recetas').doc(id).get();

  let detalle: Receta = {
    ...(snapshot.data() as Receta),
    recetaID: snapshot.id,
  };
  //@ts-ignore
  detalle.fecha = snapshot.data().fecha.toDate().toString();

  detallesRecetas(detalle);
}

// FUNCION PARA RECUPERAR LAS CATEGORIAS PARA EL FILTRO
export async function getCategoriasHome(categoriasRecibidas: Function) {
  let categorias: Object[] = [
    {
      id: '0',
      title: 'Todas',
    },
  ];
  let snapshot = await firebase.firestore().collection('Categoria').get();

  snapshot.forEach((doc) => {
    const id = doc.id;
    let categoria = {
      id: doc.id,
      title: doc.data().nombre,
    };
    categorias.push(categoria);
  });

  categoriasRecibidas(categorias);
}

// FUNCION PARA RECUPERAR UNA CATEGORIA
export async function getCategoriaReceta(
  categoriaRecetas: Function,
  detallesRecetas: Receta,
  id: string,
  index: number
) {
  let snapshot = await firebase.firestore().collection('Categoria').doc(id).get();
  //@ts-ignore
  detallesRecetas.categorias[index] = snapshot.data().nombre;

  categoriaRecetas(detallesRecetas);
}

// FUNCION PARA RECUPERAR LAS RECETAS DE UNA CATEGORIAS
export async function getRecetasFiltroCategoria(recetasRecibidas: Function, idCategoria: string) {
  let recetas: Object[] = [];
  let snapshot = {};
  if (idCategoria !== '0') {
    snapshot = await firebase
      .firestore()
      .collection('Recetas')
      .where('categorias', 'array-contains', idCategoria)
      .get();
  } else {
    snapshot = await firebase.firestore().collection('Recetas').orderBy('fecha', 'desc').get();
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
export async function getRecetasTexto(recetaBuscada: Function, textoReceta: string) {
  let recetas: Object[] = [];
  let snapshot = {};

  if (textoReceta !== null || textoReceta !== '') {
    snapshot = await firebase.firestore().collection('Recetas').get();
    //@ts-ignore
    snapshot.forEach((doc) => {
      const id = doc.id;
      let receta = { recetaID: id, ...(doc.data() as Receta) };
      recetas.push(receta);
    });
    //@ts-ignore
    recetas = recetas.filter((receta) => receta.nombre.includes(textoReceta.toUpperCase()));
  } else {
    snapshot = await firebase.firestore().collection('Recetas').orderBy('fecha', 'desc').get();
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
export async function getRecetasBiblioteca(biblioteca: string[], onRecetaRecibidas: Function) {
  if (biblioteca.length !== 0) {
    await biblioteca.forEach((recetaId) => {
      firebase
        .firestore()
        .collection('Recetas')
        .doc(recetaId)
        .get()
        .then((doc) => {
          const id = doc.id;
          let receta = { recetaID: id, ...(doc.data() as Receta) };

          //@ts-ignore
          receta.fecha = new Date(doc.data().fecha);
          onRecetaRecibidas(receta);
        });
    });
  }
}

export async function agregarReview(review: Review) {
  return new Promise(function (resolve, reject) {
    if (
      review.imagen === '' ||
      review.titulo === '' ||
      review.mensaje === '' ||
      review.valoracion === 0
    ) {
      reject('Error, por favor rellene todos los campos.');
    } else {
      firebase
        .firestore()
        .collection('Reviews')
        .add(review)
        .then(() => {
          resolve('Review publicada con éxito.');
        })
        .catch(() => {
          reject('Error de conexión, intente nuevamente');
        });
    }
  });
}

export async function editarReview(review: Review) {
  return new Promise(function (resolve, reject) {
    if (
      review.imagen === '' ||
      review.titulo === '' ||
      review.mensaje === '' ||
      review.valoracion === 0
    ) {
      reject('Error, por favor rellene todos los campos.');
    } else {
      console.log(review);

      firebase
        .firestore()
        .collection('Reviews')
        .doc(review.id)
        .update({
          recetaID: review.recetaID,
          userID: review.userID,
          imagen: review.imagen,
          titulo: review.titulo,
          mensaje: review.mensaje,
          valoracion: review.valoracion,
          fecha: new Date(review.fecha),
        })
        .then(() => {
          resolve('Su review ha sido actualizada con éxito');
        })
        .catch(() => {
          reject('Error, intente nuevamente.');
        });
    }
  });
}

// FUNCION PARA ELIMINAR UNA REVIEW
export async function eliminarReview(
  reviewID: string,
  recetaID: string,
  onReviewsRecibidas: Function
) {
  return new Promise(function (resolve, reject) {
    firebase
      .firestore()
      .collection('Reviews')
      .doc(reviewID)
      .delete()
      .then(() => {
        getReviews(recetaID, onReviewsRecibidas);
      })
      .catch(() => {
        reject('Error, intente nuevamente.');
      });
  });
}

// FUNCION PARA RECUPERAR LAS REVIEWS DE UNA RECETA
export async function getReviews(recetaID: string, onReviewsRecibidas: Function) {
  let reviews: Review[] = [];

  const snapshot = await firebase
    .firestore()
    .collection('Reviews')
    .where('recetaID', '==', recetaID)
    .orderBy('fecha', 'desc')
    .get();

  snapshot.forEach((doc) => {
    const id = doc.id;
    let review = { id: id, ...(doc.data() as Review) };
    review.fecha = new Date(doc.data().fecha);
    reviews.push(review);
  });

  onReviewsRecibidas(reviews);
}

// FUNCION PARA RECUPERAR UNA REVIEW
export async function getReview(reviewID: string, onReviewRecibida: Function) {
  let review = {};

  await firebase
    .firestore()
    .collection('Reviews')
    .doc(reviewID)
    .get()
    .then((doc) => {
      const id = doc.id;
      review = { id: id, ...(doc.data() as Review) };
      // @ts-ignore
      review.fecha = new Date(doc.data().fecha.toDate().toString());

      onReviewRecibida(review);
    });
}

// FUNCION PARA RECUPERAR UNA CATEGORIA
export async function getUsuarioReviewReceta(
  onUserReview: Function,
  reviews: Review[],
  id: string,
  index: number
) {
  let snapshot = await firebase
    .firestore()
    .collection('Usuarios')
    .where('usuarioID', '==', id)
    .get();
  //@ts-ignore
  snapshot.forEach((usuario) => {
    reviews[index].userID = usuario.data().usuario;

    onUserReview(reviews);
  });
}
