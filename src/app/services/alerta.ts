import { Injectable } from '@angular/core';

export interface AlertaMoeda {        // ⬅️ tem que ter "export"
  id?: string;
  nome: string;
  pais: string;
  tipoAnuncio: string;
  epoca: string;
  material: string;
  precoMin: number;
  precoMax: number;
  notificarEmail: boolean;
  notificarSite: boolean;
  criadoEm?: string;
}

@Injectable({ providedIn: 'root' })
export class AlertaService {          // ⬅️ tem que ter "export"
  private readonly STORAGE_KEY = 'alertas';

  listar(): AlertaMoeda[] {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  }

  guardar(alerta: AlertaMoeda): AlertaMoeda {
    const lista = this.listar();
    const novo: AlertaMoeda = {
      ...alerta,
      id: Date.now().toString(),
      criadoEm: new Date().toISOString(),
    };
    lista.push(novo);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    return novo;
  }

  apagar(id: string): void {
    const lista = this.listar().filter((a) => a.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
  }
}