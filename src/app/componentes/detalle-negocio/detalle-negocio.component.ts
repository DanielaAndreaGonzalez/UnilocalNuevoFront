import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';
import { CommonModule } from '@angular/common';
import { NegociosService } from '../../servicios/negocios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent {

  codigoNegocio: string = '';
  negocio:  ItemNegocioDTO | undefined;

  constructor(private route: ActivatedRoute, private negociosService: NegociosService) {
    this.route.params.subscribe((params) => {
    this.codigoNegocio = params['codigo'];
    this.obtenerNegocio();
  });
  }

  public obtenerNegocio(){
    const negocioConsultado = this.negociosService.obtener(this.codigoNegocio);

    if(negocioConsultado != undefined){
      //this.negocio = negocioConsultado;
    }
  }

}
