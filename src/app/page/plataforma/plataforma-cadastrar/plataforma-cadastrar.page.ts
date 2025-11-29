import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { IonAvatar, IonButton, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
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

  constructor() {
    this.plataformaCadastrarFormulario = this.formBuilder.group({
      nome: ["", Validators.required],
      url: ["", Validators.required],
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
    console.log(this.plataformaCadastrarFormulario.value);
    if (!this.plataformaCadastrarFormulario.valid) {
      return;
    }
    const formData = new FormData();
    formData.append("nome", this.plataformaCadastrarFormulario.value.nome);
    formData.append("url", this.plataformaCadastrarFormulario.value.url);

    if (this.logoUrl) {
      if (this.logoUrl.startsWith("data:image")) {
        const blob = this.base64ToBlob(this.logoUrl);
        formData.append("logo", blob, "logomarca.jpeg");
      } else {
        formData.append("logoUrl", this.logoUrl);
      }
    }

    // if (this.logoUrl) {
    //   const blob = this.base64ToBlob(this.logoUrl);
    //   formData.append("logo", blob, "logomarca.jpeg");
    // }

    this.plataformaService.create(formData).subscribe({
      next: (response) => {
        console.log("Salvo com sucesso:", response);
      },
      error: (error) => {
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
      console.log("Erro ao escolher imagem:", error);
    }
  }

}
