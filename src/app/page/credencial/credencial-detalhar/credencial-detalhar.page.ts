import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, arrowRedoOutline, copyOutline, eyeOutline, keyOutline, linkOutline, personOutline } from 'ionicons/icons';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-credencial-detalhar',
  templateUrl: './credencial-detalhar.page.html',
  styleUrls: ['./credencial-detalhar.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList]
})
export class CredencialDetalharPage implements OnInit {

  private credencialService = inject(CredencialService);

  private route = inject(ActivatedRoute);

  public codigoCredencial!: number;

  public credencialModel!: any;

  private toastController = inject(ToastController);

  constructor() {
    addIcons({arrowBackOutline,personOutline,copyOutline,arrowRedoOutline,keyOutline,linkOutline,eyeOutline});
  }

  ngOnInit() {
    this.codigoCredencial = Number(this.route.snapshot.paramMap.get('codigo'));
    this.credencialService.buscarPorId(this.codigoCredencial).subscribe({
      next: (responseData) => {
        this.credencialModel = responseData;
        // console.table(this.credencialModel);
      },
      error: (responseError) => {
        console.error("Falha ao tentar Recuperar a Credencial!");
        console.error(responseError);
      }
    });
    // this.carregarCredencial();
  }

  // public async carregarCredencial() {
  //   this.credencialModel = await this.supabaseService.buscarPorId(this.codigoCredencial);
  // }

  public redirecionarTelaCredencial() {
    window.history.back();
  }

  public async copiarDados(campo: any) {
    navigator.clipboard.writeText(campo);
    this.exibirToast('Campo copiado com sucesso!');
  }

  private async exibirToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  public abrirNavegadorExterno(url: string) {
    window.open(url, '_blank');
  }

}
