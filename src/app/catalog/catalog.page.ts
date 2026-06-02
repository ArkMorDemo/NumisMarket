import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonSelectOption,
  IonItem,
  ModalController,
} from '@ionic/angular/standalone';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { RouterLink } from '@angular/router';   // ⬅️ NOVO

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    IonButton,
    IonLabel,
    IonSelectOption,
    IonItem,
    RouterLink,
  ],
})
export class CatalogPage {
  selectedPO: string = '';
  PO = [
    { id: 'btc', name: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum' },
    { id: 'usd', name: 'US Dollar' },
    { id: 'eur', name: 'Euro' },
    { id: 'gbp', name: 'British Pound' },
  ];
  coins: any;

  constructor(private modalCtrl: ModalController) {}

  onPOChange(event: any) {
    console.log('Coin selected:', event.detail.value);
  }

  /** Abre o modal "Novo alerta de moeda" */
  async abrirAlerta() {
    const modal = await this.modalCtrl.create({
      component: AlertModalComponent,
      cssClass: 'alerta-modal',
    });
    await modal.present();
  }
}