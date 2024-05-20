import { Comentario } from "./Comentario";
import { Horario } from "./Horario";
import { Ubicacion } from "./Ubicacion";

export class NegocioDTO {
  constructor(
      public codigo: string,
      public nombre: string,
      public descripcion: string,
      public imagenes: string[],
      public horarios: Horario[],
      public telefonos: string[],
      public comentarios: Comentario[],
      public estado: string,
      public ubicacion: Ubicacion,
      public tipoNegocio: string,
      public codigoCliente: string
  ) {}
}
