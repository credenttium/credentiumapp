import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-plataforma-detalhar',
  templateUrl: './plataforma-detalhar.page.html',
  styleUrls: ['./plataforma-detalhar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlataformaDetalharPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
