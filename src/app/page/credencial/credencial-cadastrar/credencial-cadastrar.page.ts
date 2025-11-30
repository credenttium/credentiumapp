import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar, ToastController, ModalController } from '@ionic/angular/standalone';
import { CredencialService } from 'src/app/service/credencial.service';
import { PlataformaService } from 'src/app/service/plataforma.service';
import { PlataformaCadastrarPage } from '../../plataforma/plataforma-cadastrar/plataforma-cadastrar.page';

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

  public plataformaArray: any[] = [];

  // private supabaseService = inject(SupabaseService);

  private toastController = inject(ToastController);

  private router = inject(Router);

  private plataformaService = inject(PlataformaService);

  private credencialService = inject(CredencialService);

  private modalController = inject(ModalController);

  ngOnInit() {
    this.recuperarPlataforma();
  }

  constructor(private formBuilder: FormBuilder) {
    this.credencialCadastrarFormulario = this.formBuilder.group({
      id_pessoa: ['', Validators.required],
      descricao: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      link: [''],
    });
  }

  // public async recuperarContas() {
  //   this.contaArray = await this.supabaseService.recuperarContas();
  // }

  public recuperarPlataforma() {
    this.plataformaService.recuperarPlataforma().subscribe({
      next: (response) => {
        this.plataformaArray = response;
      },
      error: (error) => { }
    });
  }

  // public async salvar() {
  //   if (this.credencialCadastrarFormulario.valid) {
  //     const credencialModel: CredencialModel = this.credencialCadastrarFormulario.getRawValue();
  //     credencialModel.id_pessoa = this.credencialCadastrarFormulario.get('id_pessoa')?.value;
  //     const data = await this.supabaseService.create(credencialModel);
  //     this.apresentarMensagemSucesso();
  //     this.limparFormulario();
  //     this.redirecionarTelaCredencialDetalhar();
  //   } else {
  //     console.log('Formulário inválido');
  //   }
  // }

  public cadastrarCredencial() {

    if (!this.credencialCadastrarFormulario.valid) {
      return;
    }

    const credencialFormulario = this.credencialCadastrarFormulario.value;

    const credencialModel = {
      descricao: credencialFormulario.descricao,
      usuario: credencialFormulario.usuario,
      senha: credencialFormulario.senha,
      link: credencialFormulario.link,
      plataforma: { code: credencialFormulario.id_pessoa }
    };

    // const credencialModel: CredencialModel = this.credencialCadastrarFormulario.value as CredencialModel;

    console.log(credencialModel);

    this.credencialService.cadastrarCredencial(credencialModel).subscribe({
      next: (response: any) => {
        this.apresentarMensagemSucesso();
        this.limparFormulario();
        this.redirecionarTelaCredencialDetalhar();
      },
      error: (responseError) => {
        console.error("FALHA: Errro ao tentar cadastrar a credencial!");
      }
    });
  }

  public atualizarDescricao(event: any) {
    const idSelecionado = event.detail.value;
    const contaSelecionada = this.plataformaArray.find(plataforma => plataforma.code === idSelecionado);
    if (contaSelecionada) {
      this.credencialCadastrarFormulario.patchValue({
        descricao: `Conta ${contaSelecionada.nome}`
      });
    }

    const value = event.detail.value;

    if (value === "new") {
      this.abrirModalPlataformaCadastrar();
      this.credencialCadastrarFormulario.get('id_pessoa')?.setValue(null);
      return;
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

  public async abrirModalPlataformaCadastrar() {

    const modal = await this.modalController.create({
      component: PlataformaCadastrarPage,
      breakpoints: [0, 0.25, 0.5, 0.75, 0.85, 0.90, 1],
      initialBreakpoint: 0.92,
      backdropBreakpoint: 0.85
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (data) {
      this.plataformaArray.push(data);
      this.credencialCadastrarFormulario.patchValue({
        id_pessoa: data.code,
        descricao: `Conta ${data.nome}`
      });
    }
  }

}
