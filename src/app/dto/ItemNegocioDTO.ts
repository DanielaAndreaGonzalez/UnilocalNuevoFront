import { Ubicacion } from "./Ubicacion";


export class ItemNegocioDTO {
constructor(
public codigo: string = '',
public nombre: string = '',
public codigoCliente:string='',
public descripcion:string='',
public imagenDestacada: string = '',
public tipoNegocio: string = '',
public ubicacion: Ubicacion = new Ubicacion(),
public calificacionPromedio: number = 0,
public estadoNegocio:string = ''
){}
}
