import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  user: string;
  rating: number;
  text: string;
  responses: string[];
  newResponse: string;
}

@Component({
  selector: 'app-responder-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './responder-comentarios.component.html',
  styleUrls: ['./responder-comentarios.component.css']
})
export class ResponderComentariosComponent {
  business = {
    name: 'Hotel Panorama',
    description: 'Descripción del hotel...',
    rating: 4.5,
    images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/301', 'https://picsum.photos/200/302']
  };

  comments: Comment[] = [
    {
      user: 'John Doe',
      rating: 5,
      text: '¡Excelente servicio!',
      responses: ['Gracias, John!'],
      newResponse: ''
    },
    {
      user: 'Jane Smith',
      rating: 4,
      text: 'Muy buena experiencia, pero podría mejorar la limpieza.',
      responses: [],
      newResponse: ''
    }
  ];

  addResponse(comment: Comment) {
    if (comment.newResponse.trim()) {
      comment.responses.push(comment.newResponse);
      comment.newResponse = '';
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }
}
