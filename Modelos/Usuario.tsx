export default interface Receta {
    usuarioID?: string; // Este atributo es opcional, puede o no puede estar en una variable de tipo Receta
    nombre: string;
    apellido: string;
    usuario: string;
    email: string;
    biblioteca: string[];
}