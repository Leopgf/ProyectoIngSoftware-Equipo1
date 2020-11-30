export default interface Review {
    id?: string; // Este atributo es opcional, puede o no puede estar en una variable de tipo Review
    recetaID: string; 
    userID: string;
    imagen: string;
    titulo: string;
    mensaje: string;
    valoracion: number;
    fecha: Date;
}