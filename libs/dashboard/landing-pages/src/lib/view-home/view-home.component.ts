import { Component } from '@angular/core';

@Component({
  selector: 'lib-view-home',
  templateUrl: './view-home.component.html',
  styleUrl: './view-home.component.scss',
})
export class ViewHomeComponent {
  landscapeImg = 'assets/img/landscapes/view-home-landscape.png';

  listImgAboutUs = [
    'assets/img/dashboard/foto_1.png',
    'assets/img/dashboard/foto_2.png',
    'assets/img/dashboard/foto_3.png',
  ];

  testimonies = [
    {
      description:
        'La comida y el servicio en Kafè son excepcionales. ¡Volvere pronto!',
      author: 'María Pérez',
    },
    {
      description:
        'La comida y el servicio en Kafè son excepcionales. ¡Volvere pronto!',
      author: 'Juan Gómez',
    },
    {
      description:
        'La comida y el servicio en Kafè son excepcionales. ¡Volvere pronto!',
      author: 'Ana Rodriguez',
    },
  ];
}
