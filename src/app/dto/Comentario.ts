export class Comentario {
  constructor(
      public codigo: string,
      public mensaje: string,
      public respuesta: string,
      public codigoCliente: string,
      public codigoNegocio: string,
      public fotoCliente: string,
      public fecha: Date,
      public calificacion: number
  ) {}
}
