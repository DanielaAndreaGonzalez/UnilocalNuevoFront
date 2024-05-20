import { Component } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { Router } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  negocios: ItemNegocioDTO[];

  constructor(private mapaService: MapaService,private router: Router,  private negociosService: NegociosService) {
    this.negocios =  [];
    this.negociosService.obtenerNegocios().subscribe({
      next:(data) => {
        this.negocios = data.respuesta;
        console.log("Negocios recomendados listados: ", data);
      },
      error: (error) => {
        console.log("Error al cargar las ciudades");
      }
    });
  }


  ngOnInit(): void {
    this.mapaService.crearMapa([-75.6792710399781, 4.533621286272933], 10).subscribe(() => {
      this.mapaService.pintarMarcadores(this.negocios);
    });
  }

  public iraBusqueda(valor:string){
    if(valor){
    this.router.navigate(["/busqueda", valor]);
    }
  }

}
