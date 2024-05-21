export class HistorialModeracionDTO {

  constructor(
    public lugarId: string,
    public moderadorId: string,
    public fechaAccion: Date,
    public estadoNegocio:string,
    public observacion:string,
    public nombreNegocio:string,
    public imagen:string
  ) {}
}
