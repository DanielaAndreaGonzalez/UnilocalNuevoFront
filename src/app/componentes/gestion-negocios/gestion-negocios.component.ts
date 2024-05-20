import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css',
})
export class GestionNegociosComponent {
  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: string;

  negocios: ItemNegocioDTO[];
  constructor(private negocioService: NegociosService,private tokenService: TokenService) {
    this.negocios = [];
    this.listarNegocios();
    this.seleccionados = [];
    this.textoBtnEliminar = '';
  }

  public listarNegocios() {
    const codigoCliente = this.tokenService.getCodigo();
    /*this.negocioService.listarNegociosPropietario(codigoCliente).subscribe({
      next: (data) => { this.negocios = data.respuesta;
      },
       error: (error) => { console.error(error);

       }
      });*/

  }

  public seleccionar(producto: ItemNegocioDTO, estado:boolean){
    if(estado){
      this.seleccionados.push(producto);
    }else{
      this.seleccionados.splice(this.seleccionados.indexOf(producto),1);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
    if (tam == 1) {
    this.textoBtnEliminar = "1 elemento";
    } else {
    this.textoBtnEliminar = tam + " elementos";
    }
    } else {
    this.textoBtnEliminar = "";
    }
  }
  public borrarNegocios(){
    this.seleccionados.forEach(n => {
      this.negocioService.eliminar(n.codigo);
      this.negocios = this.negocios.filter(negocio => negocio.codigo !== n.codigo);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

}
