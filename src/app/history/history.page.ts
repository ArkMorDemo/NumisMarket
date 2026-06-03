import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonSearchbar, IonButtons, IonAvatar, IonModal } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { timeOutline, notificationsOutline, homeOutline, walletOutline, cartOutline, logoUsd, chatbubbleOutline, starOutline, searchOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({ timeOutline, notificationsOutline, homeOutline, walletOutline, cartOutline, logoUsd, chatbubbleOutline, starOutline });
import { ModalController } from '@ionic/angular';
import { HistoricoModalComponent } from './historico-modal/historico-modal.component';
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
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent, IonButton, IonIcon, IonSearchbar, IonButtons, IonAvatar, IonModal, HistoricoModalComponent]
})
export class HistoryPage implements OnInit {

  moedas: Moeda[] = [];
  moframe_url: any;

  constructor(private http: HttpClient) {
     addIcons({ searchOutline});
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
