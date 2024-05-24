export class CambioPasswordDTO {
  constructor(
    public passwordNueva: string = '',
    public codigoCliente: string = '',
    public token:string='',
    ){}
}