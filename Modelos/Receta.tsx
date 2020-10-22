export default class Receta {
    recetaID: number;
    nombre: string;
    descripción: string;
    porcionDefecto: number;
    unidadPorcion: string;
    categorias: number[]; 
    pasos: string[];

    constructor( recetaID: number, nombre: string, descripción: string, unidadPorcion: string, porcionDefecto: number, categorias: number[], pasos: string[]){
        this.recetaID = recetaID;
        this.nombre = nombre;
        this.descripción = descripción;
        this.categorias = categorias;
        this.porcionDefecto = porcionDefecto;
        this.unidadPorcion = unidadPorcion;
        this.pasos = pasos;
    }

}