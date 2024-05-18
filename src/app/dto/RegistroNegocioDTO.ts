
import { Horario } from "./Horario";
import { Ubicacion } from "./Ubicacion";

export class RegistroNegocioDTO {
  constructor(
  public nombre: string = '',
  public descripcion: string = '',
  public codigoCliente: string = '',
  public ubicacion: Ubicacion = new Ubicacion(),
  public imagenes: string[] = [],
  public tipoNegocio: string = '',
  public horarios: Horario[] = [],
  public telefonos: string[] = []
  ) { }
  }
