export default class Receta {
    recetaID: string;
    nombre: string;
    descripción: string;
    porcionDefecto: number;
    unidadPorcion: string;
    categorias: string[]; 
    pasos: string[];
    imagen: string;
    ingredientes: Object[];
    fecha: Date;

    constructor( recetaID: string, nombre: string, imagen: string, fecha: Date, descripción?: string, unidadPorcion?: string, porcionDefecto?: number, categorias?: string[], pasos?: string[], ingredientes?: Object[]){
        if(descripción && unidadPorcion && porcionDefecto && categorias && pasos && ingredientes){
            this.recetaID = recetaID;
            this.nombre = nombre;
            this.descripción = descripción;
            this.categorias = categorias;
            this.porcionDefecto = porcionDefecto;
            this.unidadPorcion = unidadPorcion;
            this.pasos = pasos;
            this.imagen = imagen;
            this.ingredientes = ingredientes;
            this.fecha = new Date(fecha);
        }else{
            this.recetaID = recetaID;
            this.nombre = nombre;
            this.descripción = '';
            this.categorias = [];
            this.porcionDefecto = 0;
            this.unidadPorcion = '';
            this.pasos = [];
            this.imagen = imagen;
            this.ingredientes = [];
            this.fecha = new Date(fecha);
        }
        
    }

}