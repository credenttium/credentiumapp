import { PlataformaModel } from "./plataforma.model";

export interface CredencialModel {
  code?: number;
  plataforma?: PlataformaModel;
  descricao: string;
  usuario: string;
  senha: string;
  link?: string;
}