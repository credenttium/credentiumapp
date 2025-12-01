import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { IonAvatar, IonButton, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonTitle, IonToolbar, LoadingController, ToastController, ModalController } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { cameraOutline, cloudUploadOutline, personAddOutline } from 'ionicons/icons';
import { PlataformaService } from 'src/app/service/plataforma.service';

@Component({
  selector: 'app-plataforma-cadastrar',
  templateUrl: './plataforma-cadastrar.page.html',
  styleUrls: ['./plataforma-cadastrar.page.scss'],
  standalone: true,
  imports: [IonInput, IonIcon, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonAvatar, IonCardTitle]
})
export class PlataformaCadastrarPage implements OnInit {

  public plataformaCadastrarFormulario: FormGroup;

  private formBuilder = inject(FormBuilder);

  public focused: boolean = false;

  public isApresentarCampoUploadImagem: boolean = false;

  public focusedField: string = "";

  public logoUrl: string | null = null;

  public logoLocalPath: string | null = null;

  private plataformaService = inject(PlataformaService);

  private toastController = inject(ToastController);

  private loadingController = inject(LoadingController);

  private router = inject(Router);

  private modalController = inject(ModalController);

  constructor() {
    this.plataformaCadastrarFormulario = this.formBuilder.group({
      nome: ["", Validators.required],
      url: [""],
    });
    addIcons({ cameraOutline, cloudUploadOutline, personAddOutline });
  }

  ngOnInit() {
    const nomeControl = this.plataformaCadastrarFormulario.get('nome');
    nomeControl?.valueChanges.subscribe(nome => {
      this.carregarLogoPelaPlataforma(nome);
    });
  }

  public async create() {
    if (!this.plataformaCadastrarFormulario.valid) {
      return;
    }
    const formData = new FormData();
    formData.append("nome", this.plataformaCadastrarFormulario.value.nome);
    formData.append("url", this.plataformaCadastrarFormulario.value.url);

    if (this.logoUrl) {
      if (this.logoUrl.startsWith("data:image")) {
        const blob = this.base64ToBlob(this.logoUrl);
        formData.append("logomarca", blob, "logomarca.jpeg");
      } else {
        const blob = await this.urlToBlob(this.logoUrl);
        formData.append("logomarca", blob, "logomarca.jpeg");
      }
    }

    this.apresentarCarregamentoOperacaoCreate();

    this.plataformaService.create(formData).subscribe({
      next: (response) => {
        this.loadingController.dismiss();
        this.apresentarMensagemSucesso();
        this.plataformaCadastrarFormulario.reset();
        this.logoUrl = null;
        // this.redirecionarTelaPlataforma();
        this.redirecionarTelaCredencialCadastrar();
        this.modalController.dismiss(response);
      },
      error: (error) => {
        this.apresentarMensagemErro();
        this.loadingController.dismiss();
        console.error("Erro ao salvar:", error);
      }
    });

  }

  private base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: 'image/jpeg' });
  }

  private async urlToBlob(imageUrl: string): Promise<Blob> {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();
    return new Blob([buffer], { type: contentType });
  }

  public carregarLogoPelaPlataforma(nome: string) {
    if (!nome || nome.trim() === '') {
      this.logoUrl = null;
      return;
    }
    const dominio = nome.toLowerCase().replace(/\s+/g, '') + '.com';
    this.logoUrl = `https://logo.clearbit.com/${dominio}`;
  }

  public async cadastrarLogomarca() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      this.logoUrl = foto.dataUrl ?? null;

      const nomeArquivo = `plataforma_${Date.now()}.jpeg`;

      await Filesystem.writeFile({
        path: nomeArquivo,
        data: foto.dataUrl!,
        directory: Directory.Data
      });

      this.logoLocalPath = nomeArquivo;

    } catch (error) {
      console.error("Erro ao escolher imagem:", error);
    }
  }

  private async apresentarMensagemErro() {
    const toast = await this.toastController.create({
      message: 'Falha ao tentar cadastrar a plataforma!',
      duration: 2500,
      position: "bottom",
      color: "warning"
    });
    return toast.present();
  }

  private async apresentarMensagemSucesso() {
    const toast = await this.toastController.create({
      message: 'Dados cadastrados com Sucesso!',
      duration: 2500,
      position: "bottom",
      color: "success"
    });
    return toast.present();
  }

  private async apresentarCarregamentoOperacaoCreate() {
    const loading = await this.loadingController.create({
      message: 'Processando dados...',
      duration: 3000,
    });
    loading.present();
  }

  private redirecionarTelaPlataforma() {
    this.router.navigate(["/plataforma"]);
  }

  private redirecionarTelaCredencialCadastrar() {
    this.router.navigate(["/credencial-cadastrar"]);
  }

}
