import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from './../../../service/supabase.service';

@Component({
  selector: 'app-credencial-detalhar',
  templateUrl: './credencial-detalhar.page.html',
  styleUrls: ['./credencial-detalhar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CredencialDetalharPage implements OnInit {

  private supabaseService = inject(SupabaseService);

  private route = inject(ActivatedRoute);

  public codigoCredencial!: number;

  public credencialModel!: any;

  constructor() { }

  ngOnInit() {
    this.codigoCredencial = Number(this.route.snapshot.paramMap.get('codigo'));
    // this.carregarCredencial();
  }

  // public async carregarCredencial() {
  //   this.credencialModel = await this.supabaseService.buscarPorId(this.codigoCredencial);
  //   console.log(this.credencialModel);
  // }

}
