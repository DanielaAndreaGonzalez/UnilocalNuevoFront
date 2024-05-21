export class AutorizarNegocioDTO {
  constructor(
    public codigoNegocio: string = '',
    public clienteId: string = '',
    public observacion:string='',
    public moderadorId:string='',
    public fechaAccion: Date,
    ){}
}
