import Receta from '../Modelos/Receta';

// FUNCION AUMENTAR LA PORCION DE LA RECETA  
export function aumentarPorcion(porcionDefecto: number, porciones: number, ingredientes: Object[], porcionCambiada: Function){
    console.log(ingredientes);

    if(porciones < 20){
        ingredientes.forEach(ingrediente => {
          if(ingrediente.alGusto == false){
            ingrediente.cantidad = Math.round((((porciones+1)*ingrediente.cantidad)/porcionDefecto)*10)/10;
          }
        });
        porcionCambiada(ingredientes, porciones + 1);
    }

  }
  
  // FUNCION DISMINUIR LA PORCION DE LA RECETA  
  export function disminuirPorcion(porcionDefecto: number, porciones: number, ingredientes: Object[], porcionCambiada: Function){
    
    if (porciones > 1){
        ingredientes.forEach(ingrediente => {
          if(ingrediente.alGusto == false){
            ingrediente.cantidad = Math.round((((porciones-1)*ingrediente.cantidad)/porcionDefecto)*10)/10;
          }
        });
        porcionCambiada(ingredientes, porciones - 1);
    }
  
    
  }