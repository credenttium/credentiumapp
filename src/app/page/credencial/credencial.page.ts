import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/service/supabase.service';
import { addIcons } from "ionicons";
import { trashOutline, pencilOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.page.html',
  styleUrls: ['./credencial.page.scss'],
  standalone: true,
  imports: [IonItemSliding, IonItemOption, IonItemOptions, IonIcon, IonLabel, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CredencialPage implements OnInit {

  public credencialArray: any[] = [];

  private supabaseService = inject(SupabaseService);

  private router = inject(Router);

  constructor() {
    addIcons({
      trashOutline, pencilOutline, createOutline
    });
  }

  ngOnInit() {
    this.carregarCredenciais();
  }

  public async carregarCredenciais() {
    const credencialArray = await this.supabaseService.recuperarCredenciais();
    this.credencialArray = credencialArray;
  }

  public async redirecionarTelaCredencialDetalhar(codigoCredencial: number) {
    return this.router.navigate(["/credencial-detalhar", codigoCredencial]);
  }

  public editarCredencial(codigoCredencial: number) { }

  public excluirCredencial(codigoCredencial: number) { }

}
