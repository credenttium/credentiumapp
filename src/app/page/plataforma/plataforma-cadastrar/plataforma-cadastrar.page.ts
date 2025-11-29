import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonIcon, IonInput, IonAvatar, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { personAddOutline, cloudUploadOutline } from 'ionicons/icons';

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

  constructor() {
    this.plataformaCadastrarFormulario = this.formBuilder.group({
      nome: ["", Validators.required],
      endereco: ["", Validators.required],
    });
    addIcons({ cloudUploadOutline, personAddOutline });
  }

  ngOnInit() {
    const nomeControl = this.plataformaCadastrarFormulario.get('nome');
    nomeControl?.valueChanges.subscribe(nome => {
      this.carregarLogoPelaPlataforma(nome);
    });
  }

  public async salvar() {
    console.log(this.plataformaCadastrarFormulario.value);
    if (this.plataformaCadastrarFormulario.valid) { }
  }

  public carregarLogoPelaPlataforma(nome: string) {
    if (!nome || nome.trim() === '') {
      this.logoUrl = null;
      return;
    }
    const dominio = nome.toLowerCase().replace(/\s+/g, '') + '.com';
    this.logoUrl = `https://logo.clearbit.com/${dominio}`;
  }

  public cadastrarLogomarca() {}

}
