export default interface Receta {
    recetaID?: string; // Este atributo es opcional, puede o no puede estar en una variable de tipo Receta
    nombre: string;
    descripción: string;
    porcionDefecto: number;
    unidadPorcion: string;
    categorias: string[]; 
    pasos: string[];
    imagen: string;
    ingredientes: Object[];
    fecha: Date;
}