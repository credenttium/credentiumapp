import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { CredencialModel } from '../model/credencial.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = new SupabaseClient(environment.supabase_url, environment.supabase_key);
  }

  public async recuperarContas() {
    const { data, error } = await this.supabaseClient.from('tb_pessoa').select('code, nome');
    if (error) throw error;
    return data;
  }

  public async findByCodePessoa(code: number) {
    const { data, error } = await this.supabaseClient
      .from('tb_pessoa')
      .select('code, nome')
      .eq('code', code)
      .single();
    if (error) {
      console.error('Erro ao buscar pessoa:', error.message);
      throw error;
    }
    return data;
  }

  public async create(credencialModel: CredencialModel) {
    const { data, error } = await this.supabaseClient.from('tb_credencial').insert(credencialModel).select();
    if (error) {
      console.error('Erro ao salvar credencial:', error.message);
      throw error;
    }
    return data;
  }

  public async recuperarCredenciais(): Promise<CredencialModel[]> {
    const { data, error } = await this.supabaseClient
      .from('tb_credencial')
      .select('*')
      .order('descricao', { ascending: true });
    if (error) {
      console.error('Erro ao listar credenciais:', error.message);
      return [];
    }
    return data;
  }

  public async buscarPorId(codigoCredencial: number): Promise<CredencialModel | null> {
    const { data, error } = await this.supabaseClient
      .from('tb_credencial')
      .select('*')
      .eq('code', codigoCredencial)
      .single();
    if (error) {
      console.error('Erro ao buscar credencial:', error.message);
      return null;
    }
    return data;
  }

}
