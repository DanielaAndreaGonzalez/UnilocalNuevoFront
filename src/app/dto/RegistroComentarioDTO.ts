export class RegistroComentarioDTO {
  constructor(
      public mensaje: string,
      public codigoCliente: string,
      public codigoNegocio: string,
      public fechaRegistro: Date,
      public calificacion: number
  ) {}
}
