import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonAvatar, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { add, createOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { SupabaseService } from 'src/app/service/supabase.service';
import { CredencialService } from './../../service/credencial.service';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.page.html',
  styleUrls: ['./credencial.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonItemSliding, IonItemOption, IonItemOptions, IonIcon, IonLabel, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CredencialPage implements OnInit {

  public credencialArray: any[] = [];

  private supabaseService = inject(SupabaseService);

  private credencialService = inject(CredencialService);

  private router = inject(Router);

  constructor() {
    addIcons({ createOutline, trashOutline, add, pencilOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.carregarCredenciais();
  }

  public async carregarCredenciais() {
    // const credencialArray = await this.supabaseService.recuperarCredenciais();
    // this.credencialArray = credencialArray;
    this.credencialService.findAll().subscribe({
      next: (response) => {
        this.credencialArray = response;
        console.log(this.credencialArray);
      },
      error: (request) => { }
    });
  }

  public async redirecionarTelaCredencialDetalhar(codigoCredencial: number) {
    return this.router.navigate(["/credencial-detalhar", codigoCredencial]);
  }

  public editarCredencial(codigoCredencial: number) { }

  public excluirCredencial(codigoCredencial: number) { }

  public redirecionarTelaCadastrarCredencial() {
    return this.router.navigate(["/credencial-cadastrar"]);
  }

}
