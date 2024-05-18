import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';


@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {

  textoBusqueda: string;
  resultados: ItemNegocioDTO[];

  constructor(private route: ActivatedRoute, private negociosService: NegociosService,
              private mapaService: MapaService) {
    this.resultados = [];
    this.textoBusqueda = "";

    this.route.params.subscribe(params => {
    this.textoBusqueda = params['texto'];
    //this.resultados = this.negociosService.buscar(this.textoBusqueda);
    });
    }

    ngOnInit(): void {
      this.mapaService.crearMapa();
      this.mapaService.pintarMarcadores(this.resultados);
    }

}
