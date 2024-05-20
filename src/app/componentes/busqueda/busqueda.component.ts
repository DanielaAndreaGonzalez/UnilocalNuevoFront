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
      this.negociosService.obtenerNegocioPorNombre(this.textoBusqueda).subscribe({
        next:(data) => {
          this.resultados = data.respuesta;
          console.log("Negocios recomendados listados: ", data);
        },
        error: (error) => {
          console.log("Error al cargar las ciudades");
        }
      });
    });
    }

    ngOnInit(): void {
      this.mapaService.crearMapa([-75.671289, 4.537435], 12).subscribe(() => {
        this.mapaService.pintarMarcadores(this.resultados);
      });;
    }

}
