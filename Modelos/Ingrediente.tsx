export default class Ingrediente {
    ingredienteID: number;
    recetaID: number;
    cantidad: number;
    unidad: string;
    alGusto: boolean;
    ingrediente: string;

    constructor( ingredienteID: number, recetaID: number, cantidad: number, unidad: string, ingrediente: string, alGusto: boolean){
        this.ingredienteID = ingredienteID;
        this.recetaID = recetaID;
        this.cantidad = cantidad;
        this.alGusto = alGusto;
        this.unidad = unidad;
        this.ingrediente = ingrediente;
    }
}