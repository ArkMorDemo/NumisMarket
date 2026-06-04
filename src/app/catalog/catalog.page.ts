import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonLabel,
  IonSelectOption,
  IonItem,
  IonSelect,
  IonSpinner,
  IonText,
  IonInput,
  ModalController,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardComponent } from '../components/card/card.component';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { CoinService } from '../services/coin.service';
import { Coin } from '../models/coin.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonButton,
    IonLabel,
    IonSelectOption,
    IonItem,
    IonSelect,
    IonSpinner,
    IonText,
    IonInput,
    HeaderComponent,
    FooterComponent,
    CardComponent,
  ],
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

  constructor(
    private coinService: CoinService,
    private router: Router,
    private modalCtrl: ModalController,
  ) {}

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

  onCardAction(coin: Coin): void {
    this.router.navigate(['/coin-detail', coin.id]);
  }

  async abrirAlerta() {
    const modal = await this.modalCtrl.create({
      component: AlertModalComponent,
      cssClass: 'alerta-modal',
    });
    await modal.present();
  }
}