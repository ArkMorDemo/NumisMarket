import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { addIcons } from 'ionicons';
import { closeOutline, timeOutline, funnelOutline, logoUsd, swapHorizontalOutline, cartOutline } from 'ionicons/icons';
import { IonIcon, IonContent, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonAvatar } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';

export interface Moeda {
  id: number;
  nome: string;
  preco_euros: number;
  estado: string;
  material: string;
  ano: number;
  pais: string;
  imagem_url: string;
}

@Component({
  selector: 'app-historico-modal',
  templateUrl: './historico-modal.component.html',
  styleUrls: ['./historico-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonAvatar],
})
export class HistoricoModalComponent implements OnInit {

  moedas: Moeda[] = [];
  @Output() fechar = new EventEmitter<void>();

  constructor(private http: HttpClient
  ) {
    addIcons({
      'close-outline': closeOutline,
      'time-outline': timeOutline,
      'funnel-outline': funnelOutline,
      'logo-usd': logoUsd,
      'swap-horizontal-outline': swapHorizontalOutline,
      'cart-outline': cartOutline
    });
  }

  closeModal() {
    this.fechar.emit();
  }

  ngOnInit() {
    this.loadMoedas();
  }

  loadMoedas() {
      this.http.get<Moeda[]>('assets/data/coin.json').subscribe({
        next: (data) => {
          this.moedas = data;
        },
        error: (err) => {
          console.error('Erro ao carregar o ficheiro de moedas:', err);
        }
      });
    }
}