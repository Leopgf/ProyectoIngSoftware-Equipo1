export default class Ingrediente {
    ingredienteID: number;
    recetaID: number;
    cantidad: number;
    unidad: string;
    ingrediente: string;

    constructor( ingredienteID: number, recetaID: number, cantidad: number, unidad: string, ingrediente: string){
        this.ingredienteID = ingredienteID;
        this.recetaID = recetaID;
        this.cantidad = cantidad;
        this.unidad = unidad;
        this.ingrediente = ingrediente;
    }
}