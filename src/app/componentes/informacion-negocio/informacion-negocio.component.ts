import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-informacion-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informacion-negocio.component.html',
  styleUrls: ['./informacion-negocio.component.css']
})
export class InformacionNegocioComponent implements OnInit {
  businessId!: number;  // Usar aserción no nula para inicializar
  businessOwner: string = 'Usuario Ejemplo';  // Supongamos que este dato se obtiene del negocio

  // Datos de ejemplo
  business = {
    id: 1,
    name: 'Hotel Panorama',
    description: 'Este es un hotel muy bonito.',
    rating: 4.5,
    images: [
      'https://picsum.photos/200/300',
      'https://picsum.photos/201/300',
      'https://picsum.photos/202/300'
    ],
    comments: [
      { user: 'Juan', rating: 5, text: 'Excelente lugar!' },
      { user: 'Maria', rating: 4, text: 'Muy bueno, pero puede mejorar.' }
    ]
  };
  newComment = { user: 'Usuario Predeterminado', rating: 0, text: '' };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.businessId = +params.get('id')!;  // Usar aserción no nula
      // Aquí podrías cargar los detalles del negocio usando el `id`
    });
  }

  addComment() {
    if (this.newComment.user && this.newComment.rating && this.newComment.text) {
      this.business.comments.push({ ...this.newComment });
      this.newComment = { user: '', rating: 0, text: '' };
    }
  }
}
