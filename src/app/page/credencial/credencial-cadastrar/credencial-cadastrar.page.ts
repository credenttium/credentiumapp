import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar, IonButton, IonSelect, IonSelectOption, ToastController } from '@ionic/angular/standalone';
import { CredencialModel } from 'src/app/model/credencial.model';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-credencial-cadastrar',
  templateUrl: './credencial-cadastrar.page.html',
  styleUrls: ['./credencial-cadastrar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption
  ]
})
export class CredencialCadastrarPage implements OnInit {

  public credencialCadastrarFormulario: FormGroup;

  public contaArray: any[] = [];

  private supabaseService = inject(SupabaseService);

  private toastController = inject(ToastController);

  private router = inject(Router);

  ngOnInit() {
    this.recuperarContas();
  }

  constructor(private formBuilder: FormBuilder) {
    this.credencialCadastrarFormulario = this.formBuilder.group({
      id_pessoa: ['2', Validators.required],
      descricao: ['Conta Netflix', Validators.required],
      usuario: ['email@email.com', [Validators.required, Validators.email]],
      senha: ['senha-forte', [Validators.required, Validators.minLength(6)]],
      link: ['https://...'],
    });
  }

  public async recuperarContas() {
    this.contaArray = await this.supabaseService.recuperarContas();
  }

  public async salvar() {
    if (this.credencialCadastrarFormulario.valid) {
      const credencialModel: CredencialModel = this.credencialCadastrarFormulario.getRawValue();
      credencialModel.id_pessoa = this.credencialCadastrarFormulario.get('id_pessoa')?.value;
      const data = await this.supabaseService.create(credencialModel);
      this.apresentarMensagemSucesso();
      this.limparFormulario();
      this.redirecionarTelaCredencialDetalhar();
    } else {
      console.log('Formulário inválido');
    }
  }

  public atualizarDescricao(event: any) {
    const idSelecionado = event.detail.value;
    const contaSelecionada = this.contaArray.find(conta => conta.code === idSelecionado);
    if (contaSelecionada) {
      this.credencialCadastrarFormulario.patchValue({
        descricao: `Conta ${contaSelecionada.nome}`
      });
    }
  }

  private async apresentarMensagemSucesso() {
    const toast = await this.toastController.create({
      message: "Credencial salva com sucesso!",
      duration: 2500,
      color: 'light',
      position: 'bottom'
    });
    return toast.present();
  }

  private limparFormulario() {
    this.credencialCadastrarFormulario.reset();
  }

  private redirecionarTelaCredencialDetalhar() {
    this.router.navigate(["/credencial"]);
  }

}
