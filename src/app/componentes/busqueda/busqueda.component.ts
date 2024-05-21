import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';


@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [AlertaComponent],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
  alerta!:Alerta;
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
          if (error.status === 400) {
            this.alerta = new Alerta('Error de conexión', 'danger');
          } else {
            if (error.error && error.error.respuesta) {
              this.alerta = new Alerta(error.error.respuesta, 'warning');
            } else {
              this.alerta = new Alerta('Se produjo un error, por favor verifica lo datos de busqueda o intenta más tarde.', 'danger');
            }
          }
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
