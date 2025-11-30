import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.page.html',
  styleUrls: ['./plataforma.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlataformaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
