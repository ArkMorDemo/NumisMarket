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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonButton, IonLabel,
  IonSelectOption, IonItem, IonSelect,
  IonSpinner, IonText, IonInput
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardComponent } from '../components/card/card.component';
import { CoinService } from '../services/coin.service';
import { Coin } from '../models/coin.model';

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
    CommonModule, FormsModule,
    IonContent, IonButton, IonLabel,
    IonSelectOption, IonItem, IonSelect,
    IonSpinner, IonText, IonInput,
    HeaderComponent, FooterComponent, CardComponent
  ]
})
export class CatalogPage implements OnInit, OnDestroy {

  coins: Coin[] = [];
  isLoading = false;
  errorMsg: string | null = null;

  selectedCountry = '';
  selectedType    = '';
  selectedEra     = '';
  searchName      = '';

  readonly countries = [
    { id: 'pt', name: 'Portugal' },
    { id: 'br', name: 'Brasil' },
    { id: 'es', name: 'Espanha' },
    { id: 'fr', name: 'França' },
    { id: 'de', name: 'Alemanha' },
    { id: 'uk', name: 'Reino Unido' },
  ];

  private subs = new Subscription();

  constructor(private coinService: CoinService, private router: Router) {}

  ngOnInit(): void {
    this.subs.add(
      this.coinService.getLoading().subscribe(v => this.isLoading = v)
    );
    this.subs.add(
      this.coinService.getError().subscribe(v => this.errorMsg = v)
    );
    this.subs.add(
      this.coinService.getFilteredCoins().subscribe(coins => this.coins = coins)
    );
    this.subs.add(
      this.coinService.loadCoins().subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
